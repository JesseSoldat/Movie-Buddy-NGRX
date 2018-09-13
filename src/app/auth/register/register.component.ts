import { Component } from "@angular/core";

import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  formSubmitted({ username, email, password }) {
    this.authService.emailRegister(username, email, password);
  }
}
