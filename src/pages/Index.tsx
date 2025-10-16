import { useState, useEffect } from "react";
import { Movie } from "@/data/movies";
import MovieGrid from "@/components/MovieGrid";
import MovieDetails from "@/components/MovieDetails";
import ChatBot from "@/components/ChatBot";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Film, Sparkles, Loader2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Papa from "papaparse";

// Import all posters
import inceptionPoster from "@/assets/posters/inception.jpg";
import darkKnightPoster from "@/assets/posters/dark-knight.jpg";
import matrixPoster from "@/assets/posters/matrix.jpg";
import interstellarPoster from "@/assets/posters/interstellar.jpg";
import parasitePoster from "@/assets/posters/parasite.jpg";
import spiritedAwayPoster from "@/assets/posters/spirited-away.jpg";
import shawshankPoster from "@/assets/posters/shawshank-redemption.jpg";
import pulpFictionPoster from "@/assets/posters/pulp-fiction.jpg";
import forrestGumpPoster from "@/assets/posters/forrest-gump.jpg";
import godfatherPoster from "@/assets/posters/godfather.jpg";
import gladiatorPoster from "@/assets/posters/gladiator.jpg";
import whiplashPoster from "@/assets/posters/whiplash.jpg";
import fightClubPoster from "@/assets/posters/fight-club.jpg";
import lotrPoster from "@/assets/posters/lotr-fellowship.jpg";
import empireStrikesPoster from "@/assets/posters/empire-strikes-back.jpg";
import schindlersPoster from "@/assets/posters/schindlers-list.jpg";
import silenceLambsPoster from "@/assets/posters/silence-of-lambs.jpg";
import goodfellasPoster from "@/assets/posters/goodfellas.jpg";
import prestigePoster from "@/assets/posters/prestige.jpg";
import greenMilePoster from "@/assets/posters/green-mile.jpg";
import savingRyanPoster from "@/assets/posters/saving-private-ryan.jpg";
import jurassicParkPoster from "@/assets/posters/jurassic-park.jpg";
import avatarPoster from "@/assets/posters/avatar.jpg";
import titanicPoster from "@/assets/posters/titanic.jpg";
import lionKingPoster from "@/assets/posters/lion-king.jpg";
import toyStoryPoster from "@/assets/posters/toy-story.jpg";
import backFuturePoster from "@/assets/posters/back-to-future.jpg";
import bladeRunner2049Poster from "@/assets/posters/blade-runner-2049.jpg";
import madMaxPoster from "@/assets/posters/mad-max-fury-road.jpg";
import eternalSunshinePoster from "@/assets/posters/eternal-sunshine.jpg";
import noCountryPoster from "@/assets/posters/no-country.jpg";
import djangoPoster from "@/assets/posters/django-unchained.jpg";
import herPoster from "@/assets/posters/her.jpg";
import angryMenPoster from "@/assets/posters/12-angry-men.jpg";
import thereBloodPoster from "@/assets/posters/there-will-be-blood.jpg";
import casinoRoyalePoster from "@/assets/posters/casino-royale.jpg";

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const posterMap: Record<string, string> = {
    "inception.jpg": inceptionPoster,
    "dark-knight.jpg": darkKnightPoster,
    "matrix.jpg": matrixPoster,
    "interstellar.jpg": interstellarPoster,
    "parasite.jpg": parasitePoster,
    "spirited-away.jpg": spiritedAwayPoster,
    "shawshank-redemption.jpg": shawshankPoster,
    "pulp-fiction.jpg": pulpFictionPoster,
    "forrest-gump.jpg": forrestGumpPoster,
    "godfather.jpg": godfatherPoster,
    "gladiator.jpg": gladiatorPoster,
    "whiplash.jpg": whiplashPoster,
    "fight-club.jpg": fightClubPoster,
    "lotr-fellowship.jpg": lotrPoster,
    "empire-strikes-back.jpg": empireStrikesPoster,
    "schindlers-list.jpg": schindlersPoster,
    "silence-of-lambs.jpg": silenceLambsPoster,
    "goodfellas.jpg": goodfellasPoster,
    "prestige.jpg": prestigePoster,
    "green-mile.jpg": greenMilePoster,
    "saving-private-ryan.jpg": savingRyanPoster,
    "jurassic-park.jpg": jurassicParkPoster,
    "avatar.jpg": avatarPoster,
    "titanic.jpg": titanicPoster,
    "lion-king.jpg": lionKingPoster,
    "toy-story.jpg": toyStoryPoster,
    "back-to-future.jpg": backFuturePoster,
    "blade-runner-2049.jpg": bladeRunner2049Poster,
    "mad-max-fury-road.jpg": madMaxPoster,
    "eternal-sunshine.jpg": eternalSunshinePoster,
    "no-country.jpg": noCountryPoster,
    "django-unchained.jpg": djangoPoster,
    "her.jpg": herPoster,
    "12-angry-men.jpg": angryMenPoster,
    "there-will-be-blood.jpg": thereBloodPoster,
    "casino-royale.jpg": casinoRoyalePoster,
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/movies.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedMovies = results.data.map((row: any) => ({
              id: parseInt(row.id),
              title: row.title,
              genre: row.genre,
              year: parseInt(row.year),
              rating: parseFloat(row.rating),
              director: row.director,
              description: row.description,
              poster: row.poster ? posterMap[row.poster] : undefined,
            }));
            setMovies(parsedMovies);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const genres = ["all", ...Array.from(new Set(movies.map(m => m.genre)))];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.director.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "all" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              <Film className="w-16 h-16 text-secondary" />
              <Sparkles className="w-10 h-10 text-accent animate-pulse" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold gradient-hero bg-clip-text text-transparent leading-tight">
              CineMatch AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
              Discover Your Next Cinematic Adventure with AI-Powered Recommendations
            </p>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-primary/80">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 text-secondary/80">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-sm font-medium">Personalized</span>
              </div>
              <div className="flex items-center gap-2 text-accent/80">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-medium">Real-Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-12 animate-slide-up">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search movies, directors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border/50 focus:border-primary transition-all text-base"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {genres.map((genre, index) => (
              <Button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                variant={selectedGenre === genre ? "default" : "outline"}
                className={`whitespace-nowrap transition-all duration-300 ${
                  selectedGenre === genre 
                    ? "gradient-hero shadow-glow scale-105" 
                    : "hover:scale-105 hover:border-primary/50"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {genre === "all" ? "All Genres" : genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Movies Count */}
        <div className="mb-8 text-center md:text-left">
          <p className="text-muted-foreground text-lg">
            <span className="text-primary font-semibold">{filteredMovies.length}</span> 
            {" "}movies found
          </p>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : (
          <>
            <div className="animate-fade-in">
              <MovieGrid movies={filteredMovies} onMovieClick={setSelectedMovie} />
            </div>

            {filteredMovies.length === 0 && (
              <div className="text-center py-24 animate-fade-in">
                <Film className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-xl mb-2">No movies found</p>
                <p className="text-muted-foreground/60">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Movie Details Modal */}
      <MovieDetails
        movie={selectedMovie}
        open={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
