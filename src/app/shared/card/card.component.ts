import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  @Input()
  cardSize = "250px";
  // @Output()
  // btnClicked: EventEmitter<null>;

  constructor() {}

  ngOnInit() {}

  // onBtnClicked() {
  //   this.btnClicked.emit();
  // }
}
