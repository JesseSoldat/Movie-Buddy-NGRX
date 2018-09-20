import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// Rxjs
import { first, map, switchMap } from "rxjs/operators";
import { of, empty } from "rxjs";
// NGRX
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { MatchesService } from "../../core/services/matches.service";
import { selectNonMatchedUserMovies } from "../matches.selector";

@Component({
  selector: "app-matched-user-favorite-details",
  templateUrl: "./matched-user-favorite-details.component.html",
  styleUrls: ["./matched-user-favorite-details.component.css"]
})
export class MatchedUserFavoriteDetailsComponent implements OnInit {
  matches;

  constructor(
    private store: Store<AppState>,
    private matchesService: MatchesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(params => {
      const userId = params.userId;
      const movieId = params.movieId;
    });

    // this.store
    //   .pipe(
    //     select(selectNonMatchedUserMovies),
    //     first()
    //   )
    //   .subscribe(matches => {
    //     this.matches = matches;
    //     console.log(matches);
    //   });
  }
}

// initialize() {
//   this.appParameters
//     .map(params => params['id'])
//     .switchMap(id => {
//       if(id !== null && id !== undefined) {
//         return this.getUser(id)
//       }
//     })
//     .subscribe(user => this.user = user);
// }

// this.route.params.pipe(
//   map((params: any) => ({userId: params.userId, movieId: params.movieId}),
//   switchMap((ids: any) => {
//     console.log(ids);

//     if(ids.movieId) {
//       return of['hello']
//     } else {
//       return empty()
//     }
//   })
//   )
