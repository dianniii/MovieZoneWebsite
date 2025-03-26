export const movieContainer = document.getElementById("movie");

export const domenPartUrl = "https://movies.gila.workers.dev";
export const pathForFullMovieDescription = "/search/movie/description?";

export const tmbdUrl = `https://www.themoviedb.org/movie/`;

export const baseBackdropUrl = "https://image.tmdb.org/t/p/original";
export const basePosterUrl =
  "https://media.themoviedb.org/t/p/w220_and_h330_face";

export const movieBlockName = "full-movie__";

export const iconPaths = {
  TMBDIcon: "/icons/TMBD.svg",
  filmIcon: "/icons/filmIcon.svg",
};

export const fullPropertylist = [
  "id",
  "title",
  "tagline",
  "backdrop_path",
  "poster_path",
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

export const shortPropertyList = [
  "id",
  "title",
  "poster_path",
  "overview",
  "release_date",
];

export const castIds = {
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

export const classesControlBar = {
  controlBar: "control-bar",
  btnFav: ["control-bar__btn", "fav-btn"],
  btnWatchlst: ["control-bar__btn", "watchlst-btn"],
  tooltipFav: ["control-bar__tooltip", "fav-tooltip"],
  tooltipWatchLst: ["control-bar__tooltip", "watchlst-tooltip"],
  icon: "control-bar__icon",
};

export const controlBarIconPaths = {
  likeIcon: "/icons/likeIcon.svg",
  dislikeIcon: "/icons/dislikeIcon.svg",
  addIcon: "/icons/addIcon.svg",
  removeIcon: "/icons/removeIcon.svg",
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
