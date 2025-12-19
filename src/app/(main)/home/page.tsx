"use client";

import { useState } from 'react';
import { movies, genres, languages } from '@/lib/data';
import { MovieCard } from '@/components/movie-card';
import { HeroCarousel } from '@/components/hero-carousel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
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
  const [activeTab, setActiveTab] = useState('kollywood');

  const featuredMovies = movies.slice(0, 5);
  const trendingMovies = movies.filter(m => m.rating > 8.5);

  const getMoviesByGenre = (genre: string) => movies.filter(m => m.genre.includes(genre));
  const getMoviesByLanguage = (language: string) => movies.filter(m => m.language === language);
  
  const top10Hollywood = movies.filter(m => m.language === 'English').slice(0, 10);
  const top10Kollywood = movies.filter(m => m.language === 'Tamil').slice(0, 10);
  const top10Bollywood = movies.filter(m => m.language === 'Hindi').slice(0, 10);
  const topAction = movies.filter(m => m.genre.includes('Action')).slice(0, 10);
  const topRomance = movies.filter(m => m.genre.includes('Romance')).slice(0, 10);
  const topThriller = movies.filter(m => m.genre.includes('Thriller')).slice(0, 10);
  const topSciFi = movies.filter(m => m.genre.includes('Sci-Fi')).slice(0, 10);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroCarousel movies={featuredMovies} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Top 10 Movies Section */}
          <section>
            <h2 className="text-3xl font-bold tracking-tighter mb-6">Top 10 Movies</h2>
             <Tabs defaultValue="kollywood" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-6">
                <TabsTrigger value="kollywood">Kollywood</TabsTrigger>
                <TabsTrigger value="bollywood">Bollywood</TabsTrigger>
                <TabsTrigger value="hollywood">Hollywood</TabsTrigger>
                <TabsTrigger value="action">Action</TabsTrigger>
                <TabsTrigger value="romance">Romance</TabsTrigger>
                <TabsTrigger value="thriller">Thriller</TabsTrigger>
                <TabsTrigger value="sci-fi">Sci-Fi</TabsTrigger>
              </TabsList>
              <TabsContent value="kollywood">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {top10Kollywood.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
              </TabsContent>
              <TabsContent value="bollywood">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {top10Bollywood.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
              </TabsContent>
              <TabsContent value="hollywood">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {top10Hollywood.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
              </TabsContent>
               <TabsContent value="action">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {topAction.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
              </TabsContent>
              <TabsContent value="romance">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {topRomance.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
              </TabsContent>
              <TabsContent value="thriller">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {topThriller.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
              </TabsContent>
              <TabsContent value="sci-fi">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {topSciFi.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Trending Now Section */}
           <section>
            <h2 className="text-3xl font-bold tracking-tighter mb-6">Trending Now</h2>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {trendingMovies.map((movie) => (
                  <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                     <MovieCard movie={movie} trending />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-12" />
              <CarouselNext className="mr-12" />
            </Carousel>
          </section>

          {/* Browse by Genre Section */}
          <section className="space-y-8">
             <h2 className="text-3xl font-bold tracking-tighter">Browse by Genre</h2>
            {topGenres.map(genre => (
              <div key={genre}>
                <h3 className="text-2xl font-semibold tracking-tight mb-4">{genre}</h3>
                 <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
                    <CarouselContent className="-ml-4">
                      {getMoviesByGenre(genre).map(movie => (
                        <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                          <MovieCard movie={movie} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                 </Carousel>
              </div>
            ))}
          </section>
          
           {/* Movies by Language Section */}
          <section>
            <h2 className="text-3xl font-bold tracking-tighter mb-6">Movies by Language</h2>
            <div className="grid grid-cols-1 gap-8">
                {topLanguages.map(lang => (
                     <div key={lang}>
                        <h3 className="text-2xl font-semibold tracking-tight mb-4">{lang}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {getMoviesByLanguage(lang).slice(0, 5).map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                     </div>
                ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
