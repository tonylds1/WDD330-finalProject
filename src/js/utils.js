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

export function removeAllInserts(childClass, parentClass) {
  const inserts = document.querySelectorAll("." + childClass);
  inserts.forEach((insert) =>
    document.querySelector(`.${parentClass}`).removeChild(insert)
  );
}

export function insertTitle(insertionPoint, title) {
  //remove any preexisting titles
  const insertedTitle = document.querySelectorAll(".shelf_title");
  insertedTitle.className = "delete_me";
  // console.log(insertedTitle);
  if (insertedTitle.className === "delete_me") {
    insertedTitle.forEach((oldTitle) => insertionPoint.removeChild(oldTitle));
  }
  //create an element for the title
  let h1Title = document.createElement("h1");
  //add a class to the title
  h1Title.className = "shelf_title";
  //put the text of the title in
  h1Title.innerHTML = `Welcome to Your ${title}!`;
  //put the title at the top
  insertionPoint.prepend(h1Title);
}

export function insertBookCount(bookCount) {
  removeAllInserts("count_message", "opening");
  //create element to hold the count
  const count = document.createElement("p");
  //add class to style the count
  count.className = "count_message";
  //add count display mesage
  count.innerHTML = `This shelf has &nbsp;*&nbsp; <span class="count">${bookCount}</span> &nbsp;*&nbsp; books presently.`;
  // console.log(count.innerHTML);
  // add the count under the shelf title
  const main = document.querySelector("main");
  // console.log(main.firstChild.nextSibling);
  main.insertBefore(count, main.firstChild.nextSibling);
}

export const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(
    `Double check your '${element}' seletor and make sure it's typed correctly`
  );
};

export function isNullOrUndefined(variable) {
  return variable == null || variable == undefined;
}

export function runModal(callBack1, callBack2, searchResult = false) {
  //create variable for the div holding the modal HTML content
  let modal;
  //creat a variblae to hold the list of all modals on the page
  let modals = document.querySelectorAll(".modal");
  //set counter to label the data-id for matching the div to the button
  let modalCnt = 0;
  //cycle through each div & set the data-id so it can be used for matching
  modals.forEach((div) => {
    div.setAttribute("data-id", "match" + modalCnt);
    //advand the count for unique labeling
    modalCnt++;
  });
  //create a list of all the detail buttons on the page
  let btns = document.querySelectorAll(".details_bttn");
  // // When the user clicks on the button, open the modal
  //set counter to label the id & data-id for matching the div to the button
  let btnCnt = 0;
  //cycle through each button & set the id & data-id so it can be matched up
  btns.forEach((btn) => {
    //set a unique id for each button
    btn.id = "details_bttn" + btnCnt;
    //set a data-id matching the data-id of the modal div
    btn.setAttribute("data-id", "match" + btnCnt);
    //set a variable for the button that was pushed
    let clickedBtn = document.getElementById("details_bttn" + btnCnt);
    //open the modal div when the user clicks on the button
    clickedBtn.onclick = function () {
      modals.forEach((card) => {
        //match the clicked button to the modal that goes with it
        if (
          card.getAttribute("data-id") == clickedBtn.getAttribute("data-id")
        ) {
          if (searchResult == true) {
            //get the book's id stored in the data-id of the "Want to Read" button
            //from the card that had the modal detail button clicked
            let bookIdElementContainer =
              clickedBtn.previousElementSibling.lastElementChild
                .previousElementSibling.previousElementSibling
                .firstElementChild;
            // console.log(bookIdElementContainer);
            let bookId = bookIdElementContainer.getAttribute("data-id");
            // console.log(bookId);
            //get the element of the modal div where the modal deatail button was clicked
            let bookCard = clickedBtn.nextElementSibling;
            // console.log(bookCard);
            //set a variable equal to the return value from the 1st call back function
            //this function fetches the book details from the api for that specific book
            let book = callBack1(bookId);
            //pass in the book details from the api and the element of the modal div
            //for that specific book only so the right info goes to each card
            callBack2(book, bookCard);
          }
          //store the modal div that matches the button in a variable
          modal = card;
        }
      });
      //display the div modal that matches the clicked button
      modal.style.display = "block";
    };
    //advance the count for unique labeling
    btnCnt++;
  });
  //create a list of all the spans around the "X" used to close the page
  let spans = document.querySelectorAll(".close");
  //cycle through all the <span> (x)'s on the page
  spans.forEach((span) => {
    //close the modal when the user clicks on <span> (x)
    span.onclick = function () {
      modal.style.display = "none";
    };
  });
  //close the modal when the user clicks anywhere outside of the modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

export function getStars(fiveRating) {
  // Round to nearest half
  let rating = Math.round(fiveRating * 2) / 2;
  let output = [];
  // Append all the filled whole stars
  for (var i = rating; i >= 1; i--)
    output.push(
      "<i class='fa fa-star' aria-hidden='true' style='color: gold;'></i>&nbsp;"
    );
  // If there is a half a star, append it
  if (i == 0.5)
    output.push(
      "<i class='fa fa-star-half-o' aria-hidden='true' style='color: gold;'></i>&nbsp;"
    );
  // Fill the empty stars
  for (let n = 5 - rating; n >= 1; n--)
    output.push(
      "<i class='fa fa-star-o' aria-hidden='true' style='color: gold;'></i>&nbsp;"
    );
  return output.join("");
}

export function doubleNumberInsert(elements, startingNumber) {
  //set up a variable for the count
  let count = startingNumber;
  //set up a variable for alternating number increase
  let numberWatcher = 0;
  elements.forEach((element) => {
    if (numberWatcher % 2 == 0) {
      count++;
    }
    element.innerHTML = count;
    numberWatcher++;
  });
}
