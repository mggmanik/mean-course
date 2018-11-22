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

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.baseUrl, movie, httpOptions);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl);
  }

  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.baseUrl}/${id}`, httpOptions);
  }
}
