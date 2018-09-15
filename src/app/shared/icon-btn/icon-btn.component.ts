import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-icon-btn",
  templateUrl: "./icon-btn.component.html",
  styleUrls: ["./icon-btn.component.css"]
})
export class IconBtnComponent implements OnInit {
  @Input()
  btnClass = "btn-default";
  @Input()
  iconClass = "";
  @Input()
  text = "Click Me!";
  @Input()
  btnType = "button";
  @Output("btnClicked")
  btnClicked: EventEmitter<null>;

  constructor() {}

  ngOnInit() {}

  onBtnClick() {
    // this.btnClicked.emit();
    console.log("clicked btn");
  }
}
