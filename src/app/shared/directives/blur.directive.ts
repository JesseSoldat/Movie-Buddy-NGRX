import {
  Directive,
  ElementRef,
  Output,
  HostListener,
  EventEmitter
} from "@angular/core";

// https://angular.io/guide/attribute-directives
@Directive({
  // [] = attribute selector
  selector: "[appBlurEvent]"
})
export class OnBlurDirective {
  @Output("appBlurEvent")
  appBlurEvent: EventEmitter<any> = new EventEmitter();

  // ------ get the current host DOM element -------
  constructor(private el: ElementRef) {}

  // --- @HostListener decorator lets you subscribe to events of the DOM element ---
  @HostListener("focusout", ["$event.target"])
  onFocusout(target) {
    this.appBlurEvent.emit();
  }

  // -------- other example events --------
  // @HostListener('mouseenter') onMouseEnter() {}
  // @HostListener('mouseleave') onMouseLeave() {}

  // ------- helper method --------
  // private doSomethingToTheElement(color: string) {
  //   this.el.nativeElement.style.backgroundColor = color;
  // }

  // --- SELECTOR and @Input can be different ---
  // <p appHighlight highlightColor="yellow">Highlighted in yellow</p>
  // @Input() highlightColor: string;
  // --- or you can use the same name
  // <p [appHighlight]="color">Highlight me!</p>
  // @Input() appHighlight: string;
  // -------- @Input alias -----------
  // @Input('appHighlight') highlightColor: string;
}
