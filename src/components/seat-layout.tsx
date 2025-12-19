"use client";

import { Seat } from '@/lib/types';
import { Armchair } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Show } from '@/lib/types';

interface SeatLayoutProps {
  show: Show;
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

const generateSeats = (show: Show): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = 10;

  for (const row of rows) {
    for (let i = 1; i <= cols; i++) {
      const number = `${row}${i}`;
      const status = show.bookedSeatNumbers.includes(number) ? 'booked' : 'available';
      seats.push({ id: number, number, status });
    }
  }
  return seats;
};


export function SeatLayout({ show, selectedSeats, onSeatSelect }: SeatLayoutProps) {
  const allSeats = generateSeats(show);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status !== 'booked') {
      onSeatSelect(seat);
    }
  };

  return (
    <div className="p-4 bg-card rounded-lg border">
        <div className="w-full h-8 bg-foreground/10 rounded-md mb-8 flex items-center justify-center text-sm text-muted-foreground tracking-widest">
            SCREEN
        </div>
      <div className="flex flex-col items-center gap-2">
        {['A', 'B', 'C', 'D', 'E', 'F'].map(row => (
          <div key={row} className="flex gap-2">
            {allSeats.filter(s => s.number.startsWith(row)).map(seat => {
              const isSelected = selectedSeats.some(s => s.id === seat.id);
              return (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.status === 'booked'}
                  className={cn(
                    "p-1 rounded-md transition-colors",
                    seat.status === 'booked' && 'cursor-not-allowed',
                    seat.status === 'available' && 'hover:bg-primary/20',
                    isSelected && 'bg-accent'
                  )}
                  aria-label={`Seat ${seat.number}`}
                >
                  <Armchair className={cn(
                    "w-6 h-6",
                    seat.status === 'booked' && 'text-muted-foreground/50',
                    seat.status === 'available' && 'text-foreground',
                    isSelected && 'text-accent-foreground'
                  )} />
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-8 text-sm">
        <div className="flex items-center gap-2">
            <Armchair className="w-4 h-4 text-foreground" />
            <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
            <Armchair className="w-4 h-4 text-accent" />
            <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
            <Armchair className="w-4 h-4 text-muted-foreground/50" />
            <span>Booked</span>
        </div>
      </div>
    </div>
  );
}
