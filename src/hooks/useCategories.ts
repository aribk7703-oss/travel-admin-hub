import { useState, useEffect } from 'react';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent: string | null;
  type: 'location' | 'tour' | 'car';
  status: 'publish' | 'draft';
  createdAt: string;
}

const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Heritage Sites',
    slug: 'heritage-sites',
    description: 'Historical and heritage locations',
    parent: null,
    type: 'location',
    status: 'publish',
    createdAt: '2025-01-01'
  },
  {
    id: '2',
    name: 'Caves',
    slug: 'caves',
    description: 'Ancient caves and rock-cut monuments',
    parent: null,
    type: 'location',
    status: 'publish',
    createdAt: '2025-01-01'
  },
  {
    id: '3',
    name: 'Temples',
    slug: 'temples',
    description: 'Religious temples and shrines',
    parent: null,
    type: 'location',
    status: 'publish',
    createdAt: '2025-01-01'
  },
  {
    id: '4',
    name: 'Adventure Tours',
    slug: 'adventure-tours',
    description: 'Thrilling adventure experiences',
    parent: null,
    type: 'tour',
    status: 'publish',
    createdAt: '2025-01-01'
  },
  {
    id: '5',
    name: 'Cultural Tours',
    slug: 'cultural-tours',
    description: 'Cultural and heritage tours',
    parent: null,
    type: 'tour',
    status: 'publish',
    createdAt: '2025-01-01'
  },
  {
    id: '6',
    name: 'Pilgrimage Tours',
    slug: 'pilgrimage-tours',
    description: 'Religious pilgrimage packages',
    parent: null,
    type: 'tour',
    status: 'publish',
    createdAt: '2025-01-01'
  },
  {
    id: '7',
    name: 'Sedan',
    slug: 'sedan',
    description: 'Comfortable sedan cars',
    parent: null,
    type: 'car',
    status: 'publish',
    createdAt: '2025-01-01'
  },
  {
    id: '8',
    name: 'SUV',
    slug: 'suv',
    description: 'Spacious SUV vehicles',
    parent: null,
    type: 'car',
    status: 'publish',
    createdAt: '2025-01-01'
  },
  {
    id: '9',
    name: 'Luxury',
    slug: 'luxury',
    description: 'Premium luxury vehicles',
    parent: null,
    type: 'car',
    status: 'publish',
    createdAt: '2025-01-01'
  }
];

const STORAGE_KEY = 'dashboard_categories';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const addCategory = (category: Omit<Category, 'id' | 'createdAt' | 'slug'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      slug: generateSlug(category.name),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === id) {
          const updated = { ...cat, ...updates };
          if (updates.name) {
            updated.slug = generateSlug(updates.name);
          }
          return updated;
        }
        return cat;
      })
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const getCategoryById = (id: string) => categories.find(cat => cat.id === id);

  const getCategoriesByType = (type: 'location' | 'tour' | 'car') => 
    categories.filter(cat => cat.type === type);

  const getParentCategories = (type: 'location' | 'tour' | 'car') =>
    categories.filter(cat => cat.type === type && cat.parent === null);

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getCategoriesByType,
    getParentCategories
  };
};
