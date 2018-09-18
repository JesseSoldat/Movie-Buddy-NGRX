import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { Observable, fromEvent, Subscription } from "rxjs";
import {
  map,
  filter,
  distinctUntilChanged,
  debounceTime,
  tap
} from "rxjs/operators";

@Component({
  selector: "app-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.css"]
})
export class SearchBoxComponent implements AfterViewInit, OnDestroy {
  @Output("searchChanged")
  searchChanged: EventEmitter<string> = new EventEmitter();
  @ViewChild("searchInput")
  searchInput: ElementRef;
  searchTerm: string;
  inputStream$: Observable<string>;
  inputSubscription: Subscription;

  ngAfterViewInit() {
    this.inputStream$ = fromEvent(this.searchInput.nativeElement, "keyup").pipe(
      map((e: any) => e.target.value),
      filter((text: string) => text.length > 1),
      distinctUntilChanged(),
      debounceTime(250),
      tap(text => this.submitSearch(text)) // call the search service
    );

    this.inputSubscription = this.inputStream$.subscribe(text => {});
  }

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
  }

  submitSearch(searchTerm: string) {
    this.searchChanged.emit(searchTerm);
  }
}
