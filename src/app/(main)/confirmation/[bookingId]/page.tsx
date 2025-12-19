import { notFound } from 'next/navigation';
import { bookings, movies, cities } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';

export default function ConfirmationPage({ params }: { params: { bookingId: string } }) {
  const booking = bookings.find(b => b.id === params.bookingId);
  
  if (!booking) {
    notFound();
  }

  const movie = movies.find(m => m.id === booking.movieId);
  const theatre = cities.flatMap(c => c.theatres).find(t => t.id === booking.theatreId);
  const show = theatre?.shows.find(s => s.id === booking.showId);

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-2xl">
        <CardHeader className="items-center text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold">Booking Confirmed!</CardTitle>
          <CardDescription>Your tickets for {movie?.title} are booked. Enjoy the show!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
            <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Booking ID</span>
                    <span className="font-mono text-sm">{booking.id}</span>
                </div>
            </div>
            <div className="space-y-4">
                 <h3 className="font-semibold text-lg">{movie?.title}</h3>
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Theatre</span>
                        <span className="font-medium">{theatre?.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Show Time</span>
                        <span className="font-medium">{show?.time}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Seats</span>
                        <span className="font-medium">{booking.seatNumbers.join(', ')}</span>
                    </div>
                 </div>
            </div>

          <Separator />
          
            <div className="flex justify-between text-xl font-bold">
                <span>Total Amount Paid</span>
                <span>${booking.totalAmount.toFixed(2)}</span>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
