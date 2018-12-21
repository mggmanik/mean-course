import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewMoviesComponent} from './view-movies/view-movies.component';
import {MainComponent} from './main/main.component';
import {AuthGuard} from './auth/auth-guard';

const routes: Routes = [
  {path: '', redirectTo: 'view-movie', pathMatch: 'full'},
  {path: 'view-movie', component: ViewMoviesComponent},
  {path: 'add-movie', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'edit/:movieId', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
