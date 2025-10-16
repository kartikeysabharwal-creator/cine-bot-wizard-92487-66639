import { useState, useEffect } from "react";
import { Movie, parseMoviesCSV } from "@/lib/csvParser";
import { MovieCard } from "@/components/MovieCard";
import { MovieFilters } from "@/components/MovieFilters";
import { MovieChat } from "@/components/MovieChat";
import { Loader2, Film, MessageSquare, Grid3x3 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    filterAndSortMovies();
  }, [movies, searchTerm, selectedGenre, sortBy]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await parseMoviesCSV('/movies.csv');
      setMovies(data);
      toast.success(`Loaded ${data.length} movies!`);
    } catch (error) {
      toast.error("Failed to load movies");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortMovies = () => {
    let filtered = [...movies];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre !== "all") {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "year":
          return b.year - a.year;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
  };

  const genres = Array.from(new Set(movies.map(m => m.genre))).sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your cinema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              hsl(var(--primary)) 2px,
              hsl(var(--primary)) 4px
            )`,
          }} />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
              CineVault
            </h1>
          </div>
          <p className="text-center text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Your personal collection of cinematic masterpieces
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <div className="h-1 w-12 bg-primary rounded-full" />
            <div className="h-1 w-12 bg-secondary rounded-full" />
            <div className="h-1 w-12 bg-accent rounded-full" />
          </div>
        </div>
      </header>

      {/* Main Content with Tabs */}
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Grid3x3 className="w-4 h-4" />
              Browse Movies
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-0">
            <MovieFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              sortBy={sortBy}
              onSortChange={setSortBy}
              genres={genres}
            />

            {filteredMovies.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <Film className="w-16 h-16 text-muted-foreground mx-auto opacity-50" />
                <h3 className="text-2xl font-semibold text-foreground">No movies found</h3>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="mb-6 text-sm text-muted-foreground">
                  Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMovies.map((movie, index) => (
                    <div
                      key={`${movie.title}-${index}`}
                      className="animate-in fade-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <MovieChat />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Film className="w-4 h-4" />
            Powered by your love for cinema
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;