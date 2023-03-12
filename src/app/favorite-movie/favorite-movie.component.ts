import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-favorite-movie',
  templateUrl: './favorite-movie.component.html',
  styleUrls: ['./favorite-movie.component.scss']
})
export class FavoriteMovieComponent implements OnInit {
  imgUrl = environment.image_url;
  movies:any[] = [];
  moviesBackup: any;
  restoreData: any;
  restoreBtn: boolean = false;

  constructor(
    private movieService: AppServiceService
  ) { }

  ngOnInit(): void {
    this.movies = this.movieService.getFavoriteMovie();
    this.moviesBackup = this.movies;
    this.restoreData = this.movieService.getPrevOrder();

    const orderFavorite = this.movieService.getCurrentOrder();
    if(orderFavorite && this.movies) {
      console.log('before::', this.movies)
      this.sortMovie(orderFavorite); 
      this.checkRestore();
      console.log('after::', this.movies)
    }
  }

  sortMovie(listId:any) {
    console.log('list ::', listId)
    let notListedMovie:string[] = [];
    let listedMovie:string[] = [];
    this.movies.forEach((data:any) => {
      const index = listId.findIndex((id: any) => data.id === id);
      if(this.movies[index]) {
        listedMovie.push(this.movies[index])
      } else {
        notListedMovie.push(data);
      }
    });
    this.movies = [...listedMovie, ...notListedMovie]
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('event::', event);
    console.log('afterdr drop::', this.movies);
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }


  saveOrderFavorite() {
    const arrayId: string[] = this.movies.map((data: any) => data.id);
    console.log('array id', arrayId);
    
    this.movieService.saveOrderFavorite(arrayId);
    this.restoreData = this.movieService.getPrevOrder();
    console.log('prev data after save', this.restoreData)
  }

  restoreOrderFavorite() {
    console.log('before click button restore', this.restoreData)
    this.sortMovie(this.restoreData);
    this.restoreData = this.movieService.getPrevOrder();
    this.movieService.saveOrderFavorite(this.restoreData);
    console.log('after click button restore', this.restoreData)
    this.checkRestore();
    
  }

  checkRestore() {
    const arrayId: string[] = this.movies.map((data: any) => data.id);
    this.restoreBtn = arrayId !== this.restoreData ? true : false;
  }
}
