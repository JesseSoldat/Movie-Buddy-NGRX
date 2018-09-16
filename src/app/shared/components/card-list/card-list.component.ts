import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../../../reducers";
import { Movie } from "../../../models/movie.model";
import { selectMovieList } from "../../../movies/movies.selector";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.css"]
})
export class CardListComponent implements OnInit {
  @Input()
  flexType = "justify-content-around";
  @Input()
  listType: "basicCard";

  movieList$: Observable<Movie[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.movieList$ = this.store.pipe(select(selectMovieList));
  }
}
