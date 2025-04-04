import { showPopUp, handlePopupClick } from "../popup";
import { moveToPage } from "../moveToPage";

export function handleItemClick(evt) {
  if (evt.target.closest(".popup")) {
    handlePopupClick(evt);
  } else if (evt.target.closest(".movie")) {
    const id = evt.target.closest(".movie").dataset.id;
    showPopUp(evt, id);
  } else if (evt.target.closest(".genre")) {
    moveToPage(evt.target.closest(".genre"), "genre");
  }
}
