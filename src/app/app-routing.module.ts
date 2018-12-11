import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewMoviesComponent} from './view-movies/view-movies.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth-guard';

const routes: Routes = [
  {path: '', redirectTo: 'view-movie', pathMatch: 'full'},
  {path: 'view-movie', component: ViewMoviesComponent},
  {path: 'add-movie', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'edit/:movieId', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
