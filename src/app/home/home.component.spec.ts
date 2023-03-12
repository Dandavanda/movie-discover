import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppModule } from '../app.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AppModule
      ],
      providers: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle response from getMovieList', () => {
    const service = TestBed.get(HomeComponent);
    spyOn(service, 'getMovieList').and.returnValue(
      of([
        {
          id: '1241321',
        },
      ]),
    );
    component.getMovieList();
    expect(service.getMovieList).toHaveBeenCalled();
    expect(component.dataAllMovies).toBeDefined();
  });

  it('should unsubscribe when the component is destroyed', () => {
    spyOn(component.subs, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subs.unsubscribe).toHaveBeenCalled();
  });
});
