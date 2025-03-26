import { classesControlBar, controlBarIconPaths } from "./moviePage/movieVars";
import { deleteMovieFromStorage, addMovieToStorage } from "./localStorage";

function changeTooltipText(btn, text) {
  const tooltipElem = btn.querySelector("." + classesControlBar.tooltip);
  tooltipElem.textContent = text;
}

function changeBtnIcon(btn, iconPath) {
  const iconElem = btn.querySelector("." + classesControlBar.icon);
  iconElem.setAttribute("src", iconPath);
}

function getDataSetMovieInfo(btn) {
  const parent = btn.closest("." + classesControlBar.controlBar);
  if (parent.dataset.movie) {
    const movieInfo = JSON.parse(parent.dataset.movie);
    return movieInfo;
  }
  return;
}

export function handleFavBtnClick(evt) {
  const btn = evt.target.closest("button");
  const movieInfo = getDataSetMovieInfo(btn);
  const btnState = btn.dataset.state;
  if (btnState === "on") {
    changeBtnIcon(btn, controlBarIconPaths.likeIcon);
    changeTooltipText(btn, "add to favorites");
    deleteMovieFromStorage(movieInfo.id, "favorites");
    btn.dataset.state = "off";
  } else if (btnState === "off") {
    changeBtnIcon(btn, controlBarIconPaths.dislikeIcon);
    changeTooltipText(btn, "remove from favorites");
    addMovieToStorage(movieInfo, "favorites");
    btn.dataset.state = "on";
  }
}

export function handleWatchlstBtnClick(evt) {
  const btn = evt.target.closest("button");
  const movieInfo = getDataSetMovieInfo(btn);
  const btnState = btn.dataset.state;
  if (btnState === "on") {
    changeBtnIcon(btn, controlBarIconPaths.addIcon);
    changeTooltipText(btn, "add to watchlist");
    deleteMovieFromStorage(movieInfo.id, "watchlist");
    btn.dataset.state = "off";
  } else if (btnState === "off") {
    changeBtnIcon(btn, controlBarIconPaths.removeIcon);
    changeTooltipText(btn, "remove from watchlist");
    addMovieToStorage(movieInfo, "watchlist");
    btn.dataset.state = "on";
  }
}
