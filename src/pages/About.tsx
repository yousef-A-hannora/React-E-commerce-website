import Header from "../components/Header/Header";
import "./About.css";

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Products Available" },
  { value: "50+", label: "Brand Partners" },
  { value: "24/7", label: "Customer Support" },
];

const values = [
  {
    icon: "🎯",
    title: "Quality First",
    desc: "We hand-pick every product to ensure it meets our high standards before it reaches your doorstep.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "Our optimized logistics network ensures your orders arrive quickly and safely, every time.",
  },
  {
    icon: "🤝",
    title: "Customer Trust",
    desc: "Thousands of shoppers rely on us for their daily needs. We earn that trust with every order.",
  },
  {
    icon: "💡",
    title: "Innovation",
    desc: "We constantly improve our platform to give you the smoothest shopping experience possible.",
  },
];

const team = [
  { name: "Yousef Hannora", role: "Founder & CEO" },
  { name: "Sarah Ahmed", role: "Head of Operations" },
  { name: "Omar Khaled", role: "Lead Developer" },
  { name: "Mona Ali", role: "Customer Experience" },
];

const About = () => {
  return (
    <>
      <Header />
      <div className="about-page">
        <div className="about-hero">
          <span className="badge">About Us</span>
          <h1>More Than Just a Store</h1>
          <p>
            FRP is your trusted online shopping destination. We bring quality
            products, unbeatable prices, and a seamless experience together in
            one place.
          </p>
        </div>

        <section className="about-stats">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        <section className="about-story">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, FRP started as a small idea with a big mission:
            make online shopping effortless for everyone. What began as a
            passion project has grown into a platform serving thousands of
            customers across the region.
          </p>
          <p>
            We believe shopping should be simple, enjoyable, and reliable.
            That is why we curate every category, partner with trusted brands,
            and put our customers at the heart of everything we do.
          </p>
        </section>

        <section className="about-values">
          <h2>What We Stand For</h2>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.title} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-team">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            {team.map((m) => (
              <div key={m.name} className="team-card">
                <div className="team-avatar">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
