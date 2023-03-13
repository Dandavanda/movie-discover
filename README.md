# DiscoverMovie
A responsive movies web app built with Angular 13 with The Movie DB API.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

### Feature 
- Homepage
  - Filter based on release date.
  - Sorting movie by Popularity, Release Date, and Vote Count.

- Detail
  - Get detail information about the movie.
  - Add a movie as your favorite by clicking the love button.

- Your Collection
  - Get information about your favorite movie.
  - Update the Order of your favorite movie by click and drag the card. 
  - Functionality to save the newest order.
  - Restore data to previous order.

### Overview
![Homepage](https://github.com/Dandavanda/movie-discover/blob/main/src/assets/img-overview/homepage.png)
![Homepage-tablet](https://github.com/Dandavanda/movie-discover/blob/main/src/assets/img-overview/homepage-tablet.png)
![Detail](https://github.com/Dandavanda/movie-discover/blob/main/src/assets/img-overview/detail.png)
![Your Collections](https://github.com/Dandavanda/movie-discover/blob/main/src/assets/img-overview/yourcollections.png)

## Getting started
Make sure you have the Angular CLI installed globally. It use NPM to manage the dependencies, so we strongly recommend you to use it. you can install it from Here, then run `npm install` to resolve all dependencies (might take a minute).
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

```bash
git clone https://github.com/Dandavanda/movie-discover.git
cd movie-discover
npm install
ng serve
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
