import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const blogData = [
  {
    category: "History & Heritage",
    title: "Exploring the Ancient Wonders of Ajanta Caves",
    excerpt: "A deep dive into the 30 rock-cut Buddhist cave monuments that date back to the 2nd century BCE...",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
    href: "/blog/ajanta-caves",
  },
  {
    category: "Architecture",
    title: "The Majestic Kailasa Temple at Ellora",
    excerpt: "Why this single largest monolithic structure in the world is a must-visit for every traveler...",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800",
    href: "/blog/kailasa-temple",
  },
  {
    category: "Travel Guide",
    title: "Best Time to Visit Aurangabad: A Seasonal Guide",
    excerpt: "Plan your trip perfectly by knowing the weather, local festivals, and tourist crowd patterns...",
    image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=800",
    href: "/blog/best-time-aurangabad",
  },
];

export const GCBlogSection = () => {
  return (
    <section className="gc-blog" id="blog">
      <div className="gc-heading">
        <span>Travel Stories</span>
        <h1>Our Latest Blogs</h1>
      </div>
      <div className="gc-blog-container">
        {blogData.map((blog) => (
          <div key={blog.title} className="gc-blog-box">
            <div className="gc-blog-img">
              <img src={blog.image} alt={blog.title} />
            </div>
            <div className="gc-blog-content">
              <span>{blog.category}</span>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <Link to={blog.href} className="gc-read-more">
                Read Story <i className="bx bx-right-arrow-alt"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
