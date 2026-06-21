import type { BlogPost as BlogPostType } from "../../types";
import "./BlogPost.css";

const BlogPostCard = ({ post }: { post: BlogPostType }) => {
  const initials = `U${post.userId}`;
  return (
    <article className="blog-post-card">
      <div className="blog-post-header">
        <div className="blog-post-avatar">{initials}</div>
        <div className="blog-post-meta">
          <span className="author">Author #{post.userId}</span>
          <span className="post-id">Post #{post.id}</span>
        </div>
      </div>
      <h3>{post.title}</h3>
      <p className="blog-post-body">{post.body}</p>
      <div className="blog-post-footer">
        <span className="blog-post-tag">Article</span>
        <a href={`#post-${post.id}`} className="blog-post-read">Read more</a>
      </div>
    </article>
  );
};

export default BlogPostCard;
