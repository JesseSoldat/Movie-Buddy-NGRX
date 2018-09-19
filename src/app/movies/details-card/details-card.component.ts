import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
// Models
import { MovieDetails } from "../../models/movie-details.model";
import { IconBtn } from "../../models/icon-btn.model";

@Component({
  selector: "app-details-card",
  templateUrl: "./details-card.component.html",
  styleUrls: ["./details-card.component.css"]
})
export class DetailsCardComponent implements OnInit {
  @Output()
  handleLeftBtnClick: EventEmitter<any> = new EventEmitter();
  @Output()
  handleRightBtnClick: EventEmitter<any> = new EventEmitter();

  @Input()
  leftBtn: IconBtn;
  @Input()
  rightBtn: IconBtn;

  @Input("movieDetails")
  movie: MovieDetails;
  showGenreMsg: boolean;

  ngOnInit() {
    this.showGenreMsg = typeof this.movie.genres === "string" ? true : false;
  }

  onLeftBtnClick() {
    this.handleLeftBtnClick.emit();
  }

  onRightBtnClick() {
    this.handleRightBtnClick.emit(this.movie);
  }
}
