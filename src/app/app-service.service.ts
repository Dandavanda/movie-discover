import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  apiUrl = environment.api_url;
  apiKey = environment.api_key;

  constructor(private http:HttpClient) { }

  getMovieList(sorting: string, startDate?: string, lastDate?: string): Observable<any>{
    let linkApi = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=${sorting}`;
    
    if(startDate && lastDate) {
      const filterMovie = `&release_date.gte=${startDate}&release_date.lte=${lastDate}`
      linkApi = linkApi+filterMovie
    }
    return this.http.get(linkApi).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getOneMovie(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getUpcoming(): Observable<any>{
    return this.http.get(`${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=1`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllGenre(): Observable<any>{
    return this.http.get(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  addFavoriteMovie (newData: any) {
    let listData = [];
    let prevData = localStorage.getItem('favoriteMovie'); 
    prevData = prevData ? JSON.parse(prevData) : [];

    listData = prevData ? [...prevData,  newData] : [newData];
    localStorage.setItem('favoriteMovie', JSON.stringify(listData));
  }

  removeFavoriteMovie(id: string) {
    let dataMovie = localStorage.getItem('favoriteMovie'); 

    let listMovie = dataMovie ? JSON.parse(dataMovie) : [];
    if(id && listMovie?.length) {
      listMovie = listMovie.filter((data: any) => data.id !== parseInt(id));
      console.log('remove::',id, listMovie)
    }
    localStorage.setItem('favoriteMovie', JSON.stringify(listMovie));
  }

  removeAllFavorite() {
    localStorage.removeItem('favoriteMovie');
  }

  getFavoriteMovie(){
    let dataMovie = localStorage.getItem('favoriteMovie'); 
    return dataMovie ? JSON.parse(dataMovie) : [];
  }

  saveOrderFavorite(listId:string[]) {
    if(this.getCurrentOrder()) {
      localStorage.setItem('prevOrderFavorite', JSON.stringify(this.getCurrentOrder()))
    }
    localStorage.setItem('savedOrderFavorite', JSON.stringify(listId));
  }

  getCurrentOrder() {
    const data = localStorage.getItem('savedOrderFavorite');
    return data ? JSON.parse(data) : null;
  }

  getPrevOrder() {
    const data = localStorage.getItem('prevOrderFavorite');
    return data ? JSON.parse(data) : null;
  }
}
