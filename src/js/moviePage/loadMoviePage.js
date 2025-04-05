import { pathForFullMovieDescription, websiteNameToAdd } from "../commonVars";
import { movieContainer } from "./movieVars";
import { getIdFromWindowLocation } from "../getCheckUrlData";
import { showErrorMsg } from "../errorMsg";
import { filterMovieData } from "./getMovieData";
import { fetchData } from "../fetchData";
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
    const rawMovieData = await fetchData(
      `${pathForFullMovieDescription}?movie_id=${movie_id}`
    );

    if (!rawMovieData) {
      showErrorMsg(movieContainer);
      return;
    }

    const movieData = filterMovieData(rawMovieData);

    if (!movieData) {
      showErrorMsg(movieContainer);
      console.warn("Movie object is empty. Cannot filter movie info");
      return;
    }

    changeDocName(movieData.title);
    renderMovie(movieData);
  } catch (error) {
    console.error("Error during movie processing:", error);
    showErrorMsg(movieContainer);
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

function changeDocName(title) {
  if (title) {
    document.title = `${title}${websiteNameToAdd}`;
  }
}
