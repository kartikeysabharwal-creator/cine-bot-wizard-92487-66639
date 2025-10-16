import { Movie } from "@/data/movies";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Calendar, User, Film, Award, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MovieDetailsProps {
  movie: Movie | null;
  open: boolean;
  onClose: () => void;
}

const MovieDetails = ({ movie, open, onClose }: MovieDetailsProps) => {
  if (!movie) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl glass-effect border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold gradient-hero bg-clip-text text-transparent mb-2">
            {movie.title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-glow border border-border/50 relative group">
              <img 
                src={movie.poster || `https://placehold.co/400x600/1a1a2e/9d4edd?text=${encodeURIComponent(movie.title)}`}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="space-y-6">
            {/* Rating Section */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-3 px-4 py-3 bg-secondary/20 rounded-xl border border-secondary/40">
                <Star className="w-6 h-6 fill-secondary text-secondary" />
                <div>
                  <div className="text-3xl font-bold text-secondary">{movie.rating}</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-accent/20 rounded-xl border border-accent/40">
                <Award className="w-6 h-6 text-accent" />
                <div>
                  <div className="text-xl font-bold text-accent">Top Rated</div>
                  <div className="text-xs text-muted-foreground">Popular</div>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-border/50">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Release Year</div>
                  <div className="font-semibold text-foreground">{movie.year}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-border/50">
                <Film className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Genre</div>
                  <div className="font-semibold text-foreground">{movie.genre}</div>
                </div>
              </div>
            </div>

            {/* Director */}
            <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-border/50">
              <User className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">Director</div>
                <div className="font-semibold text-foreground">{movie.director}</div>
              </div>
            </div>

            {/* Genre Badge */}
            <div className="flex items-center gap-2">
              <Badge className="px-4 py-2 text-sm bg-primary/20 text-primary border-primary/40 hover:bg-primary/30">
                <Film className="w-4 h-4 mr-2" />
                {movie.genre}
              </Badge>
              <Badge className="px-4 py-2 text-sm bg-accent/20 text-accent border-accent/40 hover:bg-accent/30">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </Badge>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Synopsis
              </h3>
              <p className="text-foreground/80 leading-relaxed text-sm">{movie.description}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetails;
