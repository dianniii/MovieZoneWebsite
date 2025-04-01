import { movieBlockName, movieContainer } from "./movieVars";
import { getIdFromWindowLocation } from "../getCheckUrlData";
import { fetchMovieObj, filterMovieData } from "./getMovieData";
import { createInfoBlock } from "./createMoviePageElems";
import {
  createMovieBannerElem,
  changeBannerBG,
} from "../movieBanner/movieBannerSetUp";
import { handleFullMovieClick } from "./moviePageClickHadlers";

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
  //тут будем не создавать, а вставлять текст в уже готовые элементы
  const infoBlockElem = createInfoBlock(movieData, movieBlockName);
  // тут будем prepend banner
  movieContainer.append(bannerElem, infoBlockElem);

  changeBannerBG(bannerElem, movieData);

  movieContainer.addEventListener("click", handleFullMovieClick);
}

function showErrorMessage() {
  movieContainer.classList.add("error-msg");
  movieContainer.innerHTML = "Cannot load movie. Please, try again later";
}

// function showErrorMsg() {
//   const errorElem = document.querySelector(".error-msg");
//   errorElem.style.display = "block";
//   movieContainer.style.display = "none";
// }
