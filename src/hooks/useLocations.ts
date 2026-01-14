import { useState, useEffect } from 'react';

export interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  type: 'heritage' | 'temple' | 'city' | 'fort' | 'cave';
  status: 'active' | 'inactive';
  image: string;
  category?: string;
}

const defaultLocations: Location[] = [
  {
    id: '1',
    name: 'Ajanta Caves',
    description: 'Ancient Buddhist rock-cut caves with stunning murals and sculptures dating back to 2nd century BCE.',
    coordinates: { lat: 20.5519, lng: 75.7033 },
    address: 'Ajanta, Maharashtra 431117',
    type: 'cave',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400'
  },
  {
    id: '2',
    name: 'Ellora Caves',
    description: 'UNESCO World Heritage site featuring Buddhist, Hindu and Jain rock-cut temples.',
    coordinates: { lat: 20.0269, lng: 75.1779 },
    address: 'Ellora, Maharashtra 431102',
    type: 'cave',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400'
  },
  {
    id: '3',
    name: 'Bibi Ka Maqbara',
    description: 'The Taj of the Deccan - a beautiful mausoleum built by Mughal prince Azam Shah.',
    coordinates: { lat: 19.9016, lng: 75.3196 },
    address: 'Begumpura, Aurangabad, Maharashtra 431001',
    type: 'heritage',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400'
  },
  {
    id: '4',
    name: 'Daulatabad Fort',
    description: 'Historic 12th century fortress known for its ingenious defense mechanisms.',
    coordinates: { lat: 19.9422, lng: 75.2214 },
    address: 'Daulatabad, Maharashtra 431002',
    type: 'fort',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400'
  },
  {
    id: '5',
    name: 'Grishneshwar Temple',
    description: 'One of the 12 Jyotirlingas of Lord Shiva, located near Ellora Caves.',
    coordinates: { lat: 20.0233, lng: 75.1817 },
    address: 'Verul, Maharashtra 431102',
    type: 'temple',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400'
  },
  {
    id: '6',
    name: 'Aurangabad Caves',
    description: 'Buddhist rock-cut shrines from 6th-7th century with beautiful sculptures.',
    coordinates: { lat: 19.9011, lng: 75.3269 },
    address: 'Aurangabad, Maharashtra 431001',
    type: 'cave',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400'
  },
  {
    id: '7',
    name: 'Khuldabad',
    description: 'Valley of Saints - home to tombs of Sufi saints and the tomb of Emperor Aurangzeb.',
    coordinates: { lat: 20.0006, lng: 75.1950 },
    address: 'Khuldabad, Maharashtra 431101',
    type: 'heritage',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400'
  },
  {
    id: '8',
    name: 'Panchakki',
    description: 'Historic water mill built in the 17th century, showcasing Mughal engineering.',
    coordinates: { lat: 19.8969, lng: 75.3278 },
    address: 'Aurangabad, Maharashtra 431001',
    type: 'heritage',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1609766857326-18c53f851e4e?w=400'
  },
  {
    id: '9',
    name: 'Shirdi',
    description: 'Pilgrimage town famous for Sai Baba Temple, Dwarkamai and Chavadi.',
    coordinates: { lat: 19.7662, lng: 74.4774 },
    address: 'Shirdi, Maharashtra 423109',
    type: 'temple',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400'
  }
];

const STORAGE_KEY = 'dashboard_locations';

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultLocations;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  }, [locations]);

  const addLocation = (location: Omit<Location, 'id'>) => {
    const newLocation = { ...location, id: Date.now().toString() };
    setLocations(prev => [...prev, newLocation]);
    return newLocation;
  };

  const updateLocation = (id: string, updates: Partial<Location>) => {
    setLocations(prev =>
      prev.map(loc => (loc.id === id ? { ...loc, ...updates } : loc))
    );
  };

  const deleteLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const getLocationById = (id: string) => locations.find(loc => loc.id === id);

  const stats = {
    total: locations.length,
    active: locations.filter(l => l.status === 'active').length,
    inactive: locations.filter(l => l.status === 'inactive').length,
    caves: locations.filter(l => l.type === 'cave').length,
    temples: locations.filter(l => l.type === 'temple').length,
    heritage: locations.filter(l => l.type === 'heritage').length
  };

  return { locations, addLocation, updateLocation, deleteLocation, getLocationById, stats };
};
