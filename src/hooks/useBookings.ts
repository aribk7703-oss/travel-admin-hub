import { useState, useEffect, useCallback } from 'react';
import { Booking } from '@/types';
import { STORAGE_KEYS, initializeMockData } from '@/lib/mockData';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadBookings = useCallback(() => {
    initializeMockData();
    const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (stored) {
      setBookings(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const saveBookings = (newBookings: Booking[]) => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(newBookings));
    setBookings(newBookings);
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    saveBookings([...bookings, newBooking]);
    return newBooking;
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    const updated = bookings.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    );
    saveBookings(updated);
  };

  const deleteBooking = (id: string) => {
    saveBookings(bookings.filter(booking => booking.id !== id));
  };

  const updateStatus = (id: string, status: Booking['status']) => {
    updateBooking(id, { status });
  };

  const getBookingsByStatus = (status: Booking['status']) => {
    return bookings.filter(booking => booking.status === status);
  };

  const getRecentBookings = (limit = 5) => {
    return [...bookings]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  const getStats = () => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    return { total, pending, confirmed, completed, cancelled, totalRevenue };
  };

  return {
    bookings,
    isLoading,
    addBooking,
    updateBooking,
    deleteBooking,
    updateStatus,
    getBookingsByStatus,
    getRecentBookings,
    getStats,
    refresh: loadBookings,
  };
}
