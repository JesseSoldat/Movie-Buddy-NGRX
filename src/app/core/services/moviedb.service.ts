import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, first, catchError } from "rxjs/operators";
import { of } from "rxjs";
// NGRX
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
// Actions
import { MoviesLoaded, MovieDetailsLoaded } from "../../movies/movie.actions";
import { ShowMsg, ShowOverlay } from "../../shared/shared.actions";
// Models
import { MovieDetails } from "../../models/movie-details.model";

@Injectable()
export class MovieDbService {
  errMsg = "An error ocurred while fetching the data.";
  apiKey: string;
  baseUrl = "https://api.themoviedb.org/3/";

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.apiKey = "c79f0a4b4f8b9c843e385c5cdb521ae1";
  }

  handleSuccess() {
    this.store.dispatch(
      new ShowOverlay({ showOverlay: false, from: "ShowOverlayMS" })
    );
  }

  handleError(msg = this.errMsg) {
    this.store.dispatch(
      new ShowMsg({
        msg: {
          title: "Error",
          msg,
          color: "red"
        },
        from: ""
      })
    );
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

  getMovieDetails(movieId: number, showSuccess = true) {
    const url = `${this.baseUrl}movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.jsonp(url, "callback").pipe(
      tap(details => {
        // throw new Error();
      }),
      catchError(err => {
        this.handleError();
        return of(null);
      }),
      first(),
      tap((movieDetails: MovieDetails) => {
        this.store.dispatch(new MovieDetailsLoaded({ movieDetails }));

        // when getting the details to save to to Favorites we do not
        // want to stop the overlay yet. so showSuccess value will be passed
        // as false
        if (showSuccess) {
          console.log("showing overlay");
          this.handleSuccess();
        }
      })
    );
  }
}
