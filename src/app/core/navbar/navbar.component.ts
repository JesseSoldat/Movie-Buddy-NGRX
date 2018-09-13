import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
// NGRX
import { AuthState } from "../../auth/auth.reducer";
import { Store, select } from "@ngrx/store";
import { selectIsLoggedIn, selectIsLoggedOut } from "../../auth/auth.selectors";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  $isLoggedIn: Observable<boolean>;
  $isLoggedOut: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
    this.$isLoggedIn = this.store.pipe(select(selectIsLoggedIn));
    this.$isLoggedOut = this.store.pipe(select(selectIsLoggedOut));
  }

  logout() {
    this.authService.logout();
  }
}
