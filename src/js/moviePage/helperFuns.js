import { createElementWithProps } from "../elementCreation";

export function makePlural(elem, array) {
  if (array.length > 1) elem.textContent += "s";
}

export function changeElemContent(elem, content) {
  const titleElem = elem.querySelector("h2");
  const parElem = elem.querySelector("p");
  if (content.length > 1) makePlural(titleElem, content);
  parElem.textContent = content.join(", ");
}

export function extractNames(arr, key) {
  return arr.map((item) => item[key]);
}

export function exctractValues(arrOfObj) {
  return arrOfObj.map((item) => Object.values(item));
}

export function appendLitElem(arr, ulElem, liClass, nestedArr = false) {
  arr.forEach((item) => {
    const liElem = createElementWithProps(
      "li",
      liClass,
      false,
      nestedArr ? item[1] : item
    );
    ulElem.append(liElem);
    if (nestedArr) liElem.dataset.id = item[0];
  });
}
