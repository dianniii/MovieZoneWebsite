export const movieContainer = document.getElementById("movie");

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
const movieBanner = "movie-banner";
const bannerBlockName = movieBanner + "__";

export const classesBanner = {
  banner: `${movieBanner}`,
  title: `${bannerBlockName}title`,
  tagline: [`${bannerBlockName}tagline`, `${movieBlockName}feature`],
  controlBar: `${bannerBlockName}control-bar`,
  button: `${bannerBlockName}banner-btn`,
  icon: `${bannerBlockName}banner-icon`,
};

export const lstClasses = {
  lst: [`${movieBlockName}lst`, `${movieBlockName}feature-value`],
  items: `${movieBlockName}lst-item`,
  genreItems: [`${movieBlockName}lst-item`, `${movieBlockName}genre`],
};

export const classesInfo = {
  content: `${movieBlockName}content`,
  facts: `${movieBlockName}facts`,
  feature: `${movieBlockName}feature`,
  featureName: `${movieBlockName}feature-name`,
  featureVal: `${movieBlockName}feature-value`,
  genre: `${movieBlockName}genre`,
  shownCast: `${movieBlockName}feature-value--shown`,
  hiddenCast: `${movieBlockName}feature-value--hidden`,
  castBtn: `${movieBlockName}cast-btn`,
  links: [`${movieBlockName}feature-value`, `${movieBlockName}links`],
  link: `${movieBlockName}link`,
  linkIcon: `${movieBlockName}link-icon`,
  facts: `${movieBlockName}facts`,
};
