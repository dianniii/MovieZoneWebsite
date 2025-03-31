import { movieBlockName, movieContainer } from "./movieVars";
import { getIdFromWindowLocation } from "../getCheckUrlData";
import { fetchMovieObj, filterMovieData } from "./getMovieData";
import { createInfoBlock } from "./createMoviePageElems";
import {
  createMovieBannerElem,
  changeBannerBG,
} from "../movieBanner/movieBannerSetUp";

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
  const movieContainer = document.getElementById("movie");
  const bannerElem = createMovieBannerElem(movieData);
  const infoBlockElem = createInfoBlock(movieData, movieBlockName);
  movieContainer.append(bannerElem, infoBlockElem);

  changeBannerBG(bannerElem, movieData);
  // bannerElem.addEventListener("click", (evt) => movieCardClickHandler(evt));
}

function showErrorMessage() {
  movieContainer.classList.add("error-msg");
  movieContainer.innerHTML = "Cannot load movie. Please, try again later";
}
