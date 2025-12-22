"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { movies } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Booking } from '@/lib/types';

// Helper function to get bookings from localStorage
const getBookingsFromStorage = (): Booking[] => {
  if (typeof window === 'undefined') return [];
  try {
    const storedBookings = localStorage.getItem('bookbuddy-bookings');
    if (storedBookings) {
      const parsed = JSON.parse(storedBookings);
      // Revive date objects
      return parsed.map((b: any) => ({ ...b, bookingTime: new Date(b.bookingTime) }));
    }
    return [];
  } catch (error) {
    console.error("Failed to read bookings from localStorage", error);
    return [];
  }
};


export default function ProfilePage() {
  const { user } = useAuth();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) {
      const allBookings = getBookingsFromStorage();
      const filteredBookings = allBookings
        .filter(b => b.userId === user.id)
        .sort((a, b) => new Date(b.bookingTime).getTime() - new Date(a.bookingTime).getTime());
      setUserBookings(filteredBookings);
    }
  }, [user]);
  
  if (!user) {
    return null; // Or a loading state
  }
  
  const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                  <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
              <CardDescription>Here are all your past bookings.</CardDescription>
            </CardHeader>
            <CardContent>
              {userBookings.length > 0 ? (
                <ul className="space-y-4">
                  {userBookings.map(booking => {
                    const movie = movies.find(m => m.id === booking.movieId);
                    const bookingTime = new Date(booking.bookingTime);
                    return (
                      <li key={booking.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{movie?.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {bookingTime.toLocaleDateString()} &bull; {booking.seatNumbers.length} ticket(s)
                            </p>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/confirmation/${booking.id}`}>
                               <Ticket className="mr-2 h-4 w-4" />
                                View
                            </Link>
                          </Button>
                        </div>
                        <Separator className="mt-4" />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-8">You have no booking history.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
