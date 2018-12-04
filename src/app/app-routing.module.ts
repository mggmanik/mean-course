import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewMoviesComponent} from './view-movies/view-movies.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: MainComponent},
  {path: 'view-movies', component: ViewMoviesComponent},
  {path: 'edit/:movieId', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
