import {Injectable} from '@angular/core';
import {Movie} from './movie';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl = 'http://localhost:3000/api/movie';

  constructor(private http: HttpClient) {
  }

  addMovie(movie: Movie, image: File): Observable<Movie> {
    const movieData = new FormData();
    movieData.append('movie_name', movie.movie_name);
    movieData.append('movie_genre', movie.movie_genre);
    movieData.append('image', image, movie.movie_name);
    return this.http.post<Movie>(this.baseUrl, movieData);
  }

  updateMovie(id: string, movie: Movie, image: File | string): Observable<Movie> {
    let updatedMovieData: Movie | FormData;
    if (typeof image === 'object') {
      updatedMovieData = new FormData();
      updatedMovieData.append('movie_name', movie.movie_name);
      updatedMovieData.append('movie_genre', movie.movie_genre);
      updatedMovieData.append('image', image, movie.movie_name);
    } else {
      updatedMovieData = movie;
    }
    return this.http.put<Movie>(`${this.baseUrl}/${id}`, updatedMovieData);
  }

  getMovie(id: string): Observable<{ movie: Movie }> {
    return this.http.get<{ movie: Movie }>(`${this.baseUrl}/${id}`);
  }

  getMovies(moviesPerPage: number, currentPage: number): Observable<{ movies: Movie[], maxMovies: number }> {
    const queryParams = `?pagesize=${moviesPerPage}&page=${currentPage}`;
    return this.http.get<{ movies: Movie[], maxMovies: number }>(this.baseUrl + queryParams);
  }

  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.baseUrl}/${id}`, httpOptions);
  }
}
