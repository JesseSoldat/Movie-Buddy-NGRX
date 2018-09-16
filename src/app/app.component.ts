import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { selectUsername } from "./auth/auth.selectors";
import { AppState } from "./reducers";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectUsername))
      .subscribe(username => console.log(username));
    // this.router.events.subscribe(event => {
    //   console.log(event);
    // });
  }
}
