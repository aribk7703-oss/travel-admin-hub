import { useState, useEffect } from "react";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "travel-tips" | "destination-guide" | "news" | "announcement";
  image: string;
  author: string;
  publishedAt: string;
  status: "draft" | "published";
  tags: string[];
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Ajanta Ellora Taxi Service - Complete UNESCO Heritage Guide",
    slug: "ajanta-ellora-taxi-service",
    excerpt: "Complete UNESCO world heritage experience covering ancient rock-cut caves, Buddhist art, and the Kailasa Temple.",
    content: `<h2>Discover the Ancient Wonders</h2>
<p>Experience the magnificent Ajanta and Ellora caves with our premium taxi service. Our knowledgeable drivers will take you through centuries of history carved in stone.</p>
<h3>What's Included</h3>
<ul>
<li>AC vehicle with experienced driver</li>
<li>Pickup and drop from your location</li>
<li>Full day coverage (8-10 hours)</li>
<li>Bottled water and refreshments</li>
</ul>
<h3>Tour Highlights</h3>
<p>The Ajanta Caves feature 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE. The Ellora Caves represent the epitome of Indian rock-cut architecture with 34 caves carved out of basalt cliffs.</p>`,
    category: "destination-guide",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    author: "GreenCab Team",
    publishedAt: "2024-01-15",
    status: "published",
    tags: ["ajanta", "ellora", "unesco", "heritage"],
  },
  {
    id: 2,
    title: "Aurangabad City Sightseeing - Local Landmarks Tour",
    slug: "aurangabad-city-sightseeing",
    excerpt: "Covering Bibi Ka Maqbara (Mini Taj), Panchakki, Daulatabad Fort, and the Aurangabad Caves in a single day.",
    content: `<h2>Explore Aurangabad's Rich Heritage</h2>
<p>Aurangabad, now known as Chhatrapati Sambhajinagar, is a city steeped in history and culture. Our city tour covers all major attractions.</p>
<h3>Tour Stops</h3>
<ul>
<li><strong>Bibi Ka Maqbara</strong> - Often called the "Mini Taj Mahal"</li>
<li><strong>Panchakki</strong> - The medieval water mill</li>
<li><strong>Daulatabad Fort</strong> - A formidable hilltop fortress</li>
<li><strong>Aurangabad Caves</strong> - Buddhist rock-cut shrines</li>
</ul>`,
    category: "destination-guide",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
    author: "GreenCab Team",
    publishedAt: "2024-01-20",
    status: "published",
    tags: ["aurangabad", "city-tour", "heritage"],
  },
  {
    id: 3,
    title: "Top 10 Travel Tips for Maharashtra Heritage Tours",
    slug: "travel-tips-maharashtra",
    excerpt: "Essential tips for making the most of your Maharashtra heritage tour experience.",
    content: `<h2>Plan Your Perfect Heritage Trip</h2>
<p>Maharashtra is home to incredible heritage sites. Here are our top tips for travelers:</p>
<ol>
<li><strong>Best Time to Visit:</strong> October to March offers pleasant weather</li>
<li><strong>Book in Advance:</strong> Especially during peak season</li>
<li><strong>Carry Water:</strong> Stay hydrated during cave explorations</li>
<li><strong>Wear Comfortable Shoes:</strong> Lots of walking involved</li>
<li><strong>Hire a Guide:</strong> Enhance your experience with local knowledge</li>
<li><strong>Start Early:</strong> Beat the crowds and heat</li>
<li><strong>Carry Cash:</strong> Not all places accept cards</li>
<li><strong>Respect the Sites:</strong> Follow all guidelines</li>
<li><strong>Photography:</strong> Check rules at each location</li>
<li><strong>Local Food:</strong> Try authentic Maharashtrian cuisine</li>
</ol>`,
    category: "travel-tips",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    author: "Travel Expert",
    publishedAt: "2024-02-01",
    status: "published",
    tags: ["tips", "maharashtra", "travel"],
  },
  {
    id: 4,
    title: "Car Rental Services in Aurangabad - Complete Guide",
    slug: "car-rental-aurangabad-guide",
    excerpt: "Everything you need to know about car rental services in Aurangabad for tourists and business travelers.",
    content: `<h2>Your Complete Car Rental Guide</h2>
<p>Whether you're visiting for business or pleasure, having reliable transportation is essential. Here's what you need to know about car rentals in Aurangabad.</p>
<h3>Types of Vehicles Available</h3>
<ul>
<li>Sedan cars for couples and small families</li>
<li>SUVs for larger groups and rough terrain</li>
<li>Tempo Travellers for group tours</li>
<li>Luxury cars for special occasions</li>
</ul>
<h3>Booking Tips</h3>
<p>Book at least 24 hours in advance during peak season. Confirm all details including pickup location, duration, and any additional stops.</p>`,
    category: "travel-tips",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
    author: "GreenCab Team",
    publishedAt: "2024-02-10",
    status: "published",
    tags: ["car-rental", "aurangabad", "guide"],
  },
];

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem("blogPosts");
    return stored ? JSON.parse(stored) : defaultBlogPosts;
  });

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<BlogPost, "id">) => {
    const newPost: BlogPost = {
      ...post,
      id: Math.max(0, ...posts.map((p) => p.id)) + 1,
    };
    setPosts((prev) => [...prev, newPost]);
    return newPost;
  };

  const updatePost = (id: number, updates: Partial<BlogPost>) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updates } : post))
    );
  };

  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const getPostById = (id: number) => posts.find((post) => post.id === id);

  const getPostBySlug = (slug: string) => posts.find((post) => post.slug === slug);

  const getPublishedPosts = () => posts.filter((post) => post.status === "published");

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
  };

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPostById,
    getPostBySlug,
    getPublishedPosts,
    generateSlug,
    stats,
  };
};
