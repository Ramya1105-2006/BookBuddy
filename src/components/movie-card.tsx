import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-accent/20">
        <CardContent className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={movie.posterHint}
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">{movie.title}</h3>
            <p className="text-sm text-muted-foreground">{movie.genre.join(', ')}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
