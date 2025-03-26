import { classesControlBar, controlBarIconPaths } from "./moviePage/movieVars";
import { deleteMovieFromStorage, addMovieToStorage } from "./localStorage";

function changeTooltipText(btn, text) {
  const tooltipElem = btn.querySelector("." + classesControlBar.tooltip);
  console.log(tooltipElem);
  tooltipElem.textContent = text;
}

function changeBtnIcon(btn, iconPath) {
  const iconElem = btn.querySelector("." + classesControlBar.icon);
  console.log(iconElem);
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
  console.log("ok!");
  const btn = evt.target.closest("button");
  console.log(btn);
  const movieInfo = getDataSetMovieInfo(btn);
  console.log(movieInfo);
  // const btnState = btn.dataset.state;
  // if (btnState === "on") {
  //   changeBtnIcon(btn, controlBarIconPaths.dislikeIcon);
  //   changeTooltipText(btn, "add to favorites");
  //   deleteMovieFromStorage(movieInfo.id, "favorites");
  //   btn.dataset.state = "off";
  // } else if (btnState === "off") {
  //   changeBtnIcon(btn, controlBarIconPaths.likeIcon);
  //   changeTooltipText(btn, "remove from favorites");
  //   addMovieToStorage(movieInfo, "favorites");
  //   btn.dataset.state = "on";
  // }
}
