import { deleteMovieFromStorage } from "../localStorage";
import {
  moviesContainerClass,
  savedMoviesClss,
  numOfMovies,
} from "./savedMoviesVars";
import { showMsgLstIsEmpty } from "./getAndLoadSavedMovies";

export function handleRemoveMovieClick(evt, storageName) {
  const movieCard = evt.target.closest("." + savedMoviesClss.movieCard);
  deleteMovieFromStorage(Number(movieCard.dataset.id), storageName);
  movieCard.remove();
  numOfMovies.num -= 1;
  if (numOfMovies.num < 1)
    showMsgLstIsEmpty(document.querySelector("." + moviesContainerClass));
}
