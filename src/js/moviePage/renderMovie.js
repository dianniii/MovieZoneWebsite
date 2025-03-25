import {
  movieBlockName,
  movieContainer,
  baseBackdropUrl,
  basePosterUrl,
} from "./movieVars";
import { fetchMovieObj, filterMovieData } from "./movieData";
import { createMovieBannerElem, createInfoBlock } from "./moviePageElems";

export function loadMoviePage() {
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

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
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

  async function getAndShowMovie(movie_id) {
    try {
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

      const movieLoadedEvent = new CustomEvent("movieLoaded", {
        detail: movieData,
      });
      document.dispatchEvent(movieLoadedEvent);
    } catch (error) {
      console.error("Error during movie processing:", error);
      showErrorMessage();
      const movieErrorEvent = new CustomEvent("movieError", {
        detail: error.message,
      });
      document.dispatchEvent(movieErrorEvent);
    }
  }

  function showErrorMessage() {
    movieContainer.classList.add("error-msg");
    movieContainer.innerHTML = "Cannot load movie. Please, try again later";
  }

  // document.addEventListener("DOMContentLoaded", getAndShowMovie());
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    if (!movieId) {
      console.error("Movie ID is missing in the URL");
      return;
    }
    // sessionStorage.setItem("movie_id", movieId);
    getAndShowMovie(movieId);
  });
}
