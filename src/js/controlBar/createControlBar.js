import { controlBarIconPaths, classesControlBar } from "./controlBarVars";
import { isMovieStored } from "../localStorage";

import {
  createElementWithProps,
  createButtonWithIcon,
} from "../elememtCreation";

import { saveShortMovieInfo } from "../moviePage/getMovieData";

import {
  handleFavBtnClick,
  handleWatchlstBtnClick,
} from "./controlBarBtnHandlers";

export function createControlBarElem(movieData) {
  // test();
  // window.localStorage.clear();
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

function createFavoriteBtn(movieData) {
  const favorite = isMovieStored(movieData.id, "favorites");

  const favIconPath = favorite
    ? controlBarIconPaths.dislikeIcon
    : controlBarIconPaths.likeIcon;

  const favBtnElem = createBtnWitTip(
    true,
    favIconPath,
    favorite ? "remove from favorites" : "add to favorites"
  );
  favBtnElem.dataset.state = favorite ? "on" : "off";
  return favBtnElem;
}

function createWatchListBtn(movieData) {
  const inWatchList = isMovieStored(movieData.id, "watchlist");

  const watchlstIconPath = inWatchList
    ? controlBarIconPaths.removeIcon
    : controlBarIconPaths.addIcon;

  const watchListBtnElem = createBtnWitTip(
    false,
    watchlstIconPath,
    inWatchList ? "remove from watchlist" : "add to watchlist"
  );
  watchListBtnElem.dataset.state = inWatchList ? "on" : "off";
  return watchListBtnElem;
}

function createBtnWitTip(fav = true, iconPath, tooltipText) {
  const btn = createButtonWithIcon(
    fav ? classesControlBar.btnFav : classesControlBar.btnWatchlst,
    classesControlBar.icon,
    iconPath,
    fav ? "like icon" : "plus icon"
  );

  const tooltip = createElementWithProps(
    "span",
    fav ? classesControlBar.tooltipFav : classesControlBar.tooltipWatchLst,
    false,
    tooltipText
  );

  btn.append(tooltip);
  return btn;
}

// function test() {
// const favorites = [{ id: "27205" }];
// const watch = [{ id: "27205" }];
// window.localStorage.setItem("favorites", JSON.stringify(favorites));
// window.localStorage.setItem("watchlist", JSON.stringify(watch));
// window.localStorage.clear();
// }
