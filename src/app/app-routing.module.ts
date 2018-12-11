import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewMoviesComponent} from './view-movies/view-movies.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: 'view-movie', pathMatch: 'full'},
  {path: 'view-movie', component: ViewMoviesComponent},
  {path: 'add-movie', component: MainComponent},
  {path: 'edit/:movieId', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
