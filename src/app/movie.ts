export class Movie {

  _id: string;
  movie_name: string;
  movie_genre: string;


  constructor(movie_name: string, movie_genre: string) {
    this.movie_name = movie_name;
    this.movie_genre = movie_genre;
  }
}
