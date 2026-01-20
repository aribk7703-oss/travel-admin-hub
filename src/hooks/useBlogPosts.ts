import { useState, useEffect, useMemo } from "react";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
  status: "published" | "draft" | "archived";
  tags: string[];
}

const STORAGE_KEY = "travel_blog_posts";

const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Hidden Gems in Maharashtra",
    slug: "top-10-hidden-gems-maharashtra",
    excerpt: "Discover the lesser-known destinations that offer breathtaking views and rich cultural experiences.",
    content: "Maharashtra is home to numerous hidden treasures that often go unnoticed by mainstream tourism...",
    category: "destination-guide",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop",
    author: "Travel Expert",
    publishedAt: "2024-01-15",
    status: "published",
    tags: ["maharashtra", "hidden gems", "travel tips"],
  },
  {
    id: 2,
    title: "Essential Packing Tips for Heritage Tours",
    slug: "essential-packing-tips-heritage-tours",
    excerpt: "Learn what to pack for a comfortable and enriching heritage tour experience.",
    content: "When embarking on a heritage tour, proper preparation can make all the difference...",
    category: "travel-tips",
    image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&auto=format&fit=crop",
    author: "Travel Expert",
    publishedAt: "2024-01-20",
    status: "published",
    tags: ["packing", "heritage", "tips"],
  },
  {
    id: 3,
    title: "Best Time to Visit Ajanta and Ellora Caves",
    slug: "best-time-visit-ajanta-ellora-caves",
    excerpt: "Plan your visit to these UNESCO World Heritage sites at the perfect time of year.",
    content: "The Ajanta and Ellora Caves are among India's most treasured historical monuments...",
    category: "destination-guide",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop",
    author: "History Enthusiast",
    publishedAt: "2024-02-01",
    status: "published",
    tags: ["ajanta", "ellora", "caves", "unesco"],
  },
];

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPosts(JSON.parse(stored));
    } else {
      setPosts(defaultPosts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
    }
  }, []);

  const saveToStorage = (data: BlogPost[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setPosts(data);
  };

  const addPost = (post: Omit<BlogPost, "id">) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now(),
    };
    saveToStorage([...posts, newPost]);
    return newPost;
  };

  const updatePost = (id: number, updates: Partial<BlogPost>) => {
    const updated = posts.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveToStorage(updated);
  };

  const deletePost = (id: number) => {
    saveToStorage(posts.filter((p) => p.id !== id));
  };

  const stats = useMemo(() => ({
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
    archived: posts.filter((p) => p.status === "archived").length,
  }), [posts]);

  const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    stats,
    getPostBySlug,
  };
};
