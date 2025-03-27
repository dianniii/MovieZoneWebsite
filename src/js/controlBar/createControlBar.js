import { controlBarIconPaths, classesControlBar } from "./controlBarVars";
import { isMovieStored } from "../localStorage";

import {
  createElementWithProps,
  createButtonWithIcon,
} from "../elementCreation";

import { saveShortMovieInfo } from "../moviePage/getMovieData";

import {
  handleFavBtnClick,
  handleWatchlstBtnClick,
} from "./controlBarBtnHandlers";

export function createControlBarElem(movieData) {
  const controlBarElem = createElementWithProps(
    "div",
    classesControlBar.controlBar
  );
  saveShortMovieInfo(controlBarElem, movieData);

  const favBtnElem = createFavoriteBtn(movieData);
  favBtnElem.addEventListener("click", handleFavBtnClick);

  const watchListBtnElem = createWatchListBtn(movieData);
  watchListBtnElem.addEventListener("click", handleWatchlstBtnClick);

  controlBarElem.append(favBtnElem, watchListBtnElem);
  return controlBarElem;
}

export function createControlRemBar(storageProperty) {
  const controlBarElem = createElementWithProps(
    "div",
    classesControlBar.controlBar
  );
  const remBtn = createRemoveBtn(storageProperty);
  // add eventListener
  controlBarElem.append(remBtn);
  return controlBarElem;
}

function createFavoriteBtn(movieData) {
  const favorite = isMovieStored(movieData.id, "favorites");

  const favIconPath = favorite
    ? controlBarIconPaths.dislikeIcon
    : controlBarIconPaths.likeIcon;

  const favBtnElem = createBtnWithTip(
    false,
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
    false,
    watchlstIconPath,
    inWatchList ? "remove from watchlist" : "add to watchlist"
  );
  watchListBtnElem.dataset.state = inWatchList ? "on" : "off";
  return watchListBtnElem;
}

function createRemoveBtn(storageProperty) {
  let tooltipText;

  storageProperty === "favorites"
    ? (tooltipText = "Remove from favorites")
    : (tooltipText = "Remove from watchlist");

  return createBtnWithTip(true, controlBarIconPaths.removeIcon, tooltipText);
}

function createBtnWithTip(rem, iconPath, tooltipText) {
  const btn = createButtonWithIcon(
    rem ? classesControlBar.btnRemove : classesControlBar.btn,
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
