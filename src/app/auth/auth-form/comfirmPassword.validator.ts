import { AbstractControl } from "@angular/forms";

export const comfirmPasswordValidator = (
  control: AbstractControl
): { [key: string]: boolean } => {
  const password = control.get("password").value;
  const comfirmPassword = control.get("comfirmPassword").value;

  if (!password || !comfirmPassword) {
    return null;
  }
  if (password !== comfirmPassword) {
    return { nomatch: true };
  }

  return null;
};
