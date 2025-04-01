import { baseBackdropUrl, basePosterUrl } from "../commonVars";
import { isValidUrl } from "../getCheckUrlData";
import { classesBanner } from "./bannerVars";
import { createElementWithProps } from "../elementCreation";
import { createControlBarElem } from "../controlBar/createControlBar";

export function createMovieBannerElem(movieDescription) {
  const bannerElem = createElementWithProps("div", classesBanner.banner);
  bannerElem.dataset.id = movieDescription.id;
  const titleElem = createTitleBannerElem(movieDescription);
  bannerElem.append(titleElem);

  if (movieDescription.tagline) {
    const taglineElem = createElementWithProps(
      "p",
      classesBanner.tagline,
      false,
      movieDescription.tagline
    );

    bannerElem.append(taglineElem);
  }

  bannerElem.append(createControlBarElem(movieDescription));
  return bannerElem;
}

function createTitleBannerElem(movieDescription) {
  const titleElem = createElementWithProps(
    "h1",
    classesBanner.title,
    false,
    movieDescription.title || "Unknown"
  );
  return titleElem;
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
