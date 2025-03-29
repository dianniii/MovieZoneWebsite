import {
  fetchPopularMovies,
  getRandomMovieWithBackdrop,
} from "./fetchRandomMovie";
import { createMovieBannerElem } from "../moviePage/createMoviePageElems";
import { movieBlockName } from "../moviePage/movieVars";
import { changeBannerBG } from "../moviePage/loadMoviePage";
import { classesControlBar } from "../controlBar/controlBarVars";

export async function renderMovieBanner() {
  try {
    const movies = await fetchPopularMovies();
    const movie = getRandomMovieWithBackdrop(movies);

    const bannerElem = createMovieBannerElem(movie, movieBlockName);

    const header = document.querySelector(".header");
    header.append(bannerElem);

    changeBannerBG(bannerElem, movie);
    bannerElem.addEventListener("click", (evt) =>
      bannerClickHandling(evt, movie.id)
    );
  } catch (error) {
    console.error(error);
    return;
  }
}

function bannerClickHandling(evt, movie_id) {
  const controlBar = evt.target.closest("." + classesControlBar.controlBar);
  const clickOnBar =
    controlBar && controlBar.classList.contains(classesControlBar.controlBar);

  if (!clickOnBar) {
    window.location.href = `movie.html?id=${movie_id}`;
  }
}
