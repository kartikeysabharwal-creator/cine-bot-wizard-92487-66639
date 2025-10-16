export interface Movie {
  title: string;
  year: number;
  genre: string;
  rating: number;
  director: string;
  poster: string;
  description: string;
}

export async function parseMoviesCSV(csvPath: string): Promise<Movie[]> {
  try {
    const response = await fetch(csvPath);
    const text = await response.text();
    
    const lines = text.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',');
    
    const movies: Movie[] = lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        title: values[0],
        year: parseInt(values[1]),
        genre: values[2],
        rating: parseFloat(values[3]),
        director: values[4],
        poster: values[5],
        description: values[6] || ''
      };
    });
    
    return movies;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
}