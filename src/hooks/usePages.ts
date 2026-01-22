import { useState, useEffect } from 'react';

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  status: 'published' | 'draft';
  isHomepage: boolean;
  createdAt: string;
  updatedAt: string;
}

const defaultPages: Page[] = [
  {
    id: 1,
    title: "About Us",
    slug: "about-us",
    content: "<h1>About Us</h1><p>Learn more about our company and services.</p>",
    author: "Admin",
    status: "published",
    isHomepage: false,
    createdAt: "2025-11-25",
    updatedAt: "2025-11-25",
  },
  {
    id: 2,
    title: "Cars",
    slug: "cars",
    content: "<h1>Our Fleet</h1><p>Explore our wide range of vehicles.</p>",
    author: "Admin",
    status: "published",
    isHomepage: false,
    createdAt: "2025-11-27",
    updatedAt: "2025-11-27",
  },
  {
    id: 3,
    title: "Gallery",
    slug: "gallery",
    content: "<h1>Gallery</h1><p>View our photo gallery.</p>",
    author: "Admin",
    status: "published",
    isHomepage: false,
    createdAt: "2025-11-27",
    updatedAt: "2025-11-27",
  },
  {
    id: 4,
    title: "Location",
    slug: "location",
    content: "<h1>Our Locations</h1><p>Find us at these locations.</p>",
    author: "Admin",
    status: "published",
    isHomepage: false,
    createdAt: "2025-11-27",
    updatedAt: "2025-11-27",
  },
  {
    id: 5,
    title: "Privacy Policy",
    slug: "privacy-policy",
    content: "<h1>Privacy Policy</h1><p>Our privacy policy details.</p>",
    author: "Admin",
    status: "published",
    isHomepage: false,
    createdAt: "2025-11-27",
    updatedAt: "2025-11-27",
  },
  {
    id: 6,
    title: "Terms",
    slug: "terms",
    content: "<h1>Terms & Conditions</h1><p>Our terms and conditions.</p>",
    author: "Admin",
    status: "draft",
    isHomepage: false,
    createdAt: "2025-11-21",
    updatedAt: "2025-11-21",
  },
  {
    id: 7,
    title: "JK Tours and Travels",
    slug: "home",
    content: "<h1>Welcome to JK Tours and Travels</h1><p>Your trusted travel partner.</p>",
    author: "Admin",
    status: "published",
    isHomepage: true,
    createdAt: "2025-11-25",
    updatedAt: "2025-11-25",
  },
  {
    id: 8,
    title: "Become An Expert",
    slug: "become-an-expert",
    content: "<h1>Become An Expert</h1><p>Join our team of travel experts.</p>",
    author: "Admin",
    status: "draft",
    isHomepage: false,
    createdAt: "2025-11-23",
    updatedAt: "2025-11-23",
  },
];

const STORAGE_KEY = 'dashboard_pages';

export const usePages = () => {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPages(JSON.parse(stored));
    } else {
      setPages(defaultPages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPages));
    }
  }, []);

  const savePages = (newPages: Page[]) => {
    setPages(newPages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPages));
  };

  const addPage = (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newPage = { 
      ...page, 
      id: Date.now(),
      createdAt: now,
      updatedAt: now,
    };
    savePages([...pages, newPage]);
    return newPage;
  };

  const updatePage = (id: number, updates: Partial<Page>) => {
    const now = new Date().toISOString().split('T')[0];
    const updated = pages.map(p => 
      p.id === id ? { ...p, ...updates, updatedAt: now } : p
    );
    savePages(updated);
  };

  const deletePage = (id: number) => {
    savePages(pages.filter(p => p.id !== id));
  };

  const deletePages = (ids: number[]) => {
    savePages(pages.filter(p => !ids.includes(p.id)));
  };

  const getPageById = (id: number) => pages.find(p => p.id === id);

  const getPageBySlug = (slug: string) => pages.find(p => p.slug === slug);

  const setAsHomepage = (id: number) => {
    const updated = pages.map(p => ({
      ...p,
      isHomepage: p.id === id,
    }));
    savePages(updated);
  };

  const stats = {
    total: pages.length,
    published: pages.filter(p => p.status === 'published').length,
    draft: pages.filter(p => p.status === 'draft').length,
  };

  return { 
    pages, 
    addPage, 
    updatePage, 
    deletePage, 
    deletePages,
    getPageById, 
    getPageBySlug,
    setAsHomepage,
    stats 
  };
};
