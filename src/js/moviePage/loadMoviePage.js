import { movieContainer } from "./movieVars";
import { getIdFromWindowLocation } from "../getCheckUrlData";
import { showErrorMsg } from "../errorMsg";
import { fetchMovieObj, filterMovieData } from "./getMovieData";
import {
  createMovieBannerElem,
  changeBannerBG,
} from "../movieBanner/movieBannerSetUp";
import { pasteToContent } from "./updateContentSection";
import { pasteToFacts } from "./updateFactsSection";
import { handleFullMovieClick } from "./moviePageClickHadlers";

export async function loadMoviePage() {
  try {
    const movie_id = getIdFromWindowLocation();
    const rawMovieData = await fetchMovieObj(movie_id);

    if (!rawMovieData) {
      showErrorMsg(document.querySelector(".error-msg"), movieContainer);
      return;
    }

    const movieData = filterMovieData(rawMovieData);

    if (!movieData) {
      showErrorMsg(document.querySelector(".error-msg"), movieContainer);
      console.warn("Movie object is empty. Cannot filter movie info");
      return;
    }

    renderMovie(movieData);
  } catch (error) {
    console.error("Error during movie processing:", error);
    showErrorMsg(document.querySelector(".error-msg"), movieContainer);
  }
}

function renderMovie(movieData) {
  const bannerElem = createMovieBannerElem(movieData);
  movieContainer.prepend(bannerElem);

  pasteToContent(movieData);
  pasteToFacts(movieData);

  changeBannerBG(bannerElem, movieData);

  movieContainer.addEventListener("click", handleFullMovieClick);
}
