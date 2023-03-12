import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailFilmComponent } from './detail-film/detail-film.component';
import { FavoriteMovieComponent } from './favorite-movie/favorite-movie.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent },  
  { path: 'movie/:id', component: DetailFilmComponent},
  { path: 'my-favorite', component: FavoriteMovieComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
