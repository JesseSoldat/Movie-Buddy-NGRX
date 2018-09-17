import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { selectShowSpinner } from "../../shared.selectors";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.css"]
})
export class SpinnerComponent implements OnInit {
  showSpinner$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.showSpinner$ = this.store.pipe(select(selectShowSpinner));
  }
}
