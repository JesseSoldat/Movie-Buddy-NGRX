import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, first, catchError } from "rxjs/operators";
import { of } from "rxjs";
// NGRX
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
// Actions
import { MoviesLoaded, MovieDetailsLoaded } from "../../movies/movie.actions";
// Models
import { MovieDetails } from "../../models/movie-details.model";
// Utils
import {
  errMsg,
  showOverlay,
  hideOverlay
} from "../../utils/ui.action.dispatchers";

@Injectable()
export class MovieDbService {
  apiKey: string;
  baseUrl = "https://api.themoviedb.org/3/";
  fromMsg = "ShowMsgMS";
  fromOverlay = "ShowOverlayMS";
  movieDetailsLoadedMS = "MovieDetailsLoadedMS";

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
        tap(movieList =>
          this.store.dispatch(
            new MoviesLoaded({ movieList, from: "MoviesLoadedMS" })
          )
        )
      )
      .subscribe(() => {});
  }

  // movie details needs to return the observable because when saving to favorites
  // the component most get all of the detail and then call favorite service with
  // the entire movie
  getMovieDetails(movieId: number) {
    const url = `${this.baseUrl}movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.jsonp(url, "callback").pipe(
      tap(details => {
        // throw new Error();
      }),
      catchError(err => {
        errMsg(this.store, this.fromMsg);
        return of(null);
      }),
      first(),
      tap((movieDetails: MovieDetails) => {
        this.store.dispatch(
          new MovieDetailsLoaded({
            movieDetails,
            from: this.movieDetailsLoadedMS
          })
        );
      })
    );
  }
}
