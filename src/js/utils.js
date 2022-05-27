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

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  callback
) {
  // clone it once for each product in our list
  list.forEach((item) => {
    const node = template.content.cloneNode(true);
    const filledTemplate = callback(node, item);
    // add it to the DOM
    parentElement.appendChild(filledTemplate);
  });
}

export function renderWithTemplate(template, parentElement, data, callback) {
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
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get the parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function alertMessage(message, id, scroll = true) {
  //create element to hold the alert
  const alert = document.createElement("p");
  //add class to style the alert
  alert.className = "alert";
  //add id for event listener
  //add alert message
  alert.innerHTML = message + "<span class='x-out' id=" + id + ">X</span>";
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", () => {
    main.removeChild(alert);
  });
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) {
    window.scrollTo(0, 0);
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function insertTitle(insertionPoint, title) {
  //remove any preexisting titles   
  const insertedTitle = document.querySelectorAll(".shelf_title");
  insertedTitle.className = "delete_me";
  // console.log(insertedTitle);
  if(insertedTitle.className === "delete_me"){
    insertedTitle.forEach((oldTitle) => insertionPoint.removeChild(oldTitle));
  }
  //create an element for the title
  let h1Title = document.createElement("h1");
  //add a class to the title
  h1Title.className = "shelf_title"   
  //put the text of the title in
  h1Title.innerHTML = `Welcome to Your ${title}!`
  //put the title at the top    
  insertionPoint.prepend(h1Title);   
}
