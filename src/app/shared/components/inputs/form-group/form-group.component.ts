import { Component, Input } from "@angular/core";

@Component({
  selector: "app-form-group",
  templateUrl: "./form-group.component.html",
  styleUrls: ["./form-group.component.css"]
})
export class FormGroupComponent {
  @Input()
  type = "text";
  @Input()
  label: string;
  @Input()
  placeholder: string;
  @Input()
  info: string;
  @Input()
  errMsg: string;
}
