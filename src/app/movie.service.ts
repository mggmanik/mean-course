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

  updateMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/${id}`, movie, httpOptions);
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl);
  }

  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.baseUrl}/${id}`, httpOptions);
  }
}
