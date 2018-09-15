import { Component, Input, OnInit } from "@angular/core";

import { Movie } from "../../../models/movie.model";

@Component({
  selector: "app-img-card",
  templateUrl: "./img-card.component.html",
  styleUrls: ["./img-card.component.css"]
})
export class ImgCardComponent implements OnInit {
  @Input()
  movie: Movie;
  @Input()
  cardSize = "250px";

  constructor() {}

  ngOnInit() {}

  onCardBtnClicked() {
    console.log("card");
  }
}
