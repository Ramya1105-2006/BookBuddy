
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { movies } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Ticket, Edit, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Booking } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const getBookingsFromStorage = (): Booking[] => {
  if (typeof window === 'undefined') return [];
  try {
    const storedBookings = localStorage.getItem('bookbuddy-bookings');
    if (storedBookings) {
      const parsed = JSON.parse(storedBookings);
      return parsed.map((b: any) => ({ ...b, bookingTime: new Date(b.bookingTime) }));
    }
    return [];
  } catch (error) {
    console.error("Failed to read bookings from localStorage", error);
    return [];
  }
};

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
});

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      avatarUrl: user?.avatarUrl || "",
    },
  });
  
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        avatarUrl: user.avatarUrl || "",
      });
      const allBookings = getBookingsFromStorage();
      const filteredBookings = allBookings
        .filter(b => b.userId === user.id)
        .sort((a, b) => new Date(b.bookingTime).getTime() - new Date(a.bookingTime).getTime());
      setUserBookings(filteredBookings);
    }
  }, [user, form]);
  
  if (!user) {
    return null; 
  }

  const handleEditToggle = () => {
    if (isEditing) {
      form.reset({ name: user.name, avatarUrl: user.avatarUrl || "" });
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    setIsSaving(true);
    try {
      await updateUser(values);
      toast({ title: "Profile Updated", description: "Your changes have been saved." });
      setIsEditing(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Update Failed", description: error.message });
    } finally {
      setIsSaving(false);
    }
  };
  
  const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center relative">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatarUrl || `https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                  <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              {!isEditing ? (
                <>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleEditToggle}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                 <CardTitle className="text-2xl">Edit Profile</CardTitle>
              )}
            </CardHeader>
            {isEditing && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="avatarUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Avatar URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.png" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={handleEditToggle} disabled={isSaving}>Cancel</Button>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? <Loader2 className="animate-spin" /> : 'Save'}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            )}
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
