import { movieBlockName, movieContainer } from "./movieVars";
import { baseBackdropUrl, basePosterUrl } from "../commonVars";

import { isValidUrl, getIdFromWindowLocation } from "../getCheckUrlData";
import { fetchMovieObj, filterMovieData } from "./getMovieData";
import { createMovieBannerElem, createInfoBlock } from "./createMoviePageElems";
import { movieCardClickHandler } from "../movieCardClickHandler";

export async function loadMoviePage() {
  try {
    const movie_id = getIdFromWindowLocation();
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
    const bannerElem = createMovieBannerElem(movieData, movieBlockName);
    const infoBlockElem = createInfoBlock(movieData, movieBlockName);
    movieContainer.append(bannerElem, infoBlockElem);

    changeBannerBG(bannerElem, movieData);
    bannerElem.addEventListener("click", (evt) => movieCardClickHandler(evt));
  } catch (error) {
    console.error("Error during rendering movie:", error);
  }
}

export function changeBannerBG(bannerElem, movieDescription) {
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
