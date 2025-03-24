import {
  domenPartUrl,
  pathForFullMovieDescription,
  propertyNames,
} from "./vars.js";

export async function fetchMovieObj(movie_id) {
  try {
    const searchParameters = `movie_id=${movie_id}`;
    let response = await fetch(
      domenPartUrl + pathForFullMovieDescription + searchParameters
    );

    if (!response.ok) {
      console.log("Cannot fetch data form the server");
      throw new Error("HTTP Error: " + response.status);
    }

    let movieData;
    try {
      movieData = await response.json();
    } catch (jsonError) {
      throw new Error("Cannot parse JSON: " + jsonError.message);
    }

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
    Object.entries(movieData).filter((arr) => propertyNames.includes(arr[0]))
  );

  return movieDescriptionObj;
}
