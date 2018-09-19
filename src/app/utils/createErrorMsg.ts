import { ShowMsg } from "../shared/shared.actions";

const defaultMsg = "An error ocurred while fetching the data.";

export const createErrorMsg = (msgText = defaultMsg, from) => {
  return new ShowMsg({
    msg: {
      title: "Error",
      msg: msgText,
      color: "red"
    },
    from
  });
};
