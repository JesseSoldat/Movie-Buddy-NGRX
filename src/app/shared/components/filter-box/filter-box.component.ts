import {
  Component,
  ViewChild,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { Observable, fromEvent, Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-filter-box",
  templateUrl: "./filter-box.component.html",
  styleUrls: ["./filter-box.component.css"]
})
export class FilterBoxComponent implements AfterViewInit, OnDestroy {
  @ViewChild("searchInput")
  searchInput: ElementRef;
  @Output()
  onFilterText = new EventEmitter();
  inputStream$: Observable<string>;
  inputSubscription: Subscription;

  constructor() {}

  ngAfterViewInit() {
    this.inputStream$ = fromEvent(this.searchInput.nativeElement, "keyup").pipe(
      map((e: any) => e.target.value),
      tap(text => this.onFilterText.emit(text))
    );

    this.inputSubscription = this.inputStream$.subscribe(text => {});
  }

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
  }
}
