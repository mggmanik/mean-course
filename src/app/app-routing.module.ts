import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewMoviesComponent} from './view-movies/view-movies.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: MainComponent},
  {path: 'view-movies', component: ViewMoviesComponent},
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
