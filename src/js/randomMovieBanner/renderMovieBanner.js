import {
  fetchPopularMovies,
  getRandomMovieWithBackdrop,
} from "./fetchRandomMovie";
import {
  createMovieBannerElem,
  changeBannerBG,
} from "../movieBanner/movieBannerSetUp";
import { movieCardClickHandler } from "../movieCardClickHandler";

export async function renderMovieBanner() {
  try {
    const movies = await fetchPopularMovies();
    const movie = getRandomMovieWithBackdrop(movies);

    const bannerElem = createMovieBannerElem(movie);

    const header = document.querySelector(".header");
    header.append(bannerElem);
    bannerElem.addEventListener("click", movieCardClickHandler);

    changeBannerBG(bannerElem, movie);
  } catch (error) {
    console.error(error);
  }
}
