import { classesControlBar } from "./moviePage/movieVars";
import { deleteMovieFromStorage, addMovieToStorage } from "./localStorage";

function changeTooltipText(btn, text) {
  const tooltipElem = btn.querySelector(classesControlBar.tooltip);
  tooltipElem.textContent = text;
}

function changeBtnIcon(btn, iconPath) {
  const iconElem = btn.querySelector(classesControlBar.icon);
  iconElem.setAttribute("src", iconPath);
}

function getDataSetMovieInfo(btn, onlyId = false) {
  const parent = btn.closest("." + classesControlBar.controlBar);
  const movieInfo = JSON.parse(parent.dataset.movie);
  if (onlyId) return movieInfo.id;
  return movieInfo;
}
