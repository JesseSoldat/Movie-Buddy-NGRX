import { ShowOverlay } from "../shared/shared.actions";
import { ShowMsg } from "../shared/shared.actions";

const defaultMsg = "An error ocurred while fetching the data.";

export const errMsg = (store, from, msgText = defaultMsg) => {
  store.dispatch(
    new ShowMsg({
      msg: {
        title: "Error",
        msg: msgText,
        color: "red"
      },
      from
    })
  );
};

export const showOverlay = (store, from) => {
  store.dispatch(
    new ShowOverlay({
      showOverlay: true,
      from
    })
  );
};

export const hideOverlay = (store, from) => {
  store.dispatch(
    new ShowOverlay({
      showOverlay: false,
      from
    })
  );
};
