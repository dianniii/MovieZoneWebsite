import { iconPaths, classesControlBar, controlBarIds } from "./movieVars";

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
  const watched = isMovieStored(movieData.id, "watched");

  // const watched = isMovieWatched
  const watchedBtnElem = createButtonWithIcon(
    controlBarIds.likeBtnId,
    classesControlBar.button,
    classesControlBar.icon,
    watched ? iconPaths.dislikeIcon : iconPaths.likeIcon,
    watched ? "dislike icon" : "like icon"
  );

  //проверить есть ли в localStorage в watchlist этот фильм (по movie_id)
  const inWatchList = isMovieStored(movieData.id, "watchlist");

  const watchListBtnElem = createButtonWithIcon(
    controlBarIds.addBtnId,
    classesControlBar.button,
    classesControlBar.icon,
    inWatchList ? iconPaths.removeIcon : iconPaths.addIcon,
    inWatchList ? "tick icon" : "plus icon"
  );

  controlBarElem.append(watchedBtnElem, watchListBtnElem);

  return controlBarElem;
}
