"use client";

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { cities, movies } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

export default function BookTicketPage({ params }: { params: { movieId: string } }) {
  const movie = movies.find(m => m.id === params.movieId);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

  if (!movie) {
    notFound();
  }

  const selectedCity = cities.find(c => c.id === selectedCityId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Book Tickets for {movie.title}</h1>
        <p className="text-muted-foreground">Select a city to see available theatres and showtimes.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Select City</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedCityId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          {selectedCity ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Theatres in {selectedCity.name}</h2>
              {selectedCity.theatres.map(theatre => (
                <Card key={theatre.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" /> {theatre.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{theatre.address}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {theatre.shows.map(show => (
                        <Button key={show.id} asChild variant="outline">
                          <Link href={`/book/${movie.id}/${theatre.id}/${show.id}`}>
                            <Clock className="mr-2 h-4 w-4" />
                            {show.time}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Please select a city to view theatres.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
