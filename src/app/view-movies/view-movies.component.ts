import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../movie.service';
import {Movie} from '../movie';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit, OnDestroy {

  totalMovies;
  moviesPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 3, 5];

  movies: Movie[] = [];

  userIsAuthenticated = false;
  private authListenerStatus: Subscription;

  displayedColumns: string[] = ['id', 'movie_name', 'movie_genre', 'image', 'movie_edit', 'movie_delete'];
  unAuthenticatedColumns: string[] = ['id', 'movie_name', 'movie_genre', 'image'];

  constructor(private movieService: MovieService, private authService: AuthService) {
  }

  ngOnInit() {
    this.movieService.getMovies(this.moviesPerPage, this.currentPage).subscribe(movies => {
      this.movies = movies.movies;
      this.totalMovies = movies.maxMovies;
    });
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerStatus = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.moviesPerPage = pageData.pageSize;
    this.movieService.getMovies(this.moviesPerPage, this.currentPage).subscribe(movies => {
      this.movies = movies.movies;
    });
  }

  onDelete(id: string) {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.movies = this.movies.filter(movie => movie._id !== id);
      console.log('Movie Deleted!');
    });
  }

  ngOnDestroy(): void {
    this.authListenerStatus.unsubscribe();
  }
}
