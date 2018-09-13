import { getErrMsg } from "./getErrMsg";

export const fieldValidation = err => {
  if (err !== null) {
    console.log(err);
  }

  const errKeys = ["required", "nomatch", "minlength", "maxlength", "email"];
  let msg = "";

  errKeys.forEach(key => {
    if (err && err[key]) {
      if (key === "minlength") {
        const min = err[key].requiredLength;
        msg = getErrMsg(key, min);
        return;
      } else if (key === "maxlength") {
        const max = err[key].requiredLength;
        msg = getErrMsg(key, max);
        return;
      }
      msg = getErrMsg(key, null);
    }
  });

  return msg;
};
