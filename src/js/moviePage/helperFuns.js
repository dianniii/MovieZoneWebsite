export function makePlural(elem, array) {
  const text = elem.textContent;
  if (array.length > 1)
    elem.textContent = text.slice(0, elem.textContent.length - 1) + "s";
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
