import {Component, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';
import {Movie} from '../movie';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movie: Movie;

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
  }

  addMovie(movie_name: string, movie_genre: string) {
    console.log(movie_name + ' ' + movie_genre);
    this.movie = new Movie(movie_name, movie_genre);
    this.movieService.addMovie(this.movie).subscribe(() => console.log('Movie Added!'));
  }
}
