import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IconBtn } from "../../../models/icon-btn.model";

@Component({
  selector: "app-top-row-btns",
  templateUrl: "./top-row-btns.component.html",
  styleUrls: ["./top-row-btns.component.css"]
})
export class TopRowBtnsComponent implements OnInit {
  @Input()
  link: string;

  @Input()
  iconBtn: IconBtn = { text: "Go Back", icon: "fas fa-chevron-left" };

  constructor(private router: Router) {}

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl(this.link);
  }
}
