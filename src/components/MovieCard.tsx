import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Movie } from "@/lib/csvParser";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 hover:border-primary/50">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {movie.description}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="font-semibold">
            {movie.genre}
          </Badge>
          <span className="text-sm text-muted-foreground">{movie.year}</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-secondary text-secondary" />
            <span className="font-bold text-secondary">{movie.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground line-clamp-1">
            {movie.director}
          </span>
        </div>
      </div>
    </Card>
  );
};