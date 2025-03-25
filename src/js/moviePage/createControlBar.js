import { controlBarIconPaths, classesControlBar } from "./movieVars";

import {
  createElementWithProps,
  createButtonWithIcon,
  isMovieStored,
} from "./movieUtils";

export function createControlBarElem(movieData) {
  const controlBarElem = createElementWithProps(
    "div",
    classesControlBar.controlBar
  );
  //проверить есть ли в localStorage в watched этот фильм (по movie_id)
  const watched = isMovieStored(movieData.id, "favorite");
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
