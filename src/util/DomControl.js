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

export function setVisibility(element, visible) {
  element.style.display = visible ? 'block' : 'none';
}

export function addClass(element, name) {
  if (!element || !name) return;
  element.classList.add(name);
}

export function removeClass(element, name) {
  if (!element || !name) return;
  element.classList.remove(name);
}

export function createButton(
  className = null,
  text = null,
  style = null,
  parentElement = null,
  onClick = null
) {
  const btn = createElement('button', className, text, style, parentElement);
  if (onClick) {
    btn.addEventListener('click', (e) => onClick(e));
  }
  return btn;
}
