"use client";

import { useState } from 'react';
import { movies, genres, languages } from '@/lib/data';
import { MovieCard } from '@/components/movie-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function HomePage() {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [languageFilter, setLanguageFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');

  const handleFilterChange = (language: string, genre: string) => {
    setLanguageFilter(language);
    setGenreFilter(genre);
    let tempMovies = movies;

    if (language !== 'all') {
      tempMovies = tempMovies.filter(movie => movie.language === language);
    }
    if (genre !== 'all') {
      tempMovies = tempMovies.filter(movie => movie.genre.includes(genre));
    }
    setFilteredMovies(tempMovies);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Now Showing</h1>
        <div className="flex gap-4">
          <Select value={languageFilter} onValueChange={(val) => handleFilterChange(val, genreFilter)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={genreFilter} onValueChange={(val) => handleFilterChange(languageFilter, val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map(genre => <SelectItem key={genre} value={genre}>{genre}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">No Movies Found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
