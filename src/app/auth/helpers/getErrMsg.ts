export const getErrMsg = (key, length) => {
  const errMsgs = {
    required: "This field is required!",
    minlength: `This field has to be at least ${length} characters long!`,
    maxlength: `This field can not be over ${length} characters!`,
    email: "Please enter a valid email!",
    nomatch: "The passwords do not match!"
  };
  return errMsgs[key];
};
