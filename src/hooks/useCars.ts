import { useState, useEffect, useCallback } from 'react';
import { Car } from '@/types';
import { STORAGE_KEYS, initializeMockData } from '@/lib/mockData';

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCars = useCallback(() => {
    initializeMockData();
    const stored = localStorage.getItem(STORAGE_KEYS.CARS);
    if (stored) {
      setCars(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const saveCars = (newCars: Car[]) => {
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(newCars));
    setCars(newCars);
  };

  const addCar = (car: Omit<Car, 'id'>) => {
    const newCar: Car = {
      ...car,
      id: Date.now().toString(),
    };
    saveCars([...cars, newCar]);
    return newCar;
  };

  const updateCar = (id: string, updates: Partial<Car>) => {
    const updated = cars.map(car => 
      car.id === id ? { ...car, ...updates } : car
    );
    saveCars(updated);
  };

  const deleteCar = (id: string) => {
    saveCars(cars.filter(car => car.id !== id));
  };

  const toggleAvailability = (id: string) => {
    const car = cars.find(c => c.id === id);
    if (car) {
      updateCar(id, { available: !car.available });
    }
  };

  const getAvailableCars = () => {
    return cars.filter(car => car.available);
  };

  return {
    cars,
    isLoading,
    addCar,
    updateCar,
    deleteCar,
    toggleAvailability,
    getAvailableCars,
    refresh: loadCars,
  };
}
