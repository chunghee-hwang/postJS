export function createElement(
  tagName,
  className = null,
  text = null,
  style = null,
  parentElement = null
) {
  let newElement = document.createElement(tagName);
  if (text) {
    let newContent = document.createTextNode(text);
    newElement.appendChild(newContent);
  }
  if (className) {
    newElement.className = className;
  }
  if (style) {
    for (const key in style) {
      newElement.style[key] = style[key];
    }
  }
  if (parentElement) {
    parentElement.appendChild(newElement);
  }
  return newElement;
}
