import {
  fetchPopularMovies,
  getRandomMovieWithBackdrop,
} from "./fetchRandomMovie";
import { createMovieBannerElem } from "../moviePage/createMoviePageElems";
import { movieBlockName } from "../moviePage/movieVars";
import { changeBannerBG } from "../moviePage/loadMoviePage";
import { movieCardClickHandler } from "../movieCardClickHandler";

export async function renderMovieBanner() {
  try {
    const movies = await fetchPopularMovies();
    const movie = getRandomMovieWithBackdrop(movies);

    const bannerElem = createMovieBannerElem(movie, movieBlockName);

    const header = document.querySelector(".header");
    header.append(bannerElem);
    bannerElem.addEventListener("click", () => movieCardClickHandler());

    changeBannerBG(bannerElem, movie);
  } catch (error) {
    console.error(error);
  }
}
