import { classesInfo } from "./movieVars";

export function toggleCastElementLength(evtTarget) {
  const hiddenPart = document.querySelector("." + classesInfo.hiddenCast);
  const btnElem = evtTarget;
  hiddenPart.classList.toggle(castHiddenClassName);
  if (hiddenPart.classList.contains(classesInfo.hiddenCast)) {
    btnElem.textContent = "see more...";
    return;
  }
  btnElem.textContent = "see less";
}

export function showOtherMovies(evt) {
  return;
}
