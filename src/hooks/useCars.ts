import { useState, useEffect } from "react";

export interface Car {
  id: number;
  name: string;
  type: string;
  seats: number;
  feature: string;
  pricePerKm: string;
  status: "active" | "inactive" | "maintenance";
  image: string;
}

const defaultCars: Car[] = [
  {
    id: 1,
    name: "Executive Sedan",
    type: "Sedan",
    seats: 4,
    feature: "3 Bags",
    pricePerKm: "₹13/km",
    status: "active",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&h=120&fit=crop",
  },
  {
    id: 2,
    name: "Premium SUV",
    type: "SUV",
    seats: 7,
    feature: "5 Bags",
    pricePerKm: "₹18/km",
    status: "active",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200&h=120&fit=crop",
  },
  {
    id: 3,
    name: "City Hatchback",
    type: "Hatchback",
    seats: 4,
    feature: "Budget",
    pricePerKm: "₹11/km",
    status: "active",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=120&fit=crop",
  },
  {
    id: 4,
    name: "Tempo Traveller",
    type: "Traveller",
    seats: 17,
    feature: "Fully AC",
    pricePerKm: "₹24/km",
    status: "active",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=120&fit=crop",
  },
  {
    id: 5,
    name: "Economy MUV",
    type: "MUV",
    seats: 6,
    feature: "Diesel",
    pricePerKm: "₹15/km",
    status: "maintenance",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=120&fit=crop",
  },
  {
    id: 6,
    name: "Luxury Tourist Coach",
    type: "Bus",
    seats: 40,
    feature: "Video Coach",
    pricePerKm: "Contact",
    status: "active",
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=200&h=120&fit=crop",
  },
];

const STORAGE_KEY = "travel_admin_cars";

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultCars;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  }, [cars]);

  const addCar = (car: Omit<Car, "id">) => {
    const newCar = { ...car, id: Date.now() };
    setCars((prev) => [...prev, newCar]);
    return newCar;
  };

  const updateCar = (id: number, updates: Partial<Car>) => {
    setCars((prev) =>
      prev.map((car) => (car.id === id ? { ...car, ...updates } : car))
    );
  };

  const deleteCar = (id: number) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  const getCarById = (id: number) => cars.find((car) => car.id === id);

  const stats = {
    total: cars.length,
    active: cars.filter((c) => c.status === "active").length,
    maintenance: cars.filter((c) => c.status === "maintenance").length,
    totalSeats: cars.reduce((sum, c) => sum + c.seats, 0),
  };

  return { cars, addCar, updateCar, deleteCar, getCarById, stats };
};
