/**
 * API Service Layer
 * 
 * This module provides a centralized API layer that currently uses localStorage
 * but is structured to easily swap for real API calls later.
 * 
 * To switch to a real backend:
 * 1. Replace localStorage calls with fetch() to your API endpoints
 * 2. Update the BASE_URL constant
 * 3. Add authentication headers as needed
 */

import { Tour, Booking, Car } from '@/types';
import { STORAGE_KEYS, initializeMockData } from './mockData';

// Change this to your API base URL when ready
const BASE_URL = '/api';

// Initialize mock data on first import
initializeMockData();

// Generic helper to simulate API delay (remove when using real API)
const simulateDelay = (ms: number = 100) => new Promise(resolve => setTimeout(resolve, ms));

// ============= BOOKINGS API =============

export const bookingsApi = {
  async getAll(): Promise<Booking[]> {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return stored ? JSON.parse(stored) : [];
  },

  async getById(id: string): Promise<Booking | null> {
    await simulateDelay();
    const bookings = await this.getAll();
    return bookings.find(b => b.id === id) || null;
  },

  async create(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    await simulateDelay();
    const bookings = await this.getAll();
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([...bookings, newBooking]));
    return newBooking;
  },

  async update(id: string, updates: Partial<Booking>): Promise<Booking | null> {
    await simulateDelay();
    const bookings = await this.getAll();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    bookings[index] = { ...bookings[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    return bookings[index];
  },

  async delete(id: string): Promise<boolean> {
    await simulateDelay();
    const bookings = await this.getAll();
    const filtered = bookings.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(filtered));
    return filtered.length < bookings.length;
  },

  async updateStatus(id: string, status: Booking['status']): Promise<Booking | null> {
    return this.update(id, { status });
  },

  async getStats() {
    const bookings = await this.getAll();
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    return { total, pending, confirmed, completed, cancelled, totalRevenue };
  },
};

// ============= TOURS API =============

export const toursApi = {
  async getAll(): Promise<Tour[]> {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.TOURS);
    return stored ? JSON.parse(stored) : [];
  },

  async getById(id: string): Promise<Tour | null> {
    await simulateDelay();
    const tours = await this.getAll();
    return tours.find(t => t.id === id) || null;
  },

  async create(tour: Omit<Tour, 'id' | 'createdAt'>): Promise<Tour> {
    await simulateDelay();
    const tours = await this.getAll();
    const newTour: Tour = {
      ...tour,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify([...tours, newTour]));
    return newTour;
  },

  async update(id: string, updates: Partial<Tour>): Promise<Tour | null> {
    await simulateDelay();
    const tours = await this.getAll();
    const index = tours.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    tours[index] = { ...tours[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(tours));
    return tours[index];
  },

  async delete(id: string): Promise<boolean> {
    await simulateDelay();
    const tours = await this.getAll();
    const filtered = tours.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(filtered));
    return filtered.length < tours.length;
  },

  async getFeatured(): Promise<Tour[]> {
    const tours = await this.getAll();
    return tours.filter(t => t.featured);
  },
};

// ============= CARS API =============

export const carsApi = {
  async getAll(): Promise<Car[]> {
    await simulateDelay();
    const stored = localStorage.getItem(STORAGE_KEYS.CARS);
    return stored ? JSON.parse(stored) : [];
  },

  async getById(id: string): Promise<Car | null> {
    await simulateDelay();
    const cars = await this.getAll();
    return cars.find(c => c.id === id) || null;
  },

  async create(car: Omit<Car, 'id'>): Promise<Car> {
    await simulateDelay();
    const cars = await this.getAll();
    const newCar: Car = {
      ...car,
      id: Date.now().toString(),
    };
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify([...cars, newCar]));
    return newCar;
  },

  async update(id: string, updates: Partial<Car>): Promise<Car | null> {
    await simulateDelay();
    const cars = await this.getAll();
    const index = cars.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    cars[index] = { ...cars[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
    return cars[index];
  },

  async delete(id: string): Promise<boolean> {
    await simulateDelay();
    const cars = await this.getAll();
    const filtered = cars.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(filtered));
    return filtered.length < cars.length;
  },

  async getAvailable(): Promise<Car[]> {
    const cars = await this.getAll();
    return cars.filter(c => c.available);
  },
};

// ============= SERVICES API (for taxi services) =============

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  image: string;
  isActive: boolean;
  createdAt: string;
}

const SERVICES_KEY = 'greencab_services';

const initialServices: Service[] = [
  {
    id: '1',
    name: 'Airport Transfer',
    description: 'Reliable airport pickup and drop-off service',
    basePrice: 500,
    pricePerKm: 15,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    isActive: true,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Local City Ride',
    description: 'Comfortable rides within the city',
    basePrice: 100,
    pricePerKm: 12,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
    isActive: true,
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Outstation Trip',
    description: 'Long distance travel with experienced drivers',
    basePrice: 2000,
    pricePerKm: 10,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    isActive: true,
    createdAt: '2024-01-01',
  },
  {
    id: '4',
    name: 'Wedding Car Rental',
    description: 'Luxury cars for your special day',
    basePrice: 5000,
    pricePerKm: 20,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    isActive: true,
    createdAt: '2024-01-01',
  },
];

// Initialize services
if (!localStorage.getItem(SERVICES_KEY)) {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(initialServices));
}

export const servicesApi = {
  async getAll(): Promise<Service[]> {
    await simulateDelay();
    const stored = localStorage.getItem(SERVICES_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  async getById(id: string): Promise<Service | null> {
    await simulateDelay();
    const services = await this.getAll();
    return services.find(s => s.id === id) || null;
  },

  async create(service: Omit<Service, 'id' | 'createdAt'>): Promise<Service> {
    await simulateDelay();
    const services = await this.getAll();
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem(SERVICES_KEY, JSON.stringify([...services, newService]));
    return newService;
  },

  async update(id: string, updates: Partial<Service>): Promise<Service | null> {
    await simulateDelay();
    const services = await this.getAll();
    const index = services.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    services[index] = { ...services[index], ...updates };
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
    return services[index];
  },

  async delete(id: string): Promise<boolean> {
    await simulateDelay();
    const services = await this.getAll();
    const filtered = services.filter(s => s.id !== id);
    localStorage.setItem(SERVICES_KEY, JSON.stringify(filtered));
    return filtered.length < services.length;
  },

  async getActive(): Promise<Service[]> {
    const services = await this.getAll();
    return services.filter(s => s.isActive);
  },
};

// ============= DASHBOARD STATS =============

export const dashboardApi = {
  async getStats() {
    const [bookings, tours, cars, services] = await Promise.all([
      bookingsApi.getAll(),
      toursApi.getAll(),
      carsApi.getAll(),
      servicesApi.getAll(),
    ]);

    const bookingStats = await bookingsApi.getStats();

    return {
      totalBookings: bookings.length,
      pendingBookings: bookingStats.pending,
      confirmedBookings: bookingStats.confirmed,
      completedBookings: bookingStats.completed,
      cancelledBookings: bookingStats.cancelled,
      totalRevenue: bookingStats.totalRevenue,
      activeTours: tours.length,
      availableCars: cars.filter(c => c.available).length,
      totalCars: cars.length,
      activeServices: services.filter(s => s.isActive).length,
      recentBookings: [...bookings]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    };
  },
};
