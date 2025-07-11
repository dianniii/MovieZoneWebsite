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

  id && element.setAttribute("id", id); 

  if (text) element.textContent = text;

  return element;
}

export function createButtonWithIcon(classBtn, classIcon, iconSrc, alt) {
  const btn = createElementWithProps("button", classBtn);
  btn.append(createImgElem(classIcon, iconSrc, alt));
  return btn;
}

export function createListElem(arr, ulClass, liClass, nestedArr = false) {
  const lstElem = createElementWithProps("ul", ulClass);
  arr.forEach((item) => {
    const liElem = createElementWithProps(
      "li",
      liClass,
      false,
      nestedArr ? item[1] : item
    );
    lstElem.append(liElem);
    if (nestedArr) liElem.dataset.id = item[0];
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

export function createImgElem(className, src, alt) {
  const imgElem = createElementWithProps("img", className);
  imgElem.setAttribute("src", src);
  imgElem.setAttribute("alt", alt);
  return imgElem;
}

export function appendListElem(arr, ulElem, liClass, nestedArr = false) {
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
