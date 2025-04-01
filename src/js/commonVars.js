export const tmbdUrl = `https://www.themoviedb.org/movie/`;
export const baseBackdropUrl = "https://image.tmdb.org/t/p/original";
export const basePosterUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";

//reverse server
export const domenPartUrl = "https://movies.gila.workers.dev";
//reverse server paths
export const pathForAllGenres = "/genres";
export const pathForSearchByGenre = "/search/genre";
export const pathForFullMovieDescription = "/search/movie/description";
export const pathForSearchByTitle = "/search/movie/byTitle";
export const pathForSearchById = "/search/movie/byId";
export const pathForPopularMovies = "/popular";

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
