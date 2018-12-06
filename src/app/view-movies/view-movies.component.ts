import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../movie.service';
import {Movie} from '../movie';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit {

  totalMovies;
  moviesPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 3, 5];

  movies: Movie[] = [];

  displayedColumns: string[] = ['id', 'movie_name', 'movie_genre', 'image', 'movie_edit', 'movie_delete'];

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.movieService.getMovies(this.moviesPerPage, this.currentPage).subscribe(movies => {
      this.movies = movies.movies;
      this.totalMovies = movies.maxMovies;
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
}
