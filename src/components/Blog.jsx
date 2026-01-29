import React from "react";
import "../Styles/blog.css";
import images from "../assets/pedic.jpg";
// You can replace these with actual beauty images from your project
// For now, I'm using placeholder image URLs from a beauty-themed service
const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "2024 Makeup Trends: What's In and What's Out",
      description:
        "Discover the latest beauty trends taking over 2024, from glass skin to bold lip colors and everything in between.",
      author: "Sophia Martinez",
      date: "24 Jan 2024",
      readTime: "8 mins read",
      pic: { images }, // Makeup brushes
      category: "Makeup Trends",
    },
    {
      id: 2,
      title: "Skincare Routine for Glowing Skin",
      description:
        "Learn the essential steps for achieving radiant, healthy skin with our expert skincare guide and product recommendations.",
      author: "Emma Johnson",
      date: "22 Jan 2024",
      readTime: "12 mins read",
      pic: { images }, // Skincare products
      category: "Skincare",
    },
    {
      id: 3,
      title: "Nail Art Inspiration: Spring 2024 Designs",
      description:
        "Get inspired with stunning nail art designs perfect for spring. From minimalist to bold patterns, find your next look.",
      author: "Olivia Chen",
      date: "20 Jan 2024",
      readTime: "6 mins read",
      pic: { images }, // Nail polish
      category: "Nail Art",
    },
  ];

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Beauty Blog</h1>
        <p>
          Discover the latest trends, tips, and inspiration in the world of
          beauty and makeup
        </p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <div className="blog-image">
              <img src={images} alt={post.title} />
              <div className="blog-category">{post.category}</div>
            </div>

            <div className="blog-content">
              <h3>{post.title}</h3>
              <p className="blog-description">{post.description}</p>

              <div className="blog-meta">
                <div className="blog-author">
                  <strong>{post.author}</strong>
                </div>
                <div className="blog-date">
                  {post.date} - {post.readTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
