import { Directive, Output, HostListener, EventEmitter } from "@angular/core";

@Directive({
  selector: "[onBlur]"
})
export class OnBlurDirective {
  // @Input('onBlur') onBlurFunction: Function;
  @Output("onBlur")
  onBlurEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  @HostListener("focusout", ["$event.target"])
  onFocusout(target) {
    // console.log("Focus out called");
    this.onBlurEvent.emit();
  }
}
