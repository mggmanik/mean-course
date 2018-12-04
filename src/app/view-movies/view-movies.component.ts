import {Component, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';
import {Movie} from '../movie';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit {

  movies: Movie[] = [];

  displayedColumns: string[] = ['id', 'movie_name', 'movie_genre', 'movie_edit', 'movie_delete'];

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe(movies =>
      this.movies = movies['movies']);
  }

  onDelete(id: string) {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.movies = this.movies.filter(movie => movie._id !== id);
      console.log('Movie Deleted!');
    });
  }
}
