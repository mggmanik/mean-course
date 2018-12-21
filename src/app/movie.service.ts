import {Injectable} from '@angular/core';
import {Movie} from './movie';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

const BACKEND_URL = environment.apiUrl + '/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  addMovie(movie: Movie, image: File): Observable<Movie> {
    const movieData = new FormData();
    movieData.append('movie_name', movie.movie_name);
    movieData.append('movie_genre', movie.movie_genre);
    movieData.append('image', image, movie.movie_name);
    return this.http.post<Movie>(BACKEND_URL, movieData);
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
    return this.http.put<Movie>(`${BACKEND_URL}/${id}`, updatedMovieData);
  }

  getMovie(id: string): Observable<{ movie: Movie }> {
    return this.http.get<{ movie: Movie }>(`${BACKEND_URL}/${id}`);
  }

  getMovies(moviesPerPage: number, currentPage: number): Observable<{ movies: Movie[], maxMovies: number }> {
    const queryParams = `?pagesize=${moviesPerPage}&page=${currentPage}`;
    return this.http.get<{ movies: Movie[], maxMovies: number }>(BACKEND_URL + queryParams);
  }

  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${BACKEND_URL}/${id}`, httpOptions);
  }
}
