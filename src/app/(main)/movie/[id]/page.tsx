import { movies } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clock, Film, Languages, Star, Ticket } from 'lucide-react';

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const movie = movies.find(m => m.id === params.id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              data-ai-hint={movie.posterHint}
              priority
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter mb-2">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{movie.duration} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              <span>{movie.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{movie.rating} / 10</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {movie.genre.map(g => <Badge key={g} variant="secondary">{g}</Badge>)}
          </div>
          
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">{movie.description}</p>
          
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold shadow-lg shadow-accent/20">
            <Link href={`/book/${movie.id}`}>
              <Ticket className="mr-2 h-6 w-6" />
              Book Tickets
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
