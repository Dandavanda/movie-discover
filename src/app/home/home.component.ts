import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  sortControl = new FormControl('');
  dateForm: FormGroup;
  imgUrl = environment.image_url_original;
  imgRev =environment.image_url;
  dataAllMovies: any;
  sortData = [
    { value: 'popularity', item:'Popularity' },
    { value: 'release_date', item:'Release date' },
    { value: 'vote_count', item:'Vote Count' },
  ];
  defaultSorting = this.sortData[0].value;
  selectedSort = this.defaultSorting;
  sort = 'desc';
  allGendre: any;
  allUpcoming: any;
  
  constructor(
    private movieService: AppServiceService,
    private route: Router
  ) { 
    this.dateForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.sortControl.setValue(this.defaultSorting); 
    this.getAllGenre();
    this.getUpcoming();
  }

  getMovieList() {
    const startDate = this.dateForm.get('start')?.value ? this.dateForm.get('start')?.value.toISOString().substring(0, 10) : null;
    const endDate = this.dateForm.get('end')?.value ? this.dateForm.get('end')?.value.toISOString().substring(0, 10) : null;
    const sorting = this.sortControl.value+'.'+this.sort;
    this.subs.sink = this.movieService.getMovieList(sorting, startDate, endDate).subscribe((resp) => {
      if(resp) {
        this.dataAllMovies = resp.results;
        if(this.allGendre.length) {
          this.dataAllMovies.forEach((data:any, idx:any) => {
            if(data?.genre_ids?.length) {
              let dataGenre: any[] = [];
              this.allGendre.forEach((genre:any) => { 
                if(data.genre_ids.includes(genre.id)){
                  dataGenre.push(genre.name);
                }});
              this.dataAllMovies[idx].genre_names = dataGenre;
            }
          });
        }
      }
    })
  }

  getAllGenre() {
    this.subs.sink = this.movieService.getAllGenre().subscribe((resp) => {
      if(resp) {
        this.getMovieList();
        this.allGendre = resp.genres;
      }
    })
  }

  getUpcoming() {
    this.subs.sink = this.movieService.getUpcoming().subscribe((resp) => {
      if(resp) {
        this.getMovieList();
        this.allUpcoming = resp.results;
      }
    })
  }

  listMovieGenre(movie:any) {
    let listGenre:string[] = [];
    if(movie.length) {
      listGenre = this.allGendre.filter( (data: any) => movie.contains(data.id));
    }
    return listGenre;
  }

  goToDetail(id: string) {
    if(id) {
    // this.route.navigate('movie/', id)
    }
  }
  sortingData(data: any) {
    this.sort = this.sort === 'desc' ? 'asc' : 'desc';
    this.selectedSort = data.value;
    this.getMovieList();
  }

  filterMovie() {
    if(this.dateForm.valid) {
      this.getMovieList();
    }
  }

  resetBtn() {
    this.dateForm.get('start')?.patchValue(null, { emitEvent: false });
    this.dateForm.get('end')?.patchValue(null, { emitEvent: false });
    this.sortControl.setValue(this.defaultSorting); 
    this.getMovieList();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
