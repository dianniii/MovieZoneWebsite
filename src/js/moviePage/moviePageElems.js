import {
  movieBlockName,
  classesBanner,
  likeIconPath,
  addIconPath,
  idS,
  classesInfo,
  tmbdUrl,
  TMBDIconPath,
  filmIconPath,
} from "./movieVars";

import {
  createElementWithProps,
  createButtonWithIcon,
  createListElem,
  createLinkWithIcon,
  getMovieId,
} from "./movieUtils";

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

  bannerElem.append(createControlBarElem());
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

function createControlBarElem() {
  const controlBarElem = createElementWithProps(
    "div",
    classesBanner.controlBar
  );

  const likeBtnElem = createButtonWithIcon(
    idS.likeBtnId,
    classesBanner.button,
    classesBanner.icon,
    likeIconPath,
    "like icon"
  );

  const addBtnElem = createButtonWithIcon(
    idS.addBtnId,
    classesBanner.button,
    classesBanner.icon,
    addIconPath,
    "plus icon"
  );

  controlBarElem.append(likeBtnElem, addBtnElem);

  return controlBarElem;
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

  const subtitleElem = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    directors.length > 1 ? "Directors:" : "Director:"
  );

  const parElem = createElementWithProps(
    "p",
    classesInfo.featureVal,
    false,
    directors.join(", ")
  );

  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createCastElem(movieDescription) {
  let cast = ["Unknown"];
  if (movieDescription.cast && movieDescription.cast.length)
    cast = movieDescription.cast;
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    "Cast:"
  );
  const parElem = createElementWithProps("p", classesInfo.featureVal, false);
  if (cast.length > 5) {
    const [firstPart, secondPart] = splitAndJoinCastArr(cast);
    const shownCastElem = createElementWithProps(
      "span",
      classesInfo.shownCast,
      false,
      firstPart + ", "
    );
    const hiddenCastElem = createElementWithProps(
      "span",
      classesInfo.hiddenCast,
      idS.hiddenCastPart,
      secondPart + " "
    );
    const castBtn = createElementWithProps(
      "button",
      classesInfo.castBtn,
      idS.castBtn,
      "see more..."
    );
    parElem.append(shownCastElem, hiddenCastElem, castBtn);
  } else {
    parElem.textContent = cast.join(", ");
  }
  featureElem.append(subtitleElem, parElem);
  return featureElem;
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
  const subtitleElem = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    "Description:"
  );
  const parElem = createElementWithProps(
    "p",
    classesInfo.featureVal,
    false,
    description
  );
  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createGenresElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    "Genres: "
  );

  let genres = ["Unknown"];
  if (movieDescription.genres && movieDescription.genres.length) {
    genres = getGenreNames(movieDescription.genres);
  }

  const genreLstElem = createListElem(genres);
  featureElem.append(subtitleElem, genreLstElem);
  return featureElem;
}

function getGenreNames(genres) {
  const genreNames = [];
  genres.forEach((genre) => genreNames.push(genre.name));
  return genreNames;
}

function createLinksElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createElementWithProps("h2", classesInfo.featureName);
  const parElem = createElementWithProps("p", classesInfo.links);
  const tmbdLinkElem = createLinkWithIcon(
    classesInfo.link,
    classesInfo.linkIcon,
    tmbdUrl + getMovieId,
    TMBDIconPath,
    "TMBD icon"
  );
  parElem.append(tmbdLinkElem);
  const homepageUrl = movieDescription.homepage;
  if (homepageUrl) {
    const homepageLinkElem = createLinkWithIcon(
      classesInfo.link,
      classesInfo.linkIcon,
      homepageUrl,
      filmIconPath,
      "film icon"
    );
    parElem.append(homepageLinkElem);
  }
  featureElem.append(subtitleElem, parElem);
  return featureElem;
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
  const subtitleElem = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    "Release Year:"
  );
  const releaseDate = movieDescription.release_date;
  const year = releaseDate ? releaseDate.slice(0, 4) : "Unknown";
  const parElem = createElementWithProps(
    "p",
    classesInfo.featureVal,
    false,
    year
  );
  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createCountryElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  let countryArr = movieDescription.origin_country;

  const subtitleElem = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    countryArr.length < 2 ? "Country:" : "Countries:"
  );

  const parElem = createElementWithProps(
    "p",
    classesInfo.featureVal,
    false,
    countryArr.length ? countryArr.join(" ") : "Unknown"
  );

  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createLanguageElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);

  const languages = movieDescription.spoken_languages;
  const languageNamesArr = getLanguageNames(languages);
  const subtitleElem = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    languageNamesArr.length < 2 ? "Language:" : "Languages:"
  );
  const listElem = createListElem(languageNamesArr);
  featureElem.append(subtitleElem, listElem);
  return featureElem;
}

function getLanguageNames(languages) {
  const languageNames = [];
  languages.forEach((language) => languageNames.push(language.english_name));
  return languageNames;
}

function createDurationElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    "Duration:"
  );
  const duration = movieDescription.runtime;

  const parElem = createElementWithProps(
    "p",
    classesInfo.featureVal,
    false,
    duration ? duration + " min." : "Unknown"
  );
  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createRatingElem(movieDescription) {
  const featureElem = createElementWithProps("div", classesInfo.feature);
  const subtitleElem = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    "TMBD Rating:"
  );
  const rating = movieDescription.vote_average;
  const parElem = createElementWithProps(
    "p",
    classesInfo.featureVal,
    false,
    rating ? rating.toFixed(1) : "Unknown"
  );
  featureElem.append(subtitleElem, parElem);
  return featureElem;
}
