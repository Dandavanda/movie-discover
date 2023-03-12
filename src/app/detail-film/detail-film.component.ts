import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { AppServiceService } from '../app-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.scss']
})
export class DetailFilmComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  movieId: string = '';
  dataMovie: any;
  imgUrlOriginal = environment.image_url_original;
  imgUrl = environment.image_url;
  backdropImg: any;
  isFavorite: Boolean = false;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private movieService: AppServiceService,
  ) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe((param) => {
      const paramId  = param.get('id') ? param.get('id') : '';
      this.movieId = paramId ? paramId : '';
      if(paramId) {
        this.getMovieList(paramId);
      this.checkIsFavorite(paramId);
      }
    });
  }

  getMovieList(id: string) {  
    this.subs.sink = this.movieService.getOneMovie(id).subscribe((resp) => {
      if(resp) {
        console.log('data movie', resp);
        this.dataMovie = resp;
        this.backdropImg = resp.backdrop_path ? resp.backdrop_path : '';
      }
    })
  }

  checkIsFavorite(id: string) {
    console.log('test pertama', id)
     const movie =  _.cloneDeep(id);
    let dataMovie = this.movieService.getFavoriteMovie() ? this.movieService.getFavoriteMovie() : [];
    

    if (dataMovie?.length && id) {
      const listId = dataMovie.map((data: any) => data.id)
      console.log('listId :::',listId); 

      // const searchMovie = listId.includes(parseInt(id));
      // console.log('searchMovie::', searchMovie)
      
      this.isFavorite = listId.includes(parseInt(id));
      console.log('is favo', this.isFavorite)
    }
  }

  setFavorite() {
    // this.checkIsFavorite();
    const currentTime = new Date();
    if(this.isFavorite) {
      console.log('isFavorite')
      this.movieService.removeFavoriteMovie(this.movieId);
      this.isFavorite = false;
    } else {
      console.log(' not Favorite')
      this.isFavorite = true;
      this.dataMovie.updated_time = currentTime;
      console.log('datamovie::', this.dataMovie);
      this.movieService.addFavoriteMovie(this.dataMovie) 
    }
    console.log('favorite::', this.isFavorite);
  }

  toHoursAndMinutes(totalMinutes: any) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours} Hour${minutes > 0 ? ` ${minutes} Minute` : ''}`;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
