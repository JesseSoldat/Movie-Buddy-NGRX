import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
// Models
import { Movie } from "../../../models/movie.model";
import { MovieDetails } from "../../../models/movie-details.model";
import { MovieKeys } from "../../../models/movie-keys.model";
import { IconBtn } from "../../../models/icon-btn.model";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  @Output()
  handleLeftBtnClick: EventEmitter<MovieKeys> = new EventEmitter();
  @Output()
  handleRightBtnClick: EventEmitter<MovieKeys> = new EventEmitter();
  @Input()
  data: Movie | MovieDetails;
  @Input()
  leftBtn: IconBtn;
  @Input()
  rightBtn: IconBtn;
  @Input()
  cardSize = "250px";

  keys: MovieKeys;

  ngOnInit() {
    this.keys = {
      key: this.data.key || "",
      id: Number(this.data.id)
    };
  }

  onLeftBtnClick() {
    this.handleLeftBtnClick.emit(this.keys);
  }

  onRightBtnClick() {
    this.handleRightBtnClick.emit(this.keys);
  }
}
