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
}

export function handleFavBtnClick(evt) {
  const btn = evt.target.closest("button");
  const movieInfo = getDataSetMovieInfo(btn);
  const btnState = btn.dataset.state;
  if (btnState === "on") {
    turnOffBtn(btn, true, controlBarIconPaths.likeIcon, movieInfo.id);
  } else if (btnState === "off") {
    turnOnBtn(btn, true, controlBarIconPaths.dislikeIcon, movieInfo);
  }
}

export function handleWatchlstBtnClick(evt) {
  const btn = evt.target.closest("button");
  const movieInfo = getDataSetMovieInfo(btn);
  const btnState = btn.dataset.state;
  if (btnState === "on") {
    turnOffBtn(btn, false, controlBarIconPaths.addIcon, movieInfo.id);
  } else if (btnState === "off") {
    turnOnBtn(btn, false, controlBarIconPaths.removeIcon, movieInfo);
  }
}

function turnOffBtn(btn, favBtn, iconPath, movie_id) {
  changeBtnIcon(btn, iconPath);
  changeTooltipText(btn, favBtn ? "add to favorites" : "add to watchlist");
  deleteMovieFromStorage(movie_id, favBtn ? "favorites" : "watchlist");
  btn.dataset.state = "off";
}

function turnOnBtn(btn, favBtn, iconPath, movieInfo) {
  changeBtnIcon(btn, iconPath);
  changeTooltipText(
    btn,
    favBtn ? "remove from favorites" : "remove from watchlist"
  );
  addMovieToStorage(movieInfo, favBtn ? "favorites" : "watchlist");
  btn.dataset.state = "on";
}
