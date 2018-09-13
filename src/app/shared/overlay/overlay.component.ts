import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
// NGRX
import { AppState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { selectShowOverlay } from "../shared.selectors";

@Component({
  selector: "app-overlay",
  templateUrl: "./overlay.component.html",
  styleUrls: ["./overlay.component.css"]
})
export class OverlayComponent implements OnInit {
  $showOverlay: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.$showOverlay = this.store.pipe(select(selectShowOverlay));
  }
}
