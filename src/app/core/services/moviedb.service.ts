import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";

@Injectable()
export class MovieDbService {
  apiKey: string;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.apiKey = "c79f0a4b4f8b9c843e385c5cdb521ae1";
  }

  getListOfMovies(term: string) {
    const baseUrl = "https://api.themoviedb.org/3/search/movie";
    const query = `?&query=${term}&sort_by=popularity.desc&api_key=${
      this.apiKey
    }`;
    const url = `${baseUrl}${query}`;
    this.http.jsonp(url, "callback").subscribe(data => {
      console.log(data);
    });
  }
}
