import { controlBarIconPaths, classesControlBar } from "./moviePage/movieVars";
import { isMovieStored } from "./localStorage";

import {
  createElementWithProps,
  createButtonWithIcon,
} from "./moviePage/movieUtils";

export function createControlBarElem(movieData) {
  // test();
  const controlBarElem = createElementWithProps(
    "div",
    classesControlBar.controlBar
  );

  const watched = isMovieStored(movieData.id, "favorites");

  const favIconPath = watched
    ? controlBarIconPaths.dislikeIcon
    : controlBarIconPaths.likeIcon;

  const favBtnElem = createBtnWitTip(
    true,
    favIconPath,
    watched ? "remove from favorites" : "add to favorites"
  );

  //проверить есть ли в localStorage в watchlist этот фильм (по movie_id)
  const inWatchList = isMovieStored(movieData.id, "watchlist");

  const watchlstIconPath = inWatchList
    ? controlBarIconPaths.removeIcon
    : controlBarIconPaths.addIcon;

  const watchListBtnElem = createBtnWitTip(
    false,
    watchlstIconPath,
    inWatchList ? "remove from watchlist" : "add to watchlist"
  );

  controlBarElem.append(favBtnElem, watchListBtnElem);
  return controlBarElem;
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
