import {Component, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';
import {Movie} from '../movie';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movie: Movie;
  private mode = 'add';
  private movieId: string;

  constructor(private movieService: MovieService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('movieId')) {
        this.mode = 'edit';
        this.movieId = paramMap.get('movieId');
        this.movieService.getMovie(this.movieId).subscribe((movie) => this.movie = movie['movie']);
      } else {
        this.mode = 'add';
        this.movieId = null;
      }
    });
  }

  addMovie(movie_name: string, movie_genre: string) {
    this.movie = new Movie(movie_name, movie_genre);
    if (this.mode === 'add') {
      this.movieService.addMovie(this.movie).subscribe(() => console.log('Movie Added!'));
    } else {
      this.movieService.updateMovie(this.movieId, this.movie).subscribe(() => console.log('Movie Updated!'));
    }

  }
}
