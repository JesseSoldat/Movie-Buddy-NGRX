import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

// import { map, filter } from "rxjs/operators";
import { confirmPasswordValidator } from "./confirmPassword.validator";
import { User } from "../../models/user.model";

interface Auth {
  username?: string;
  email: string;
  password: string;
  confirm: string;
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
        Validators.maxLength(10)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      passwordFormGroup: this.formBuilder.group(
        {
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(5),
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

  getErrMsg(key, length) {
    const errMsgs = {
      required: "This field is required!",
      minlength: `This field has to be at least ${length} characters long!`,
      maxlength: `This field can not be over ${length} characters!`,
      email: "Please enter a valid email!",
      nomatch: "The passwords do not match!"
    };
    return errMsgs[key];
  }

  fieldValidation(err) {
    console.log(err);
    const errKeys = ["required", "nomatch", "minlength", "maxlength", "email"];
    let msg = "";

    errKeys.forEach(key => {
      if (err && err[key]) {
        if (key === "minlength") {
          const min = err[key].requiredLength;
          msg = this.getErrMsg(key, min);
          return;
        } else if (key === "maxlength") {
          const max = err[key].requiredLength;
          msg = this.getErrMsg(key, max);
          return;
        }
        msg = this.getErrMsg(key, null);
      }
    });

    return msg;
  }

  createErrorMsg(control, err) {
    switch (control) {
      case "username":
        this.usernameErr = this.fieldValidation(err);
        break;

      case "email":
        this.emailErr = this.fieldValidation(err);
        break;

      case "password":
        this.passwordErr = this.fieldValidation(err);
        break;

      case "confirmPassword":
        this.confirmPasswordErr = this.fieldValidation(err);
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
    const auth: Auth = this.authForm.value;
    // this.formSubmitted.emit(auth);
  }
}
