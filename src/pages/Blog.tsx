import { useEffect, useReducer } from "react";
import type { BlogPost as BlogPostType, requistState } from "../types";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import BlogPostCard from "../components/blog/BlogPost";
import Header from "../components/Header/Header";
import "./Blog.css";

type PostsRequest = requistState & {
  payload: BlogPostType[];
};

const initialValue: PostsRequest = {
  payload: [],
  isLoading: false,
  error: "",
};

const reducer = (
  state: PostsRequest,
  action: { type: string; payload: BlogPostType[]; error: string },
): PostsRequest => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        isLoading: false,
        payload: action.payload,
        error: action.error,
      };

    case "FETCH_ERROR":
      return {
        isLoading: false,
        payload: [],
        error: action.error,
      };

    case "FETCH_PENDING":
      return {
        isLoading: true,
        payload: [],
        error: action.error,
      };
    default:
      return state;
  }
};

const Blog = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "FETCH_PENDING", payload: [], error: "" });
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const posts: BlogPostType[] = res.data;
        if (posts)
          dispatch({ type: "FETCH_SUCCESS", payload: posts, error: "" });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: [], error: String(err) });
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      <Header />
      <div className="blog-page">
        <div className="blog-hero">
          <span className="badge">Our Blog</span>
          <h1>Insights & Articles</h1>
          <p>
            Stay up to date with the latest posts, tutorials, and stories from
            our community of writers.
          </p>
        </div>
        {state.isLoading && (
          <div className="blog-loading">
            <BounceLoader color="#4f46e5" />
          </div>
        )}
        {state.payload && !state.isLoading && (
          <div className="blog-grid">
            {state.payload.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
