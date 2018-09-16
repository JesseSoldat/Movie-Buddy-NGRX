import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
// NGRX
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
// Actions
import { GetMovieList, GetMovieDetails } from "../../movies/movie.actions";

import { MovieDetails } from "../../models/movie-details.model";

@Injectable()
export class MovieDbService {
  apiKey: string;
  baseUrl = "https://api.themoviedb.org/3/";

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.apiKey = "c79f0a4b4f8b9c843e385c5cdb521ae1";
  }

  getListOfMovies(term: string) {
    const query = `?&query=${term}&sort_by=popularity.desc&api_key=${
      this.apiKey
    }`;
    const url = `${this.baseUrl}search/movie${query}`;
    this.http
      .jsonp(url, "callback")
      .pipe(
        map((res: any) => res.results),
        tap(movieList => this.store.dispatch(new GetMovieList(movieList)))
      )
      .subscribe(() => {});
  }

  getMovieDetails(movieId: string) {
    const url = `${this.baseUrl}movie/${movieId}?api_key=${this.apiKey}`;
    this.http
      .jsonp(url, "callback")
      .pipe(
        tap((movieDetails: MovieDetails) =>
          this.store.dispatch(new GetMovieDetails({ movieDetails }))
        )
      )
      .subscribe(() => {});
  }
}
