import { controlBarIconPaths, classesControlBar } from "./controlBarVars";
import { isMovieStored } from "../localStorage";

import {
  createElementWithProps,
  createButtonWithIcon,
} from "../elementCreation";

import { saveShortMovieInfo } from "../moviePage/getMovieData";

export function createControlBarElem(movieData) {
  const controlBarElem = createElementWithProps(
    "div",
    classesControlBar.controlBar
  );
  saveShortMovieInfo(controlBarElem, movieData);

  const favBtnElem = createFavoriteBtn(movieData);
  // favBtnElem.addEventListener("click", handleFavBtnClick);

  const watchListBtnElem = createWatchListBtn(movieData);
  // watchListBtnElem.addEventListener("click", handleWatchlstBtnClick);

  controlBarElem.append(favBtnElem, watchListBtnElem);
  return controlBarElem;
}

function createFavoriteBtn(movieData) {
  const favorite = isMovieStored(movieData.id, "favorites");

  const favIconPath = favorite
    ? controlBarIconPaths.dislikeIcon
    : controlBarIconPaths.likeIcon;

  const favBtnElem = createBtnWithTip(
    classesControlBar.btnFav,
    favIconPath,
    favorite ? "remove from favorites" : "add to favorites"
  );
  favBtnElem.dataset.state = favorite ? "on" : "off";
  return favBtnElem;
}

function createWatchListBtn(movieData) {
  const inWatchList = isMovieStored(movieData.id, "watchlist");

  const watchlstIconPath = inWatchList
    ? controlBarIconPaths.addedIcon
    : controlBarIconPaths.addIcon;

  const watchListBtnElem = createBtnWithTip(
    classesControlBar.btnWatch,
    watchlstIconPath,
    inWatchList ? "remove from watchlist" : "add to watchlist"
  );
  watchListBtnElem.dataset.state = inWatchList ? "on" : "off";
  return watchListBtnElem;
}

export function createBtnWithTip(classNames, iconPath, tooltipText) {
  const btn = createButtonWithIcon(
    classNames,
    classesControlBar.icon,
    iconPath,
    "button icon"
  );

  const tooltip = createElementWithProps(
    "span",
    classesControlBar.tooltip,
    false,
    tooltipText
  );

  btn.append(tooltip);
  return btn;
}
