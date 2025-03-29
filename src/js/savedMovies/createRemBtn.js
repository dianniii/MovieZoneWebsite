import { createElementWithProps } from "../elementCreation";
import { createBtnWithTip } from "../controlBar/createControlBar";
import {
  controlBarIconPaths,
  classesControlBar,
} from "../controlBar/controlBarVars";

export function createControlRemBar(storageProperty) {
  const controlBarElem = createElementWithProps(
    "div",
    classesControlBar.controlBar
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

  return createBtnWithTip(true, controlBarIconPaths.removeIcon, tooltipText);
}
