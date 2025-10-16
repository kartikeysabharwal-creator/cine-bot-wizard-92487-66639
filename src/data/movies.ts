import inceptionPoster from "@/assets/posters/inception.jpg";
import darkKnightPoster from "@/assets/posters/dark-knight.jpg";
import matrixPoster from "@/assets/posters/matrix.jpg";
import interstellarPoster from "@/assets/posters/interstellar.jpg";
import parasitePoster from "@/assets/posters/parasite.jpg";
import spiritedAwayPoster from "@/assets/posters/spirited-away.jpg";

export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  director: string;
  description: string;
  poster?: string;
}

export const moviesData: Movie[] = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
    director: "Christopher Nolan",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    poster: inceptionPoster,
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    rating: 9.3,
    director: "Frank Darabont",
    description: "Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    director: "Christopher Nolan",
    description: "When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest tests.",
    poster: darkKnightPoster,
  },
  {
    id: 4,
    title: "Pulp Fiction",
    genre: "Crime",
    year: 1994,
    rating: 8.9,
    director: "Quentin Tarantino",
    description: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence.",
  },
  {
    id: 5,
    title: "Forrest Gump",
    genre: "Drama",
    year: 1994,
    rating: 8.8,
    director: "Robert Zemeckis",
    description: "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.",
  },
  {
    id: 6,
    title: "The Matrix",
    genre: "Sci-Fi",
    year: 1999,
    rating: 8.7,
    director: "Wachowski Brothers",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
    poster: matrixPoster,
  },
  {
    id: 7,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.6,
    director: "Christopher Nolan",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: interstellarPoster,
  },
  {
    id: 8,
    title: "Parasite",
    genre: "Thriller",
    year: 2019,
    rating: 8.6,
    director: "Bong Joon Ho",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between two families.",
    poster: parasitePoster,
  },
  {
    id: 9,
    title: "The Godfather",
    genre: "Crime",
    year: 1972,
    rating: 9.2,
    director: "Francis Ford Coppola",
    description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
  },
  {
    id: 10,
    title: "Gladiator",
    genre: "Action",
    year: 2000,
    rating: 8.5,
    director: "Ridley Scott",
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
  },
  {
    id: 11,
    title: "Spirited Away",
    genre: "Animation",
    year: 2001,
    rating: 8.6,
    director: "Hayao Miyazaki",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods and witches.",
    poster: spiritedAwayPoster,
  },
  {
    id: 12,
    title: "Whiplash",
    genre: "Drama",
    year: 2014,
    rating: 8.5,
    director: "Damien Chazelle",
    description: "A promising young drummer enrolls at a music conservatory where he's mentored by a tyrannical instructor.",
  }
];
