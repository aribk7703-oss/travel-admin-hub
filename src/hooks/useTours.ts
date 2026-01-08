import { useState, useEffect } from 'react';

export interface Tour {
  id: number;
  name: string;
  description: string;
  location: string;
  duration: string;
  price: string;
  status: 'active' | 'inactive' | 'upcoming';
  image: string;
}

const defaultTours: Tour[] = [
  {
    id: 1,
    name: "Ajanta Caves Tour",
    description: "Ancient Buddhist cave paintings and sculptures, UNESCO World Heritage Site.",
    location: "Aurangabad → Ajanta",
    duration: "Full Day",
    price: "₹2,500",
    status: "active",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    name: "Ellora Caves Tour",
    description: "Rock-cut temples including the world-famous Kailasa Temple.",
    location: "Aurangabad → Ellora",
    duration: "Full Day",
    price: "₹2,200",
    status: "active",
    image: "https://images.unsplash.com/photo-1590123485320-7c6bc8e85c50?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    name: "Aurangabad Caves",
    description: "Peaceful Buddhist caves located within Aurangabad city.",
    location: "City Tour",
    duration: "Half Day",
    price: "₹1,200",
    status: "active",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    name: "Bibi Ka Maqbara",
    description: "The Taj of Deccan, built in memory of Aurangzeb's wife.",
    location: "Aurangabad City",
    duration: "Half Day",
    price: "₹1,000",
    status: "active",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    name: "Daulatabad Fort",
    description: "One of India's most powerful hill forts with unique defense systems.",
    location: "Aurangabad → Daulatabad",
    duration: "Half Day",
    price: "₹1,500",
    status: "active",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    name: "Panchakki",
    description: "Historic water mill with spiritual and engineering significance.",
    location: "Aurangabad City",
    duration: "2 Hours",
    price: "₹800",
    status: "inactive",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=250&fit=crop",
  },
  {
    id: 7,
    name: "Grishneshwar Jyotirlinga",
    description: "One of the 12 Jyotirlingas of Lord Shiva, near Ellora Caves.",
    location: "Ellora Area",
    duration: "3 Hours",
    price: "₹1,100",
    status: "active",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
  },
  {
    id: 8,
    name: "Khuldabad",
    description: "Known as the Valley of Saints, resting place of Mughal emperors.",
    location: "Near Ellora",
    duration: "3 Hours",
    price: "₹1,300",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=250&fit=crop",
  },
  {
    id: 9,
    name: "Shirdi & Shani Shingnapur",
    description: "One-day spiritual tour covering Shirdi Sai Baba Temple and Shani Shingnapur.",
    location: "Aurangabad → Shirdi → Shani",
    duration: "Full Day",
    price: "₹3,500",
    status: "active",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06a1e6?w=400&h=250&fit=crop",
  },
];

const STORAGE_KEY = 'dashboard_tours';

export const useTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTours(JSON.parse(stored));
    } else {
      setTours(defaultTours);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTours));
    }
  }, []);

  const saveTours = (newTours: Tour[]) => {
    setTours(newTours);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTours));
  };

  const addTour = (tour: Omit<Tour, 'id'>) => {
    const newTour = { ...tour, id: Date.now() };
    saveTours([...tours, newTour]);
    return newTour;
  };

  const updateTour = (id: number, updates: Partial<Tour>) => {
    const updated = tours.map(t => t.id === id ? { ...t, ...updates } : t);
    saveTours(updated);
  };

  const deleteTour = (id: number) => {
    saveTours(tours.filter(t => t.id !== id));
  };

  const getTourById = (id: number) => tours.find(t => t.id === id);

  const stats = {
    total: tours.length,
    active: tours.filter(t => t.status === 'active').length,
    inactive: tours.filter(t => t.status === 'inactive').length,
    upcoming: tours.filter(t => t.status === 'upcoming').length,
  };

  return { tours, addTour, updateTour, deleteTour, getTourById, stats };
};
