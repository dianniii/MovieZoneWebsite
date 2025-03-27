import { basePosterUrl } from "../commonVars";
import {
  createElementWithProps,
  createLinkWithIcon,
  createImgElem,
} from "../utils";
import { movieContainerClass, savedMoviesClss } from "./savedMoviesVars";
import { tmbdUrl, iconPaths } from "../moviePage/movieVars";
import { getMoviesFromStorage } from "../localStorage";
import { createControlBarElem } from "../createControlBar";

const moviesContainer = document.querySelector(".movie-cards");

export function loadSavedMovies(storageProperty) {
  const moviesArr = getMoviesFromStorage(storageProperty);
  appendMovies(moviesArr);
}

function appendMovies(movieArr) {
  movieArr.forEach((movieObj) =>
    moviesContainer.append(createMovieElem(movieObj))
  );
}

function createMovieElem(movieData) {
  const moviesContainer = createElementWithProps("div", movieContainerClass);
  moviesContainer.dataset.id = movieData.id;

  const posterElem = createPosterElem(movieData.poster_path);
  moviesContainer.append(posterElem);

  const titleElem = createTitleElem(movieData.title);
  moviesContainer.append(titleElem);

  if (movieData.release_date) {
    const yearElem = createParElem(
      savedMoviesClss.year,
      movieData.release_date.slice(0, 4)
    );
    moviesContainer.append(yearElem);
  }

  if (movieData.overview) {
    const descriptionElem = createParElem(
      savedMoviesClss.overview,
      movieData.overview
    );
    moviesContainer.append(descriptionElem);
  }

  const tmbdLinkElem = createTMBDlinkElem(movieData.id);
  moviesContainer.append(tmbdLinkElem);

  moviesContainer.append(createControlBarElem(movieData));

  return moviesContainer;
}

function createPosterElem(posterPath) {
  const posterContainer = createElementWithProps(
    "div",
    savedMoviesClss.posterCont
  );
  const posterElem = createImgElem(
    savedMoviesClss.poster,
    basePosterUrl + posterPath,
    "movie poster"
  );
  posterContainer.append(posterElem);
  return posterContainer;
}

function createTitleElem(title) {
  return createElementWithProps(
    "h2",
    savedMoviesClss.title,
    false,
    title || "Unknown"
  );
}

function createParElem(className, text) {
  return createElementWithProps("p", className, false, text);
}

function createTMBDlinkElem(movie_id) {
  const container = createElementWithProps("div", savedMoviesClss.linkCont);

  const linkElem = createLinkWithIcon(
    savedMoviesClss.link,
    savedMoviesClss.linkIcon,
    tmbdUrl + movie_id,
    iconPaths.TMBDIcon,
    "TMBD icon"
  );

  container.append(linkElem);
  return container;
}
