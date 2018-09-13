import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { confirmPasswordValidator } from "./confirmPassword.validator";
import { User } from "../../models/user.model";
import { Auth } from "../../models/auth.model";
// helpers
import { fieldValidation } from "../helpers/fieldValidation";

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
  // Errors
  usernameErr: string;
  emailErr: string;
  passwordErr: string;
  confirmPasswordErr: string;

  constructor(private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      passwordFormGroup: this.formBuilder.group(
        {
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(15)
            ]
          ],
          confirmPassword: ["", [Validators.required]]
        },
        {
          validator: confirmPasswordValidator
        }
      )
    });
  }

  ngOnInit() {
    // this.authForm.valueChanges.subscribe(val => {});
  }

  createErrorMsg(control, err) {
    switch (control) {
      case "username":
        this.usernameErr = fieldValidation(err);
        break;

      case "email":
        this.emailErr = fieldValidation(err);
        break;

      case "password":
        this.passwordErr = fieldValidation(err);
        break;

      case "confirmPassword":
        this.confirmPasswordErr = fieldValidation(err);
        break;

      default:
        break;
    }
  }

  processFormGroupErrors(control, controlType, group) {
    const passwordGroup = this.authForm.get(group);
    let errObj;
    // Control Group Error
    if (control === controlType && passwordGroup.errors) {
      errObj = passwordGroup.errors;
      this.createErrorMsg(control, errObj);
      return;
    }
    // Single Control Error
    errObj = passwordGroup.get(control).errors;
    this.createErrorMsg(control, errObj);
  }

  blurEvent(control: string) {
    let errObj;
    if (control === "password" || control === "confirmPassword") {
      return this.processFormGroupErrors(
        control,
        "confirmPassword",
        "passwordFormGroup"
      );
    }
    errObj = this.authForm.get(control).errors;
    this.createErrorMsg(control, errObj);
  }

  // get username() {
  //   return this.authForm.get("username");
  // }

  onSubmit() {
    const formValues = this.authForm.value;
    const auth: Auth = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.passwordFormGroup.password
    };

    this.formSubmitted.emit(auth);
  }
}
