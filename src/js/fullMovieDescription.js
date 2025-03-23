const movieData = {
  adult: false,
  backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
  belongs_to_collection: null,
  budget: 160000000,
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 12,
      name: "Adventure",
    },
  ],
  homepage: "https://www.warnerbros.com/movies/inception",
  id: 27205,
  imdb_id: "tt1375666",
  origin_country: ["US", "GB"],
  original_language: "en",
  original_title: "Inception",
  overview:
    "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
  popularity: 24.5,
  poster_path: "/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
  production_companies: [
    {
      id: 923,
      logo_path: "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
      name: "Legendary Pictures",
      origin_country: "US",
    },
    {
      id: 9996,
      logo_path: "/3tvBqYsBhxWeHlu62SIJ1el93O7.png",
      name: "Syncopy",
      origin_country: "GB",
    },
    {
      id: 174,
      logo_path: "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
      name: "Warner Bros. Pictures",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "GB",
      name: "United Kingdom",
    },
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: "2010-07-15",
  revenue: 839030630,
  runtime: 148,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
    {
      english_name: "French",
      iso_639_1: "fr",
      name: "Français",
    },
    {
      english_name: "Japanese",
      iso_639_1: "ja",
      name: "日本語",
    },
    {
      english_name: "Swahili",
      iso_639_1: "sw",
      name: "Kiswahili",
    },
  ],
  status: "Released",
  tagline: "Your mind is the scene of the crime.",
  title: "Inception",
  video: false,
  vote_average: 8.4,
  vote_count: 37210,
  cast: [
    "Leonardo DiCaprio",
    "Joseph Gordon-Levitt",
    "Ken Watanabe",
    "Tom Hardy",
    "Elliot Page",
    "Dileep Rao",
    "Cillian Murphy",
    "Tom Berenger",
    "Marion Cotillard",
    "Pete Postlethwaite",
    "Michael Caine",
    "Lukas Haas",
    "Talulah Riley",
    "Tohoru Masamune",
    "Taylor Geare",
    "Claire Geare",
    "Johnathan Geare",
    "Yuji Okumoto",
    "Earl Cameron",
    "Ryan Hayward",
    "Miranda Nolan",
    "Russ Fega",
    "Tim Kelleher",
    "Coralie Dedykere",
    "Silvie Laguna",
    "Virgile Bramly",
    "Nicolas Clerc",
    "Jean-Michel Dagory",
    "Marc Raducci",
    "Tai-Li Lee",
    "Magnus Nolan",
    "Helena Cullinan",
    "Mark Fleischmann",
    "Shelley Lang",
    "Adam Cole",
    "Jack Murray",
    "Kraig Thornber",
    "Angela Nathenson",
    "Natasha Beaumont",
    "Carl Gilliard",
    "Jill Maddrell",
    "Alex Lombard",
    "Nicole Pulliam",
    "Peter Basham",
    "Michael Gaston",
    "Felix Scott",
    "Andrew Pleavin",
    "Lisa Reynolds",
    "Jason Tendell",
    "Jack Gilroy",
    "Shannon Welles",
    "Daniel Girondeaud",
  ],
  directors: ["Christopher Nolan"],
};

const movieContainer = document.getElementById("movie");
let movie_id = "27205";
// let movie_id = "1";
const domenPartUrl = "https://movies.gila.workers.dev";
const pathForFullMovieDescription = "/search/movie/description?";
const searchParameters = `movie_id=${movie_id}`;

const tmbdUrl = `https://www.themoviedb.org/movie/${movie_id}`;

const baseBackdropUrl = "https://image.tmdb.org/t/p/original/";
const basePosterUrl = "https://media.themoviedb.org/t/p/w220_and_h330_face/";

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
  castBtn: "castMovieBtn",
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
  facts: `${movieBlockName}facts`,
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

function changeBannerBG(movieDescription) {
  const bannerElem = document.querySelector(`.${movieBlockName}banner`);
  const currentBg = getComputedStyle(bannerElem).backgroundImage;
  const imagePath =
    movieDescription.backdrop_path || movieDescription.poster_path;
  if (imagePath) {
    const baseUrl = movieDescription.backdrop_path
      ? baseBackdropUrl
      : baseBackdropUrl;
    const updatedBg = currentBg.replace(
      /url\(["']?(.*?)["']?\)/,
      `url("${baseUrl + imagePath}")`
    );
    bannerElem.style.backgroundImage = updatedBg;
  }
}

function createElementWithProps(tag, className, id = false, text = false) {
  const element = document.createElement(tag);

  Array.isArray(className)
    ? className.forEach((name) => element.classList.add(name))
    : element.classList.add(className);

  id && element.setAttribute("id", id); //&& возвращает первое ложное или, если оба истины, последнее истинное
  if (text) element.textContent = text;

  return element;
}

function createImgElem(className, src, alt) {
  const imgElem = createElementWithProps("img", className);
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

//this fun should be used only if castArr length > 5
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
  const tmbdLinkElem = createLinkWithIcon(tmbdUrl, TMBDIconPath, "TMBD icon");
  parElem.append(tmbdLinkElem);
  const homepageUrl = movieDescription.homepage;
  if (homepageUrl) {
    const homepageLinkElem = createLinkWithIcon(
      homepageUrl,
      filmIconPath,
      "film icon"
    );
    parElem.append(homepageLinkElem);
  }
  featureElem.append(subtitleElem, parElem);
  return featureElem;
}

function createLinkWithIcon(href, iconSrc, alt) {
  const linkElem = createElementWithProps("a", classesInfo.link);
  linkElem.setAttribute("target", "_blank");
  linkElem.setAttribute("href", href);
  const iconElem = createImgElem(classesInfo.linkIcon, iconSrc, alt);
  linkElem.append(iconElem);
  return linkElem;
}

function createListElem(arr) {
  const lstElem = createElementWithProps("ul", lstClasses.lst);
  arr.forEach((item) => {
    const liElem = createElementWithProps("li", lstClasses.items, false, item);
    lstElem.append(liElem);
    console.log("append!");
  });
  return lstElem;
}

function getLanguageNames(languages) {
  const languageNames = [];
  languages.forEach((language) => languageNames.push(language.english_name));
  return languageNames;
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

// document.getElementById("pasteTo").append(createFactsSection(movieData));

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
  console.log(movieDescriptionObj);
  return movieDescriptionObj;
}

filterMovieData();
