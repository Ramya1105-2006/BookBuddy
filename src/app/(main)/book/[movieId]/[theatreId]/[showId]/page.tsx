
"use client";

import { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { movies, cities, createBooking } from '@/lib/data';
import { SeatLayout } from '@/components/seat-layout';
import { Seat, Show } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const SEAT_PRICE = 150;

export default function SeatSelectionPage({ params }: { params: { movieId: string, theatreId: string, showId: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const movie = movies.find(m => m.id === params.movieId);
  const theatre = cities.flatMap(c => c.theatres).find(t => t.id === params.theatreId);
  const show = theatre?.shows.find(s => s.id === params.showId);

  if (!movie || !theatre || !show) {
    notFound();
  }

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeats(prev =>
      prev.some(s => s.id === seat.id)
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, { ...seat, status: 'selected' }]
    );
  };

  const totalAmount = selectedSeats.length * SEAT_PRICE;

  const handleConfirmBooking = async () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to book tickets.' });
      router.push('/login');
      return;
    }
    if (selectedSeats.length === 0) {
        toast({ variant: 'destructive', title: 'No seats selected', description: 'Please select at least one seat.' });
        return;
    }
    
    setIsLoading(true);
    try {
      const newBooking = await createBooking({
        userId: user.id,
        movieId: movie.id,
        theatreId: theatre.id,
        showId: show.id,
        seatNumbers: selectedSeats.map(s => s.number),
        totalAmount,
      });
      toast({ title: 'Booking Successful!', description: 'Redirecting to confirmation...' });
      router.push(`/confirmation/${newBooking.id}`);
    } catch (error) {
        toast({ variant: 'destructive', title: 'Booking Failed', description: 'Could not complete your booking. Please try again.' });
        setIsLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold tracking-tighter mb-4">Select Your Seats</h1>
            <SeatLayout show={show as Show} selectedSeats={selectedSeats} onSeatSelect={handleSeatSelect} />
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{movie.title}</CardTitle>
                    <CardDescription>{theatre.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Show Time</span>
                        <span className="font-medium">{show.time}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Seats</span>
                        <span className="font-medium text-right break-words max-w-[60%]">
                            {selectedSeats.length > 0 ? selectedSeats.map(s => s.number).join(', ') : 'None'}
                        </span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Tickets</span>
                        <span className="font-medium">{selectedSeats.length}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" onClick={handleConfirmBooking} disabled={isLoading || selectedSeats.length === 0}>
                         {isLoading ? <Loader2 className="animate-spin" /> : `Pay ₹${totalAmount.toFixed(2)}`}
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
