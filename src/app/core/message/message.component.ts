import { Component, OnInit } from "@angular/core";

const colorEnum = {
  green: "alert-success",
  blue: "alert-info",
  red: "alert-danger"
};

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  showMsg = false;
  AlertType = colorEnum.blue;
  constructor() {}

  ngOnInit() {}

  close() {
    this.showMsg = false;
  }
}
