import {
  pathForFullMovieDescription,
  domenPartUrl,
  fullPropertylist,
  shortPropertyList,
} from "../commonVars";

export async function fetchMovieObj(movie_id) {
  try {
    const searchParameters = `?movie_id=${movie_id}`;
    let response = await fetch(
      domenPartUrl + pathForFullMovieDescription + searchParameters
    );

    if (!response.ok) {
      console.log("Cannot fetch data form the server");
      throw new Error("HTTP Error: " + response.status);
    }

    const movieData = await response.json();

    return movieData;
  } catch (error) {
    console.error("Error while loading movie information", error);
    return null;
  }
}

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
