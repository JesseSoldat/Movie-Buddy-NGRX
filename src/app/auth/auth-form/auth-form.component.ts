import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { map, filter } from "rxjs/operators";

import { User } from "../../models/user.model";

interface Auth {
  username?: string;
  email: string;
  password: string;
  comfirmPassword: string;
}

@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.css"]
})
export class AuthFormComponent implements OnInit {
  @Input()
  formType: string;
  @Output()
  formSubmitted = new EventEmitter<User>();

  authForm: FormGroup;

  constructor() {
    this.authForm = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.max(10)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.max(15)
      ]),
      comfirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.max(15)
      ])
    });
  }

  ngOnInit() {
    this.onChanges();
    // { updateOn: "submit" }
  }

  onChanges(): void {
    // this.authForm.valueChanges.subscribe(val => {
    //   console.log("change", val);
    // });

    this.authForm.valueChanges
      .pipe(map(values => values.username))
      .subscribe(username => {
        console.log(username);
      });
  }

  get username() {
    return this.authForm.get("username");
  }

  get email() {
    return this.authForm.get("email");
  }

  get password() {
    return this.authForm.get("password");
  }

  get comfirmPassword() {
    return this.authForm.get("comfirmPassword");
  }

  onSubmit() {
    const auth: Auth = this.authForm.value;
    console.log(auth);

    // this.formSubmitted.emit(auth);
  }
}
