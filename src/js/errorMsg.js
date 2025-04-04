export function showErrorMsg(toHideElem) {
  const errorElem = document.querySelector(".error-msg");
  errorElem.style.display = "block";
  toHideElem.style.display = "none";
}
