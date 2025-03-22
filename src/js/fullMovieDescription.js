const movieContainer = document.getElementById("movie");
let movie_id = "27205";
// let movie_id = "1";
const domenPartUrl = "https://movies.gila.workers.dev";
const pathForFullMovieDescription = "/search/movie/description?";
const tmbdUrl = `https://www.themoviedb.org/movie/${movie_id}`;
const searchParameters = `movie_id=${movie_id}`;
const movieBlockName = "full-movie__";

const likeIconPath = "./public/icons/likeIcon.svg";
const addIconPath = "./public/icons/plusIcon.svg";
const TMBDIconPath = "./public/icons/TMBD.svg";
const filmIconPath = "./public/icons/filmIcon.svg";

const propertyNames = [
  "id",
  "title",
  "tagline",
  "backdrop_path",
  "genres", // (array)
  "homepage",
  "origin_country", // (array)
  "spoken_languages", //(array of objects, where we need english_name)
  "overview",
  "release_date",
  "vote_average",
  "cast", // (array)
  "directors", // (array)
];

const idS = {
  likeBtnId: "likeMovieBtn",
  addBtnId: "addMovieBtn",
  shownCastPart: "castMainPart",
  hiddenCastPart: "castAdditionalPart",
  castBtnId: "castMovieBtn",
};

const classesBanner = {
  banner: `${movieBlockName}banner`,
  title: `${movieBlockName}title`,
  tagline: [`${movieBlockName}tagline`, `${movieBlockName}feature`],
  controlBar: `${movieBlockName}control-bar`,
  button: `${movieBlockName}banner-btn`,
  icon: `${movieBlockName}banner-icon`,
};

const lstClasses = {
  lst: [`${movieBlockName}lst`, `${movieBlockName}feature-value`],
  items: `${movieBlockName}lst-item`,
};

const classesInfo = {
  content: `${movieBlockName}content`,
  feature: `${movieBlockName}feature`,
  featureName: `${movieBlockName}feature-name`,
  featureVal: `${movieBlockName}feature-value`,
  shownCast: `${movieBlockName}feature-value--shown`,
  hiddenCast: `${movieBlockName}feature-value--hidden`,
  castBtn: `${movieBlockName}cast-btn`,
  links: [`${movieBlockName}feature-value`, `${movieBlockName}links`],
  link: `${movieBlockName}link`,
  linkIcon: `${movieBlockName}link-icon`,
  facts: `${movieBlockName}facts`,
};

function createMovieBannerElem(movieDescription) {
  const bannerElem = createElementWithClass("div", `${movieBlockName}__banner`);

  const titleElem = createElementWithProps(
    "h1",
    classesBanner.title,
    false,
    movieDescription.title || "Unknown"
  );
  titleElem.setAttribute("data-id", movieDescription.id);
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
}

function createElementWithProps(tag, className, id = false, text = false) {
  const element = document.createElement(tag);

  Array.isArray(classNames)
    ? className.forEach((name) => element.classList.add(name))
    : element.classList.add(className);

  id && element.setAttribute("id", id); //&& возвращает первое ложное или, если оба истины, последнее истинное
  if (text) element.textContent = text;

  return element;
}

function getGenreNames(genres) {
  const genreNames = [];
  genres.forEach((genre) => genreNames.push(genre.name));
  return genreNames;
}

function getLanguageName(languages) {
  const languageNames = [];
  languages.forEach((language) => languageNames.push(language.english_name));
  return languageNames;
}

function createImgElem(className, src, alt) {
  const imgElem = createElementWithClassId("img", className);
  imgElem.setAttribute("src", src);
  imgElem.setAttribute("alt", alt);
  return imgElem;
}

function createButtonWithIcon(id, iconSrc, alt) {
  const btn = createElementWithProps("button", classesBanner.button, id);
  btn.append(createImgElem(classesBanner.icon, iconSrc, alt));
  return btn;
}

function createControlBarElem() {
  const controlBarElem = createElementWithProps(
    "div",
    classesBanner.controlBar
  );

  const likeBtnElem = createButtonWithIcon(
    idS.button,
    likeIconPath,
    "like icon"
  );

  const addBtnElem = createButtonWithIcon(idS.button, addIconPath, "plus icon");

  controlBarElem.append(likeBtnElem, addBtnElem);

  return controlBarElem;
}

