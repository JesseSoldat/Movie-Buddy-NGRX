import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "../../models/user.model";
import { Auth } from "../../models/auth.model";
import { AuthService } from "../auth.service";
// helpers
import { fieldValidation } from "../helpers/fieldValidation";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  // Errors
  emailErr: string;
  passwordErr: string;
  constructor(private authService: AuthService) {
    this.authForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {}

  createErrorMsg(control, err) {
    if (control === "email") {
      return (this.emailErr = fieldValidation(err));
    }
    this.passwordErr = fieldValidation(err);
  }

  blurEvent(control: string) {
    const errObj = this.authForm.get(control).errors;
    this.createErrorMsg(control, errObj);
  }

  onSubmit() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    this.authService.emailLogin(email, password);
  }
}
