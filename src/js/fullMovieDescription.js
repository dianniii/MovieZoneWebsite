const movieContainer = document.getElementById("movie");
let movie_id = "27205";
// let movie_id = "1";
const domenPartUrl = "https://movies.gila.workers.dev";
const pathForFullMovieDescription = "/search/movie/description?";
const searchParameters = `movie_id=${movie_id}`;
const blockName = "full-movie__";

const likeIconPath = "./public/icons/likeIcon.svg";
const addMovieIconPath = "./public/icons/plusIcon.svg";
const TMBDIconPath = "./public/icons/TMBD.svg";
const filmIconPath = "./public/icons/filmIcon.svg";

const classNames = {
  banner: "full-movie__banner",
  title: "full-movie__title",
  tagline: ["full-movie__tagline", "full-movie__feature"],
  controlBar: "full-movie__control-bar",
};

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

function createElementWithClassId(tag, className, id = false) {
  const element = document.createElement(tag);

  if (Array.isArray(className)) {
    element.classList.add(className);
  } else {
    className.forEach((name) => element.classList.add(name));
  }

  if (id) {
    element.setAttribute("id", id);
  }

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

// function createMovieBanner(movieData) {
//   const banner = createElementWithClass("div", classNames.banner);
// }

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
