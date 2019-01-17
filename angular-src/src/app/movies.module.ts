import {NgModule} from '@angular/core';
import {MainComponent} from './main/main.component';
import {ViewMoviesComponent} from './view-movies/view-movies.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from './angular-material.module';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    MainComponent,
    ViewMoviesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AppRoutingModule
  ]
})
export class MoviesModule {
}
