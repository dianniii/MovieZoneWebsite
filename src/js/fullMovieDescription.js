const movieContainer = document.getElementById("movie");
let movie_id = "27205";
// let movie_id = "1";
const domenPartUrl = "https://movies.gila.workers.dev";
const pathForFullMovieDescription = "/search/movie/description?";
const searchParameters = `movie_id=${movie_id}`;
const blockName = "full-movie__";

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

const classesBanner = {
  banner: `${blockName}banner`,
  title: `${blockName}title`,
  tagline: [`${blockName}tagline`, `${blockName}feature`],
  controlBar: `${blockName}control-bar`,
  button: `${blockName}banner-btn`,
  icon: `${blockName}banner-icon`,
};

const idS = {
  likeBtnId: "likeMovieBtn",
  addBtnId: "addMovieBtn",
  hiddenCastPart: "castAdditionalPart",
  castBtnId: "castMovieBtn";
};

function createElementWithProps(tag, className, id = false, text = false) {
  const element = document.createElement(tag);

  Array.isArray(classNames)
    ? className.forEach((name) => element.classList.add(name))
    : element.classList.add(className);

  id && element.setAttribute("id", id); //&& возвращает первое ложное или, если оба истины, последнее истинное
  if (text) element.textContent = text;

  return element;
}

//this fun should be used only if castArr length > 5
function splitAndJoinCastArr(castArr) {
  const firstFiveArr = castArr.slice(0, 5);
  const firstFiveStr = firstFiveArr.join(", ");
  const restArr = castArr.slice(5);
  const restStr = restArr.join(", ");
  return [firstFiveStr, restStr];
}

function getLanguageName(languageArr) {
  const languageNames = [];
  languageArr.forEach((language) => languageNames.push(language.english_name));
  return languageNames;
}

function createImgElem(className, src, alt) {
  const imgElem = createElementWithClassId("img", className);
  imgElem.setAttribute("src", src);
  imgElem.setAttribute("alt", alt);
  return imgElem;
}

function createArrOfLi(arr) {
  const liElements = [];
  arr.forEach((item) => {
    const liElem = createElementWithClassId("li", `${blockName}list-item`);
    liElem.textContent = item;
    liElements.push(liElem);
  });
  return liElements;
}

function createMovieBannerElem(movieDescription) {
  const bannerElem = createElementWithClass("div", `${blockName}__banner`);

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

  const likeBtnElem = createButtonWithIcon(idS.button, likeIconPath, "like icon")

  const addBtnElem = createButtonWithIcon(idS.button, addIconPath, "plus icon")

  controlBarElem.append(likeBtnElem, addBtnElem);

  return controlBarElem;
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

  if (!movieData) {
    return;
  }

  const movieDescriptionObj = Object.fromEntries(
    Object.entries(movieData).filter((arr) => propertyNames.includes(arr[0]))
  );
  //   console.log(movieDescriptionObj);
  return movieDescriptionObj;
}

filterMovieData();
