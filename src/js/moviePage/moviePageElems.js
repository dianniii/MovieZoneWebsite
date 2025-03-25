import {
  movieBlockName,
  classesBanner,
  castIds,
  classesInfo,
  tmbdUrl,
  iconPaths,
} from "./movieVars";

import {
  createElementWithProps,
  createListElem,
  createLinkWithIcon,
  extractNames,
} from "./movieUtils";

import { createControlBarElem } from "./createControlBar";

export function createMovieBannerElem(movieDescription) {
  const bannerElem = createElementWithProps("div", `${movieBlockName}banner`);

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
  titleElem.setAttribute("data-id", movieDescription.id);
  return titleElem;
}

export function createInfoBlock(movieDescription) {
  const infoBlockElem = createElementWithProps("div", `${movieBlockName}info`);
  const contentSectionElem = createContentSection(movieDescription);
  const factsSectionElem = createFactsSection(movieDescription);
  infoBlockElem.append(contentSectionElem, factsSectionElem);
  return infoBlockElem;
}

function createContentSection(movieDescription) {
  const contentSectionElem = createElementWithProps(
    "section",
    classesInfo.content
  );

  const directorContainer = createDirectorElem(movieDescription);
  const castContainer = createCastElem(movieDescription);
  const descriptionContainer = createDescriptionElem(movieDescription);
  const genreContainer = createGenresElem(movieDescription);
  const linksContainer = createLinksElem(movieDescription);

  contentSectionElem.append(
    directorContainer,
    castContainer,
    descriptionContainer,
    genreContainer,
    linksContainer
  );
  return contentSectionElem;
}

function createDirectorElem(movieDescription) {
  let directors = ["Unknown"];
  if (movieDescription.directors && movieDescription.directors.length) {
    directors = movieDescription.directors;
  }

  const featureElem = createElementWithProps("div", classesInfo.feature);

  const subtitleElem = createFeatureNameElem(
    directors.length > 1 ? "Directors:" : "Director:"
  );

  const parElem = createFeatureValElem(false, directors.join(", "));

  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createCastElem(movieDescription) {
  const cast = getCastList(movieDescription);

  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createFeatureNameElem("Cast:");
  const parElem = createCastContent(cast);
  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function getCastList(movieDescription) {
  return movieDescription.cast && movieDescription.cast.length
    ? movieDescription.cast
    : ["Unknown"];
}

function createCastContent(cast) {
  const parElem = createFeatureValElem();

  if (cast.length > 5) {
    const [firstPart, secondPart] = splitAndJoinCastArr(cast);
    parElem.append(
      createElementWithProps(
        "span",
        classesInfo.shownCast,
        false,
        firstPart + ", "
      ),
      createElementWithProps(
        "span",
        classesInfo.hiddenCast,
        castIds.hiddenCastPart,
        secondPart + " "
      ),
      createElementWithProps(
        "button",
        classesInfo.castBtn,
        castIds.castBtn,
        "see more..."
      )
    );
  } else {
    parElem.textContent = cast.join(", ");
  }

  return parElem;
}

function splitAndJoinCastArr(castArr) {
  const firstFiveArr = castArr.slice(0, 5);
  const firstFiveStr = firstFiveArr.join(", ");
  const restArr = castArr.slice(5);
  const restStr = restArr.join(", ");
  return [firstFiveStr, restStr];
}

function createDescriptionElem(movieDescription) {
  const description = movieDescription.overview || "Unknown";
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createFeatureNameElem("Description:");

  const parElem = createFeatureValElem(false, description);

  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createGenresElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createFeatureNameElem("Genres:");

  let genres = ["Unknown"];
  if (movieDescription.genres && movieDescription.genres.length) {
    genres = extractNames(movieDescription.genres, "name");
  }

  const genreLstElem = createListElem(genres);
  featureElem.append(subtitleElem, genreLstElem);
  return featureElem;
}

function createLinksElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createFeatureNameElem("Links:");

  const parElem = createLinksContent(movieDescription);
  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createLinksContent(movieDescription) {
  const parElem = createFeatureValElem(true, false);
  const tmbdLinkElem = createLinkWithIcon(
    classesInfo.link,
    classesInfo.linkIcon,
    tmbdUrl + movieDescription.id,
    iconPaths.TMBDIcon,
    "TMBD icon"
  );
  parElem.append(tmbdLinkElem);

  if (movieDescription.homepage) {
    const homepageLinkElem = createLinkWithIcon(
      classesInfo.link,
      classesInfo.linkIcon,
      movieDescription.homepage,
      iconPaths.filmIcon,
      "film icon"
    );
    parElem.append(homepageLinkElem);
  }
  return parElem;
}

function createFactsSection(movieDescription) {
  const factsSectionElem = createElementWithProps("section", classesInfo.facts);

  const yearContainer = createYearElem(movieDescription);
  const countryContainer = createCountryElem(movieDescription);
  const languagesContainer = createLanguageElem(movieDescription);
  const durationContainer = createDurationElem(movieDescription);
  const ratingContainer = createRatingElem(movieDescription);

  factsSectionElem.append(
    yearContainer,
    countryContainer,
    languagesContainer,
    durationContainer,
    ratingContainer
  );
  return factsSectionElem;
}

function createYearElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createFeatureNameElem("Release Year:");

  const releaseDate = movieDescription.release_date;
  const year = releaseDate ? releaseDate.slice(0, 4) : "Unknown";
  const parElem = createFeatureValElem(false, year);
  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createCountryElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  let countryArr = movieDescription.origin_country;

  const subtitleElem = createFeatureNameElem(
    countryArr.length < 2 ? "Country:" : "Countries:"
  );

  const parElem = createFeatureValElem(
    false,
    countryArr.length ? countryArr.join(", ") : "Unknown"
  );

  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createLanguageElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);

  const languageNamesArr = extractNames(
    movieDescription.spoken_languages,
    "english_name"
  );

  const subtitleElem = createFeatureNameElem(
    languageNamesArr.length < 2 ? "Language:" : "Languages:"
  );

  const listElem = createListElem(languageNamesArr);
  featureElem.append(subtitleElem, listElem);
  return featureElem;
}

function createDurationElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createFeatureNameElem("Duration:");
  const duration = movieDescription.runtime;

  const parElem = createFeatureValElem(
    false,
    duration ? duration + " min." : "Unknown"
  );
  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createRatingElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createFeatureNameElem("TMBD Rating:");

  const rating = movieDescription.vote_average;
  const parElem = createFeatureValElem(
    false,
    rating ? rating.toFixed(1) : "Unknown"
  );
  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createFeatureNameElem(text) {
  return createElementWithProps("h2", classesInfo.featureName, false, text);
}

function createFeatureValElem(ifLinks = false, text = false) {
  if (text) {
    return createElementWithProps("p", classesInfo.featureVal, false, text);
  }
  const classNames = ifLinks ? classesInfo.links : classesInfo.featureVal;
  return createElementWithProps("p", classNames);
}
