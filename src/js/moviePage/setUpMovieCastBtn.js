export function toggleCastElementLength(evt) {
  const castFullMovieBtn = evt.target;
  const castPart = document.getElementById("castAdditionalPart");
  const castHiddenClassName = "full-movie__feature-value--hidden";
  castPart.classList.toggle(castHiddenClassName);

  if (castPart.classList.contains(castHiddenClassName)) {
    castFullMovieBtn.textContent = "see more...";
  } else {
    castFullMovieBtn.textContent = "see less";
  }
}
