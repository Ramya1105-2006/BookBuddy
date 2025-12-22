export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  posterHint: string;
  language: string;
  genre: string[];
  duration: number; // in minutes
  rating: number; // out of 10
}

export interface Show {
  id: string;
  time: string; // e.g., "14:00"
  totalSeats: number;
  bookedSeatNumbers: string[];
}

export interface Theatre {
  id: string;
  name: string;
  address: string;
  shows: Show[];
}

export interface City {
  id: string;
  name: string;
  theatres: Theatre[];
}

export interface Seat {
  id: string;
  number: string;
  status: 'available' | 'booked' | 'selected';
}

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  theatreId: string;
  showId: string;
  seatNumbers: string[];
  totalAmount: number;
  bookingTime: Date;
}
