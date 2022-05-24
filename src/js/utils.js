//JavaScript module with functions general enough for multiple pages

function convertToText(res) {
  try {
    if (res.ok) {
      return res.text();
    } else {
      throw new Error("Bad Response");
    }
  } catch (e) {
    // console.log(e);
  }
}

export async function loadTemplate(templatePath) {
  const html = await fetch(templatePath).then(convertToText);
  // console.log(html)
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export function renderListWithTemplate(template, parentElement, data, callback) {
  // clone the template
  let node = template.content.cloneNode(true);
  // if there is a callback, call it on the node and the data
  if (callback) {
    node = callback(node, data);
  }
  // add it to the DOM
  parentElement.appendChild(node);
}

export async function loadHeaderFooter() {
  //create variable for header and footer
  let headerTemplate;
  let footerTemplate;
  //load template into variables
  headerTemplate = await loadTemplate("./partials/header.html");
  // console.log(headerTemplate);
  footerTemplate = await loadTemplate("./partials/footer.html");
  // console.log(footerTemplate);
  //attach element to a variable
  const header = document.querySelector("header");
  // console.log(header);
  const footer = document.querySelector("footer");
  // console.log(footer);
  renderListWithTemplate(headerTemplate, header);
  renderListWithTemplate(footerTemplate, footer);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
