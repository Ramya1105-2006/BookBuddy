import { Movie, User, City, Booking, Show } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const users: User[] = [
  { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
];

export const genres = ['Sci-Fi', 'Cyberpunk', 'Fantasy', 'Adventure', 'Action', 'Drama', 'Comedy'];
export const languages = ['English', 'Mandarin', 'Spanish'];

export const movies: Movie[] = [
  {
    id: 'movie-1',
    title: 'Cosmic Odyssey',
    description: 'A thrilling journey across galaxies to save humanity from an unknown cosmic threat. A team of astronauts must navigate black holes and alien planets.',
    posterUrl: PlaceHolderImages[0].imageUrl,
    posterHint: PlaceHolderImages[0].imageHint,
    language: 'English',
    genre: ['Sci-Fi', 'Adventure'],
    duration: 148,
    rating: 8.5,
  },
  {
    id: 'movie-2',
    title: 'Cyberpunk City',
    description: 'In a neon-lit metropolis, a detective uncovers a conspiracy that threatens to topple the city\'s corporate overlords.',
    posterUrl: PlaceHolderImages[1].imageUrl,
    posterHint: PlaceHolderImages[1].imageHint,
    language: 'English',
    genre: ['Cyberpunk', 'Action'],
    duration: 125,
    rating: 8.2,
  },
  {
    id: 'movie-3',
    title: 'The Last Kingdom',
    description: 'In a land of myth and magic, a young warrior must reclaim his birthright and unite a fractured kingdom against a dark sorcerer.',
    posterUrl: PlaceHolderImages[2].imageUrl,
    posterHint: PlaceHolderImages[2].imageHint,
    language: 'English',
    genre: ['Fantasy', 'Action'],
    duration: 160,
    rating: 9.0,
  },
  {
    id: 'movie-4',
    title: "Ocean's Depths",
    description: 'A team of marine biologists discovers a lost underwater civilization, but their presence awakens a dormant leviathan.',
    posterUrl: PlaceHolderImages[3].imageUrl,
    posterHint: PlaceHolderImages[3].imageHint,
    language: 'English',
    genre: ['Adventure', 'Sci-Fi'],
    duration: 110,
    rating: 7.8,
  },
  {
    id: 'movie-5',
    title: 'Jungle Quest',
    description: 'An intrepid explorer races against a rival to find a legendary lost city of gold deep in the Amazon rainforest.',
    posterUrl: PlaceHolderImages[4].imageUrl,
    posterHint: PlaceHolderImages[4].imageHint,
    language: 'Spanish',
    genre: ['Adventure', 'Action'],
    duration: 118,
    rating: 7.5,
  },
  {
    id: 'movie-6',
    title: 'Chronos Detective',
    description: 'A private eye in a steampunk world must solve a murder that spans across different timelines, using a device that can manipulate time.',
    posterUrl: PlaceHolderImages[5].imageUrl,
    posterHint: PlaceHolderImages[5].imageHint,
    language: 'English',
    genre: ['Sci-Fi', 'Mystery'],
    duration: 132,
    rating: 8.6,
  },
  {
    id: 'movie-7',
    title: 'Hearts of Steel',
    description: 'A gripping tale of camaraderie and survival among a tank crew during a pivotal battle in World War II.',
    posterUrl: PlaceHolderImages[6].imageUrl,
    posterHint: PlaceHolderImages[6].imageHint,
    language: 'English',
    genre: ['Drama', 'War'],
    duration: 155,
    rating: 8.8,
  },
  {
    id: 'movie-8',
    title: 'Laugh Riot',
    description: 'A struggling stand-up comedian gets a once-in-a-lifetime shot at fame, but must overcome his stage fright and a series of hilarious mishaps.',
    posterUrl: PlaceHolderImages[7].imageUrl,
    posterHint: PlaceHolderImages[7].imageHint,
    language: 'English',
    genre: ['Comedy'],
    duration: 95,
    rating: 7.2,
  },
  {
    id: 'movie-9',
    title: 'The Wandering Earth',
    description: 'As the sun is dying out, people all around the world build giant planet thrusters to move Earth out of its orbit and sail Earth to a new star system.',
    posterUrl: PlaceHolderImages[8].imageUrl,
    posterHint: PlaceHolderImages[8].imageHint,
    language: 'Mandarin',
    genre: ['Sci-Fi', 'Action'],
    duration: 125,
    rating: 7.9,
  },
  {
    id: 'movie-10',
    title: 'Forgotten Realms',
    description: 'A young cartographer discovers a map that leads to a hidden world of mythical creatures and ancient magic, and must protect it from those who would exploit it.',
    posterUrl: PlaceHolderImages[9].imageUrl,
    posterHint: PlaceHolderImages[9].imageHint,
    language: 'English',
    genre: ['Fantasy', 'Adventure'],
    duration: 140,
    rating: 8.1,
  },
];

const generateBookedSeats = (totalSeats: number, fraction: number): string[] => {
    const bookedCount = Math.floor(totalSeats * fraction);
    const seats: string[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const cols = 10;
    
    while(seats.length < bookedCount) {
        const row = rows[Math.floor(Math.random() * rows.length)];
        const col = Math.floor(Math.random() * cols) + 1;
        const seatNumber = `${row}${col}`;
        if (!seats.includes(seatNumber)) {
            seats.push(seatNumber);
        }
    }
    return seats;
};


const shows: Show[] = [
    { id: 'show-1', time: '14:00', totalSeats: 60, bookedSeatNumbers: generateBookedSeats(60, 0.4) },
    { id: 'show-2', time: '17:00', totalSeats: 60, bookedSeatNumbers: generateBookedSeats(60, 0.6) },
    { id: 'show-3', time: '20:00', totalSeats: 60, bookedSeatNumbers: generateBookedSeats(60, 0.8) },
    { id: 'show-4', time: '15:00', totalSeats: 60, bookedSeatNumbers: generateBookedSeats(60, 0.3) },
    { id: 'show-5', time: '18:30', totalSeats: 60, bookedSeatNumbers: generateBookedSeats(60, 0.5) },
    { id: 'show-6', time: '21:30', totalSeats: 60, bookedSeatNumbers: generateBookedSeats(60, 0.7) },
];

export const cities: City[] = [
  {
    id: 'city-1',
    name: 'Metropolis',
    theatres: [
      { id: 'theatre-1', name: 'Grand Cinemax', address: '123 Film Row', shows: [shows[0], shows[1], shows[2]] },
      { id: 'theatre-2', name: 'The Picture Palace', address: '456 Movie Lane', shows: [shows[3], shows[4], shows[5]] },
    ],
  },
  {
    id: 'city-2',
    name: 'Gotham',
    theatres: [
      { id: 'theatre-3', name: 'Artisan Films', address: '789 Indie Blvd', shows: [shows[0], shows[4], shows[2]] },
      { id: 'theatre-4', name: 'Multiplex 3000', address: '101 Blockbuster Ave', shows: [shows[3], shows[1], shows[5]] },
    ],
  },
];

export const bookings: Booking[] = [
    {
        id: 'booking-1',
        userId: 'user-1',
        movieId: 'movie-1',
        theatreId: 'theatre-1',
        showId: 'show-1',
        seatNumbers: ['C5', 'C6'],
        totalAmount: 30.00,
        bookingTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    }
];

export const createBooking = async (bookingData: Omit<Booking, 'id' | 'bookingTime'>): Promise<Booking> => {
  // In a real app, this would interact with a database and a payment gateway.
  // We'll simulate that here.
  return new Promise(resolve => {
    setTimeout(() => {
      const newBooking: Booking = {
        ...bookingData,
        id: `booking-${Date.now()}`,
        bookingTime: new Date(),
      };
      
      // Add booking to our mock database
      bookings.push(newBooking);

      // Update booked seats for the show
      const city = cities.find(c => c.theatres.some(t => t.id === bookingData.theatreId));
      const theatre = city?.theatres.find(t => t.id === bookingData.theatreId);
      const show = theatre?.shows.find(s => s.id === bookingData.showId);
      if (show) {
          show.bookedSeatNumbers.push(...bookingData.seatNumbers);
      }

      resolve(newBooking);
    }, 1500); // Simulate network delay
  });
};
