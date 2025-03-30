import { createElementWithProps } from "../elementCreation";
import { createBtnWithTip } from "../controlBar/createControlBar";
import { classesControlRemBar, remBtnIconPath } from "./savedMoviesVars";

export function createControlRemBar(storageProperty) {
  const controlBarElem = createElementWithProps(
    "div",
    classesControlRemBar.controlBarElem
  );
  const remBtn = createRemoveBtn(storageProperty);
  controlBarElem.append(remBtn);
  return controlBarElem;
}

function createRemoveBtn(storageProperty) {
  let tooltipText;

  storageProperty === "favorites"
    ? (tooltipText = "Remove from favorites")
    : (tooltipText = "Remove from watchlist");

  return createBtnWithTip(
    classesControlRemBar.btnRemove,
    remBtnIconPath,
    tooltipText
  );
}
