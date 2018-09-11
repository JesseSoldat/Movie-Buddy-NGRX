import { Component, OnInit } from "@angular/core";

const colorEnum = {
  green: "alert-success",
  blue: "alert-info",
  red: "lert-danger"
};

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  showMsg = true;
  AlertType = colorEnum.blue;
  constructor() {}

  ngOnInit() {}

  close() {
    console.log("clicked close");

    this.showMsg = false;
  }
}
