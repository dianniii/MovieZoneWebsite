import {
  movieBlockName,
  movieContainer,
  baseBackdropUrl,
  basePosterUrl,
} from "./movieVars";

import { isValidUrl } from "./movieUtils";

import {
  fetchMovieObj,
  filterMovieData,
  getMovieIdFromURL,
} from "./getMovieData";
import { createMovieBannerElem, createInfoBlock } from "./createMoviePageElems";

export async function loadMoviePage() {
  try {
    const movie_id = getMovieIdFromURL();
    const rawMovieData = await fetchMovieObj(movie_id);

    if (!rawMovieData) {
      showErrorMessage();
      return;
    }

    const movieData = filterMovieData(rawMovieData);

    if (!movieData) {
      showErrorMessage();
      console.warn("Movie object is empty. Cannot filter movie info");
      return;
    }

    renderMovie(movieData);
  } catch (error) {
    console.error("Error during movie processing:", error);
    showErrorMessage();
  }
}

function renderMovie(movieData) {
  try {
    const movieContainer = document.getElementById("movie");

    movieContainer.setAttribute("data-id", movieData.id);

    const bannerElem = createMovieBannerElem(movieData);

    const infoBlockElem = createInfoBlock(movieData);

    movieContainer.append(bannerElem, infoBlockElem);

    changeBannerBG(movieData);
  } catch (error) {
    console.error("Error during rendering movie:", error);
  }
}

function changeBannerBG(movieDescription) {
  const bannerElem = document.querySelector(`.${movieBlockName}banner`);
  const currentBg = getComputedStyle(bannerElem).backgroundImage;
  const imagePath =
    movieDescription.backdrop_path || movieDescription.poster_path;
  if (imagePath) {
    const baseUrl = movieDescription.backdrop_path
      ? baseBackdropUrl
      : basePosterUrl;
    const fullUrl = baseUrl + imagePath;

    if (isValidUrl(fullUrl)) {
      const updatedBg = currentBg.replace(
        /url\(["']?(.*?)["']?\)/,
        `url("${baseUrl + imagePath}")`
      );
      bannerElem.style.backgroundImage = updatedBg;
    }
  }
}

function showErrorMessage() {
  movieContainer.classList.add("error-msg");
  movieContainer.innerHTML = "Cannot load movie. Please, try again later";
}
