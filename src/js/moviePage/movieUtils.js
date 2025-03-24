import { lstClasses } from "./movieVars";

export function createElementWithProps(
  tag,
  className,
  id = false,
  text = false
) {
  const element = document.createElement(tag);

  Array.isArray(className)
    ? className.forEach((name) => element.classList.add(name))
    : element.classList.add(className);

  id && element.setAttribute("id", id); //&& возвращает первое ложное или, если оба истины, последнее истинное

  if (text) element.textContent = text;

  return element;
}

export function createButtonWithIcon(id, className, iconSrc, alt) {
  const btn = createElementWithProps("button", className, id);
  btn.append(createImgElem(classesBanner.icon, iconSrc, alt));
  return btn;
}

export function createListElem(arr) {
  const lstElem = createElementWithProps("ul", lstClasses.lst);
  arr.forEach((item) => {
    const liElem = createElementWithProps("li", lstClasses.items, false, item);
    lstElem.append(liElem);
  });
  return lstElem;
}

export function createLinkWithIcon(classLink, classIcon, href, iconSrc, alt) {
  const linkElem = createElementWithProps("a", classLink);
  linkElem.setAttribute("target", "_blank");
  linkElem.setAttribute("href", href);
  const iconElem = createImgElem(classIcon, iconSrc, alt);
  linkElem.append(iconElem);
  return linkElem;
}

function createImgElem(className, src, alt) {
  const imgElem = createElementWithProps("img", className);
  imgElem.setAttribute("src", src);
  imgElem.setAttribute("alt", alt);
  return imgElem;
}

export function getMovieId() {
  return sessionStorage.getItem("movie_id");
}