function createInfoBlock(movieDescription) {
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

  // create directors element
  let directors = ["Unknown"];
  if (movieDescription.directors.length) directors = movieDescription.directors;
  const featureElem1 = createElementWithProps("div", classesInfo.feature);
  const subtitleElem1 = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    directors.length > 1 ? "Directors:" : "Director:"
  );
  const parElem1 = createElementWithProps(
    "p",
    classesInfo.featureVal,
    false,
    directors.join(", ")
  );
  contentSectionElem.append(featureElem1.append(subtitleElem1, parElem1));

  //create cast element
  let cast = ["Unknown"];
  if (movieDescription.cast.length) cast = movieDescription.cast;

  const featureElem2 = createElementWithProps("div", classesInfo.feature);
  const subtitleElem2 = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    "Cast:"
  );
  const parElem2 = createElementWithProps("p", classesInfo.featureVal, false);

  if (cast.length > 5) {
    const [firstPart, secondPart] = splitAndJoinCastArr(cast);
    const shownCastElem = createElementWithProps(
      "span",
      classesInfo.shownCast,
      false,
      firstPart
    );
    const hiddenCastElem = createElementWithProps(
      "span",
      classesInfo.hiddenCast,
      idS.hiddenCastPart,
      secondPart
    );
    const castBtn = createElementWithProps(
      "button",
      classesInfo.castBtn,
      idS.castBtnId,
      "see more..."
    );
    parElem2.append(shownCastElem, hiddenCastElem, castBtn);
  } else {
    parElem2.textContent = cast.join(", ");
  }

  contentSectionElem.append(featureElem2.append(subtitleElem2, parElem2));

  //create Description element
  const description = movieDescription.overview || "Unknown";
  const featureElem3 = createElementWithProps("div", classesInfo.feature);
  const subtitleElem3 = createElementWithProps(
    "h2",
    classesInfo.featureName,
    false,
    "Description:"
  );
  const parElem3 = createElementWithProps(
    "p",
    classesInfo.featureVal,
    false,
    description
  );
  contentSectionElem.append(featureElem3.append(subtitleElem3, parElem3));

  //create genres element
  const genres = getGenreNames(movieDescription.genres);
  if (genres.length) {
    const featureElem4 = createElementWithProps("div", classesInfo.feature);
    const subtitleElem4 = createElementWithProps(
      "h2",
      classesInfo.featureName,
      false,
      "Genres: "
    );
    const genreLst = createListElem(genres);
    contentSectionElem.append(featureElem4.append(subtitleElem4, genreLst));
  }

  //create links element
  const featureElem5 = createElementWithProps("div", classesInfo.feature);
  const subtitleElem5 = createElementWithProps("h2", classesInfo.featureName);
  const parElem5 = createElementWithProps("p", classesInfo.links);
  const tmbdLinkElem = createLinkWithIcon(tmbdUrl, TMBDIconPath, "TMBD icon");
  parElem5.append(tmbdLinkElem);
  const homepageUrl = movieDescription.homepage;
  if (homepageUrl) {
    const homepageLinkElem = createLinkWithIcon(
      homepageUrl,
      filmIconPath,
      "film icon"
    );
    parElem5.append(homepageLinkElem);
  }
  contentSectionElem.append(featureElem5.append(subtitleElem5, parElem5));
}

function createLinkWithIcon(href, iconSrc, alt) {
  const linkElem = createElementWithProps("a", classesInfo.link);
  link.setAttribute("target", "_blank");
  link.setAttribute("href", href);
  const iconElem = createImgElem(classesInfo.linkIcon, iconSrc, alt);
  linkElem.append(iconElem);
  return linkElem;
}

function createListElem(arr) {
  const lstElem = createElementWithProps("ul", lstClasses.lst);
  arr.forEach((item) => {
    const liElem = createElementWithClassId(
      "li",
      `${movieBlockName}list-item`,
      false,
      item
    );
    lstElem.append(liElem);
  });
  return lstElem;
}

//this fun should be used only if castArr length > 5
function splitAndJoinCastArr(castArr) {
  const firstFiveArr = castArr.slice(0, 5);
  const firstFiveStr = firstFiveArr.join(", ");
  const restArr = castArr.slice(5);
  const restStr = restArr.join(", ");
  return [firstFiveStr, restStr];
}

async function fetchMovieObj() {
  try {
    let response = await fetch(
      domenPartUrl + pathForFullMovieDescription + searchParameters
    );

    if (!response.ok) {
      throw new Error("Не удалось загрузить данные фильма");
    }

    const movieData = await response.json();
    // console.log(movieData);
    return movieData;
  } catch (error) {
    console.error("Ошибка:", error);
    movieContainer.innerHTML =
      "Произошла ошибка при загрузке данных. Попробуйте позже.";
    return null;
  }
}

async function filterMovieData() {
  const movieData = await fetchMovieObj();

  if (!movieData || Object.keys(movieData).length === 0) {
    return;
  }

  const movieDescriptionObj = Object.fromEntries(
    Object.entries(movieData).filter((arr) => propertyNames.includes(arr[0]))
  );
  //   console.log(movieDescriptionObj);
  return movieDescriptionObj;
}

filterMovieData();
