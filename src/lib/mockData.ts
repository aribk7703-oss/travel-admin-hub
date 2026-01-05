import { Tour, Booking, Car } from '@/types';

export const initialTours: Tour[] = [
  {
    id: '1',
    title: 'Colombo City Tour',
    description: 'Explore the vibrant capital city with its colonial architecture, bustling markets, and cultural landmarks.',
    price: 75,
    duration: '4 hours',
    location: 'Colombo',
    image: 'https://images.unsplash.com/photo-1586076275858-eb02ffd2d0fc?w=800',
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Sigiriya Rock Fortress',
    description: 'Visit the ancient rock fortress, a UNESCO World Heritage Site with stunning frescoes and gardens.',
    price: 120,
    duration: '8 hours',
    location: 'Sigiriya',
    image: 'https://images.unsplash.com/photo-1588598198138-e4dc1a9f4506?w=800',
    featured: true,
    rating: 4.9,
    reviewCount: 256,
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    title: 'Kandy Temple Tour',
    description: 'Discover the sacred Temple of the Tooth and the beautiful botanical gardens.',
    price: 95,
    duration: '6 hours',
    location: 'Kandy',
    image: 'https://images.unsplash.com/photo-1590123717614-2664fa8b6b7c?w=800',
    featured: false,
    rating: 4.7,
    reviewCount: 89,
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    title: 'Galle Fort Heritage Walk',
    description: 'Walk through the historic Dutch fort with its charming streets and ocean views.',
    price: 65,
    duration: '3 hours',
    location: 'Galle',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    featured: true,
    rating: 4.6,
    reviewCount: 178,
    createdAt: '2024-02-10',
  },
  {
    id: '5',
    title: 'Yala Safari Adventure',
    description: 'Experience wildlife in its natural habitat with leopards, elephants, and exotic birds.',
    price: 150,
    duration: '10 hours',
    location: 'Yala',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    featured: true,
    rating: 4.9,
    reviewCount: 312,
    createdAt: '2024-02-15',
  },
];

export const initialBookings: Booking[] = [
  {
    id: '1',
    tourId: '1',
    tourTitle: 'Colombo City Tour',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    customerPhone: '+1 234 567 8900',
    date: '2024-03-15',
    guests: 2,
    totalPrice: 150,
    status: 'confirmed',
    createdAt: '2024-03-01',
  },
  {
    id: '2',
    tourId: '2',
    tourTitle: 'Sigiriya Rock Fortress',
    customerName: 'Emma Wilson',
    customerEmail: 'emma@example.com',
    customerPhone: '+44 20 7123 4567',
    date: '2024-03-18',
    guests: 4,
    totalPrice: 480,
    status: 'pending',
    createdAt: '2024-03-05',
  },
  {
    id: '3',
    tourId: '5',
    tourTitle: 'Yala Safari Adventure',
    customerName: 'Michael Brown',
    customerEmail: 'michael@example.com',
    customerPhone: '+61 2 9876 5432',
    date: '2024-03-20',
    guests: 3,
    totalPrice: 450,
    status: 'confirmed',
    createdAt: '2024-03-08',
  },
  {
    id: '4',
    tourId: '3',
    tourTitle: 'Kandy Temple Tour',
    customerName: 'Sarah Davis',
    customerEmail: 'sarah@example.com',
    customerPhone: '+1 555 123 4567',
    date: '2024-03-10',
    guests: 2,
    totalPrice: 190,
    status: 'completed',
    createdAt: '2024-02-28',
  },
  {
    id: '5',
    tourId: '4',
    tourTitle: 'Galle Fort Heritage Walk',
    customerName: 'David Lee',
    customerEmail: 'david@example.com',
    customerPhone: '+65 9123 4567',
    date: '2024-03-12',
    guests: 1,
    totalPrice: 65,
    status: 'cancelled',
    createdAt: '2024-03-02',
  },
];

export const initialCars: Car[] = [
  {
    id: '1',
    name: 'Toyota Prius',
    type: 'Hybrid',
    pricePerDay: 45,
    seats: 4,
    transmission: 'automatic',
    fuel: 'hybrid',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    available: true,
  },
  {
    id: '2',
    name: 'Honda Vezel',
    type: 'SUV',
    pricePerDay: 55,
    seats: 5,
    transmission: 'automatic',
    fuel: 'petrol',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    available: true,
  },
  {
    id: '3',
    name: 'Toyota HiAce',
    type: 'Van',
    pricePerDay: 85,
    seats: 12,
    transmission: 'manual',
    fuel: 'diesel',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800',
    available: false,
  },
];

// Storage keys
export const STORAGE_KEYS = {
  TOURS: 'greencab_tours',
  BOOKINGS: 'greencab_bookings',
  CARS: 'greencab_cars',
};

// Initialize data in localStorage if not present
export function initializeMockData() {
  if (!localStorage.getItem(STORAGE_KEYS.TOURS)) {
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(initialTours));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(initialBookings));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CARS)) {
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(initialCars));
  }
}
