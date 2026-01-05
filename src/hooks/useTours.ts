import { useState, useEffect, useCallback } from 'react';
import { Tour } from '@/types';
import { STORAGE_KEYS, initializeMockData } from '@/lib/mockData';

export function useTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTours = useCallback(() => {
    initializeMockData();
    const stored = localStorage.getItem(STORAGE_KEYS.TOURS);
    if (stored) {
      setTours(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadTours();
  }, [loadTours]);

  const saveTours = (newTours: Tour[]) => {
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(newTours));
    setTours(newTours);
  };

  const addTour = (tour: Omit<Tour, 'id' | 'createdAt'>) => {
    const newTour: Tour = {
      ...tour,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    saveTours([...tours, newTour]);
    return newTour;
  };

  const updateTour = (id: string, updates: Partial<Tour>) => {
    const updated = tours.map(tour => 
      tour.id === id ? { ...tour, ...updates } : tour
    );
    saveTours(updated);
  };

  const deleteTour = (id: string) => {
    saveTours(tours.filter(tour => tour.id !== id));
  };

  const getTourById = (id: string) => {
    return tours.find(tour => tour.id === id);
  };

  const getFeaturedTours = () => {
    return tours.filter(tour => tour.featured);
  };

  return {
    tours,
    isLoading,
    addTour,
    updateTour,
    deleteTour,
    getTourById,
    getFeaturedTours,
    refresh: loadTours,
  };
}
