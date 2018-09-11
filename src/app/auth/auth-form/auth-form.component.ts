import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

// import { map, filter } from "rxjs/operators";

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
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor() {
    this.authForm = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
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
  }

  onChanges(): void {
    // this.authForm.valueChanges.subscribe(val => {
    //   console.log(val);
    //   console.log(this.authForm);
    // });
    // this.authForm.valueChanges
    //   .pipe(map(values => values.username))
    //   .subscribe(username => {
    //     console.log(username);
    //   });
  }

  parseErrors(control) {
    const errObj = this.authForm.get(control).errors;
    this.createErrorMsg(control, errObj);
  }

  userNameValidation(err) {
    if (err === null) {
      this.username = "";
    } else if (err && err["required"]) {
      this.username = "This field is required!";
    } else if (err && err["minlength"]) {
      this.username = "This field has to be at least 3 characters long!";
    } else if (err && err["maxlength"]) {
      this.username = "This field can not be over 10 characters!";
    } else {
      this.username = "";
    }
  }

  createErrorMsg(control, err) {
    console.log(err);

    switch (control) {
      case "username":
        this.userNameValidation(err);
        break;

      case "email":
        break;

      case "password":
        break;

      case "comfirmPassword":
        break;

      default:
        break;
    }
  }

  blurEvent(control: string) {
    this.parseErrors(control);
  }

  // get username() {
  //   return this.authForm.get("username");
  // }

  // get email() {
  //   return this.authForm.get("email");
  // }

  // get password() {
  //   return this.authForm.get("password");
  // }

  // get comfirmPassword() {
  //   return this.authForm.get("comfirmPassword");
  // }

  onSubmit() {
    const auth: Auth = this.authForm.value;
    console.log(auth);

    // this.formSubmitted.emit(auth);
  }
}
