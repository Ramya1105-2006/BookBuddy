
"use client";

import { useState } from 'react';
import { movies } from '@/lib/data';
import { MovieCard } from '@/components/movie-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const topGenres = ['Action', 'Romance', 'Thriller', 'Sci-Fi', 'Horror'];
const topLanguages = ['English', 'Tamil', 'Hindi', 'Malayalam', 'Kannada', 'Telugu'];

export default function HomePage() {
  const trendingMovies = movies.filter(m => m.rating > 8.5);
  const top10Movies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);

  const getMoviesByGenre = (genre: string) => movies.filter(m => m.genre.includes(genre));
  const getMoviesByLanguage = (language: string) => movies.filter(m => m.language === language);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Top 10 Movies Section */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter">Top 10 Movies</h2>
              <p className="text-muted-foreground mt-2">Don't Miss the Most-Loved Flicks</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {top10Movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
          </section>

          {/* Trending Now Section */}
           <section>
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter">Trending Now</h2>
                <p className="text-muted-foreground mt-2">What's Hot in Theaters Right Now</p>
             </div>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {trendingMovies.map((movie) => (
                  <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                     <MovieCard movie={movie} trending />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-1.5rem] md:left-[-2.5rem]" />
              <CarouselNext className="right-[-1.5rem] md:right-[-2.5rem]" />
            </Carousel>
          </section>

          {/* Browse by Genre Section */}
          <section>
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter">Browse by Genre</h2>
                <p className="text-muted-foreground mt-2">Find Your Next Favorite by Mood</p>
            </div>
            <Tabs defaultValue="Action" className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList>
                  {topGenres.map(genre => (
                    <TabsTrigger key={genre} value={genre}>{genre}</TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {topGenres.map(genre => (
                <TabsContent key={genre} value={genre}>
                  <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
                      <CarouselContent>
                        {getMoviesByGenre(genre).map(movie => (
                          <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                            <MovieCard movie={movie} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                  </Carousel>
                </TabsContent>
              ))}
            </Tabs>
          </section>
          
           {/* Movies by Language Section */}
          <section>
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter">Movies by Language</h2>
                <p className="text-muted-foreground mt-2">Cinema from Every Corner of India</p>
            </div>
            <Tabs defaultValue="Tamil" className="w-full">
                <div className="flex justify-center mb-6">
                    <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
                        {topLanguages.map(lang => (
                            <TabsTrigger key={lang} value={lang}>{lang}</TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                {topLanguages.map(lang => (
                    <TabsContent key={lang} value={lang}>
                        <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
                            <CarouselContent>
                                {getMoviesByLanguage(lang).map(movie => (
                                    <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                                        <MovieCard movie={movie} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </TabsContent>
                ))}
            </Tabs>
          </section>

        </div>
      </main>
    </div>
  );
}
