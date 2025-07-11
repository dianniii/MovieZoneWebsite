import { fullPropertylist, shortPropertyList } from "../commonVars";

export function filterMovieData(movieData) {
  if (!movieData || Object.keys(movieData).length === 0) {
    console.error("Error: Movie data is empty.");
    return null;
  }

  const movieDescriptionObj = Object.fromEntries(
    Object.entries(movieData).filter(([key, value]) =>
      fullPropertylist.includes(key)
    )
  );

  return movieDescriptionObj;
}

export function makeShortMovieData(movieData) {
  const shortMovieData = {};
  const movieKeyValArr = Object.entries(movieData);
  for (const [key, value] of movieKeyValArr) {
    if (shortPropertyList.includes(key)) {
      shortMovieData[key] = value;
    }
  }
  return shortMovieData;
}

export function saveShortMovieInfo(elem, movieData) {
  const shortMovieData = makeShortMovieData(movieData);
  elem.dataset.movie = JSON.stringify(shortMovieData);
}
