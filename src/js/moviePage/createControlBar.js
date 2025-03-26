import {
  likeIconPath,
  addIconPath,
  classesControlBar,
  controlBarIds,
} from "./movieVars";
import { createElementWithProps, createButtonWithIcon } from "./movieUtils";

export function createControlBarElem() {
  const controlBarElem = createElementWithProps(
    "div",
    classesControlBar.controlBar
  );

  const likeBtnElem = createButtonWithIcon(
    controlBarIds.likeBtnId,
    classesControlBar.button,
    classesControlBar.icon,
    likeIconPath,
    "like icon"
  );

  const addBtnElem = createButtonWithIcon(
    controlBarIds.addBtnId,
    classesControlBar.button,
    classesControlBar.icon,
    addIconPath,
    "plus icon"
  );

  controlBarElem.append(likeBtnElem, addBtnElem);

  return controlBarElem;
}
