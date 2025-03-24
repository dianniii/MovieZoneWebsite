export const movieContainer = document.getElementById("movie");
export let movie_id = "19";
export const domenPartUrl = "https://movies.gila.workers.dev";
export const pathForFullMovieDescription = "/search/movie/description?";
export const searchParameters = `movie_id=${movie_id}`;

export const tmbdUrl = `https://www.themoviedb.org/movie/`;

export const baseBackdropUrl = "https://image.tmdb.org/t/p/original";
export const basePosterUrl =
  "https://media.themoviedb.org/t/p/w220_and_h330_face";

export const movieBlockName = "full-movie__";
export const likeIconPath = "./public/icons/likeIcon.svg";
export const addIconPath = "./public/icons/plusIcon.svg";
export const TMBDIconPath = "./public/icons/TMBD.svg";
export const filmIconPath = "./public/icons/filmIcon.svg";

export const propertyNames = [
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
  "runtime",
  "cast", // (array)
  "directors", // (array)
];

export const idS = {
  likeBtnId: "likeMovieBtn",
  addBtnId: "addMovieBtn",
  shownCastPart: "castMainPart",
  hiddenCastPart: "castAdditionalPart",
  castBtn: "castMovieBtn",
};

export const classesBanner = {
  banner: `${movieBlockName}banner`,
  title: `${movieBlockName}title`,
  tagline: [`${movieBlockName}tagline`, `${movieBlockName}feature`],
  controlBar: `${movieBlockName}control-bar`,
  button: `${movieBlockName}banner-btn`,
  icon: `${movieBlockName}banner-icon`,
};

export const lstClasses = {
  lst: [`${movieBlockName}lst`, `${movieBlockName}feature-value`],
  items: `${movieBlockName}lst-item`,
};

export const classesInfo = {
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
