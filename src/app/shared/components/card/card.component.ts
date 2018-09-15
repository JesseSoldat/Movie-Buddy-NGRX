import { Component, Input, OnInit } from "@angular/core";

import { Movie } from "../../../models/movie.model";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
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
