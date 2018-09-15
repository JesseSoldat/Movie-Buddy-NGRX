import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit
} from "@angular/core";

import { Observable, fromEvent } from "rxjs";
import {
  map,
  filter,
  distinctUntilChanged,
  debounceTime,
  tap
} from "rxjs/operators";

import { MovieDbService } from "../../core/services/moviedb.service";

@Component({
  selector: "app-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.css"]
})
export class SearchBoxComponent implements OnInit, AfterViewInit {
  @ViewChild("searchInput")
  searchInput: ElementRef;
  searchTerm: string;
  inputStream$: Observable<string>;

  constructor(private movieDbService: MovieDbService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.inputStream$ = fromEvent(this.searchInput.nativeElement, "keyup").pipe(
      map((e: any) => e.target.value),
      filter((text: string) => text.length > 1),
      distinctUntilChanged(),
      debounceTime(250),
      tap(text => this.submitSearch(text)) // call the search service
    );

    this.inputStream$.subscribe(text => {});
  }

  submitSearch(searchTerm: string) {
    // console.log("calling api for", searchTerm);
    this.movieDbService.getListOfMovies(searchTerm);
  }
}
