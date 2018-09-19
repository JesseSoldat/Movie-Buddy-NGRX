import { ShowOverlay } from "../shared/shared.actions";

export const createShowOverlay = (from, showOverlay = true) => {
  return new ShowOverlay({
    showOverlay,
    from
  });
};
