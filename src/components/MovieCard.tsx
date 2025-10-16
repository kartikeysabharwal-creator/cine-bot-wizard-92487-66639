import { Movie } from "@/data/movies";
import { Card } from "@/components/ui/card";
import { Star, Calendar, Eye, TrendingUp } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer gradient-card shadow-card hover:shadow-glow hover-lift border-border/50 transition-all duration-300"
      onClick={() => onClick(movie)}
    >
      <div className="aspect-[2/3] bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10 group-hover:opacity-90 transition-opacity" />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 z-10 transition-all duration-500" />
        
        {/* Hover overlay with quick info */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="space-y-2 w-full">
            <div className="flex items-center gap-2 text-foreground/90">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Click to view details</span>
            </div>
          </div>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 z-20 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-secondary/40 flex items-center gap-1.5 group-hover:scale-110 transition-transform">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="text-sm font-bold text-secondary">{movie.rating}</span>
        </div>
        
        <img 
          src={movie.poster || `https://placehold.co/300x450/1a1a2e/9d4edd?text=${encodeURIComponent(movie.title)}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
      </div>
      <div className="p-5 space-y-3 bg-gradient-to-b from-card to-card/50">
        <h3 className="font-bold text-lg line-clamp-1 text-foreground group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{movie.year}</span>
          </div>
          <div className="flex items-center gap-1.5 text-accent">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium">Popular</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/40 font-medium group-hover:bg-primary/30 group-hover:border-primary/60 transition-all shadow-sm">
            {movie.genre}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
