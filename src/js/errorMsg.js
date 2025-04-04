export function showErrorMsg(toHideElem, text = false) {
  const errorElem = document.querySelector(".error-msg");
  errorElem.style.display = "block";
  toHideElem.style.display = "none";

  if (text) {
    errorElem.textContent = text;
  }
}
