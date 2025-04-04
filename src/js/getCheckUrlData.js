export function getIdFromWindowLocation() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

export function getPathFromWindowLocation() {
  return window.location.pathname;
}

export function getPageName() {
  const path = getPathFromWindowLocation();
  return path.replace(/^\//, "").replace(".html", "");
}

export function getTitleName() {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  return title;
}

export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
