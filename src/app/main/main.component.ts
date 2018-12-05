import {Component, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';
import {Movie} from '../movie';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {mimeType} from './mime-type.validator';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movie: Movie;
  private mode = 'add';
  private movieId: string;
  imagePreview: string | ArrayBuffer;
  form: FormGroup;

  constructor(private movieService: MovieService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'movie_name': new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
      'movie_genre': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null,
        {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('movieId')) {
        this.mode = 'edit';
        this.movieId = paramMap.get('movieId');
        this.movieService.getMovie(this.movieId).subscribe((movie) => {
          this.movie = movie['movie'];
          this.form.setValue({
            'movie_name': this.movie.movie_name,
            'movie_genre': this.movie.movie_genre
          });
        });
      } else {
        this.mode = 'add';
        this.movieId = null;
      }
    });
  }

  addMovie() {
    if (this.form.invalid) {
      return;
    }
    this.movie = new Movie(this.form.value.movie_name, this.form.value.movie_genre);
    if (this.mode === 'add') {
      this.movieService.addMovie(this.movie, this.form.value.image).subscribe(() => console.log('Movie Added!'));
    } else {
      this.movieService.updateMovie(this.movieId, this.movie).subscribe(() => console.log('Movie Updated!'));
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
