
import { Movie, User, City, Booking, Show } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
];

export const genres = ['Sci-Fi', 'Cyberpunk', 'Fantasy', 'Adventure', 'Action', 'Drama', 'Comedy', 'Mystery', 'War', 'Romance', 'Thriller', 'Horror', 'Crime', 'Biography', 'Sport'];
export const languages = ['English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Hindi'];

export const movies: Movie[] = [
    {
    id: 'movie-3',
    title: 'Vikram',
    description: 'A special agent investigates a murder committed by a masked group of serial killers. However, a tangled web of clues leads him to the drug kingpin of Chennai.',
    posterUrl: 'https://tse4.mm.bing.net/th/id/OIP._Vd7yA0EN7tv8300pRZvjgHaLP?rs=1&pid=ImgDetMain&o=7&rm=3',
    posterHint: 'action hero',
    language: 'Tamil',
    genre: ['Action', 'Thriller'],
    duration: 175,
    rating: 8.4,
  },
  {
    id: 'movie-4',
    title: "K.G.F: Chapter 2",
    description: 'In the blood-soaked Kolar Gold Fields, Rocky\'s name strikes fear into his foes. While his allies look up to him, the government sees him as a threat to law and order.',
    posterUrl: 'https://www.themoviedb.org/t/p/original/7qrViIiYfE79RYEYYaPt9eX3QE1.jpg',
    posterHint: 'powerful man',
    language: 'Kannada',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 168,
    rating: 8.3,
  },
  {
    id: 'movie-5',
    title: 'RRR',
    description: 'A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in the 1920s.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/uS1A15s0mC73s89e2Q2n2U4Sg3S.jpg',
    posterHint: 'two heroes',
    language: 'Telugu',
    genre: ['Action', 'Drama'],
    duration: 187,
    rating: 7.9,
  },
  {
    id: 'movie-6',
    title: 'Dangal',
    description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/p3sA2cQzRzA4sM4vH2fSJaA3tY.jpg',
    posterHint: 'wrestling family',
    language: 'Hindi',
    genre: ['Action', 'Biography', 'Drama'],
    duration: 161,
    rating: 8.4,
  },
   {
    id: 'movie-11',
    title: 'Asuran',
    description: 'A farmer from an underprivileged caste clashes with a wealthy, upper-caste landlord.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/v1x3b3aB6s4s3p2f4kGk1a4p3K.jpg',
    posterHint: 'village action',
    language: 'Tamil',
    genre: ['Action', 'Drama'],
    duration: 141,
    rating: 8.9,
  },
   {
    id: 'movie-12',
    title: 'Super Deluxe',
    description: 'An unfaithful wife, an estranged father, and an angry son find their lives intertwining on a fateful day.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gJbYy4o6kX3tS7gSj1sO3d5aA5N.jpg',
    posterHint: 'multiple stories',
    language: 'Tamil',
    genre: ['Thriller', 'Drama', 'Comedy'],
    duration: 176,
    rating: 8.4,
  },
   {
    id: 'movie-13',
    title: '3 Idiots',
    description: 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them "idiots".',
    posterUrl: 'https://image.tmdb.org/t/p/w500/bWc3D2T3K2s9S2Lw5m502XgAOKL.jpg',
    posterHint: 'college friends',
    language: 'Hindi',
    genre: ['Comedy', 'Drama'],
    duration: 170,
    rating: 8.4,
  },
   {
    id: 'movie-14',
    title: 'Andhadhun',
    description: 'A series of mysterious events change the life of a blind pianist, who must now report a crime that he should technically not know about.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/4JPErJd2Nc8Fj4aD7Hn1aDkP9p5.jpg',
    posterHint: 'blind pianist',
    language: 'Hindi',
    genre: ['Crime', 'Thriller'],
    duration: 139,
    rating: 8.2,
  },
  {
    id: 'movie-15',
    title: 'Bahubali: The Beginning',
    description: 'In the kingdom of Mahishmati, a chivalrous warrior named Sivudu, while pursuing his love, finds himself in a new world of adventure, war, and deceit.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/fT3m21N9Qx1t3o4a2a1t3o4.jpg',
    posterHint: 'epic warrior',
    language: 'Telugu',
    genre: ['Action', 'Drama'],
    duration: 159,
    rating: 8.0,
  },
  {
    id: 'movie-16',
    title: 'Manjummel Boys',
    description: 'A group of friends get into a daring rescue mission to save their friend from Guna Caves, a perilously deep pit from where nobody has ever been brought back.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/53z2sT6h0Wv3lA2k43j4sU1S8A1.jpg',
    posterHint: 'friends cave rescue',
    language: 'Malayalam',
    genre: ['Adventure', 'Thriller'],
    duration: 135,
    rating: 8.6,
  },
  {
    id: 'movie-17',
    title: 'Jai Bhim',
    description: 'When a tribal man is arrested for a case of alleged theft, his wife turns to a human-rights lawyer to help bring justice.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/yvoitHryh0i6iQWvA6b4x8g2C2f.jpg',
    posterHint: 'lawyer justice',
    language: 'Tamil',
    genre: ['Crime', 'Drama'],
    duration: 164,
    rating: 8.9,
  },
  {
    id: 'movie-18',
    title: 'Kantara',
    description: 'When greed paves the way for betrayal, scheming and murder, a young tribal reluctantly dons the traditions of his ancestors to seek justice.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/obgBq5I67pPAW2jYOjU8ZPAjIu.jpg',
    posterHint: 'tribal ritual',
    language: 'Kannada',
    genre: ['Action', 'Adventure', 'Drama'],
    duration: 148,
    rating: 8.3,
  },
  {
    id: 'movie-1',
    title: 'Jawan',
    description: 'A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in the society.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/jJb2s2j2j2j2j2j2j2j2j2j2j.jpg',
    posterHint: 'action hero pose',
    language: 'Hindi',
    genre: ['Action', 'Thriller'],
    duration: 169,
    rating: 7.0,
  },
   {
    id: 'movie-2',
    title: 'Leo',
    description: 'Parthiban is a mild-mannered cafe owner in Kashmir, who fends off a gang of murderous thugs and gains local fame. This brings him to the attention of a drug cartel who claim that he was once a part of them.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gGz0g0g0g0g0g0g0g0g0g0g0g.jpg',
    posterHint: 'intense man',
    language: 'Tamil',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 164,
    rating: 7.2,
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
    name: 'Chennai',
    theatres: [
      { id: 'theatre-1', name: 'PVR Cinemas, Grand Galada', address: 'Pallavaram, Chennai', shows: [shows[0], shows[1], shows[2]] },
      { id: 'theatre-2', name: 'AGS Cinemas, T. Nagar', address: 'T. Nagar, Chennai', shows: [shows[3], shows[4], shows[5]] },
    ],
  },
  {
    id: 'city-2',
    name: 'Mumbai',
    theatres: [
      { id: 'theatre-3', name: 'INOX, Atria Mall', address: 'Worli, Mumbai', shows: [shows[0], shows[4], shows[2]] },
      { id: 'theatre-4', name: 'Cinepolis, Andheri', address: 'Andheri West, Mumbai', shows: [shows[3], shows[1], shows[5]] },
    ],
  },
   {
    id: 'city-3',
    name: 'Bengaluru',
    theatres: [
      { id: 'theatre-5', name: 'PVR, Orion Mall', address: 'Rajajinagar, Bengaluru', shows: [shows[0], shows[1], shows[2]] },
      { id: 'theatre-6', name: 'INOX, Garuda Mall', address: 'Ashok Nagar, Bengaluru', shows: [shows[3], shows[4], shows[5]] },
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
        totalAmount: 300.00,
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

    
    
