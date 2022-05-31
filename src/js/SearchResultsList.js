//Used for product-listing pages
import {
  loadTemplate,
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage,
  runModal,
  getStars,
} from "./utils.js";

import ExternalServices from "./externalServices.js";

//create variable for ExternalServices Module
let connection = new ExternalServices();

export default class SearchResults {
  constructor(searchTerm, dataSource, listElement) {
    this.searchTerm = searchTerm;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getBookData(this.searchTerm);
    console.log(list);

    //render the list
    this.renderList(list.items);
  }

  async renderList(list) {
    // this.listElement.innerHTML = "";
    const cardTemplate = await loadTemplate("./partials/searchResults.html");
    renderListWithTemplate(
      cardTemplate,
      this.listElement,
      list,
      this.prepareTemplate
    );
    runModal(getSpecificBookInfo, populateModal, true);
    console.log(cardTemplate);
  }

  prepareTemplate(templateClone, book) {
    // Add in the image
    try {
      templateClone.querySelector("img").src =
        book.volumeInfo.imageLinks.smallThumbnail;
    } catch (e) {
      templateClone.querySelector("img").src =
        "./images/bookCoverPlaceholder.gif";
    }

    templateClone.querySelector("img").alt = book.volumeInfo.title;
    templateClone.querySelector(".bookTitle").innerHTML = book.volumeInfo.title;
    let authors = templateClone.querySelector(".authors");

    // Add in the author
    try {
      book.volumeInfo.authors.forEach((author) => {
        authors.innerHTML += `${author}, `;
      });
    } catch (e) {
      authors.innerHTML += "No Author Listed, ";
    }
    // remove the trailing space and comma on the last entry
    authors.innerHTML = authors.innerHTML.slice(0, -2);

    // Add in the publisher and the publish date
    templateClone.querySelector(".publisher").innerHTML +=
      book.volumeInfo.publisher;
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let publishDate = new Date(book.volumeInfo.publishedDate);
    templateClone.querySelector(".publishDate").innerHTML +=
      publishDate.toLocaleDateString("en-US", options);

    // give functionality to each button
    templateClone.querySelector(".addToShelfButtons").innerHTML =
      bookListButtons(book.id);

    // templateClone.querySelector(".addToReading")
    let addToReadingBtn = templateClone.querySelector(".addToReading");
    addToReadingBtn.addEventListener("click", async () => {
      let id = addToReadingBtn.getAttribute("data-id");
      // add the id to the reading list
      addToShelf(id, "reading-shelf");
      console.log(id);
    });
    let addToReadBtn = templateClone.querySelector(".addToRead");
    addToReadBtn.addEventListener("click", async () => {
      let id = addToReadBtn.getAttribute("data-id");
      // add the id to the read list
      addToShelf(id, "read-shelf");
      console.log(id);
    });
    let addToWantToReadBtn = templateClone.querySelector(".addToWantToRead");
    addToWantToReadBtn.addEventListener("click", async () => {
      let id = addToWantToReadBtn.getAttribute("data-id");
      // add the id to the want to read list
      addToShelf(id, "want-read-shelf");
      console.log(id);
    });
    let bookId = addToReadingBtn.getAttribute("data-id");
    console.log(bookId);
    // getSpecificBookInfo(bookId);
    return templateClone;
  }
}

function addToShelf(id, shelfId) {
  let shelf = getLocalStorage(shelfId);
  if (shelf == null) {
    shelf = [];
  }
  let now = new Date();
  let newBook = { id, now };
  let duplicate = false;

  // remove any duplicates
  shelf.forEach((book) => {
    // if the book is a duplicate, just update the when it was added
    if (id == book["id"]) {
      book["now"] = now;
      duplicate = true;
    }
  });

  // only add the book if it is unique
  if (duplicate == false) {
    shelf.push(newBook);
  }

  setLocalStorage(shelfId, shelf);
}

function bookListButtons(id) {
  return `<button class="addToReading" data-id="${id}">Reading</button>
    <button class="addToRead" data-id="${id}">Read</button>
    <button class="addToWantToRead" data-id="${id}">Want to Read</button>`;
}

async function getSpecificBookInfo(bookId) {
  let bookIds = document.querySelectorAll(".addToReading");
  bookIds.forEach((id) => {
    let detailBookId = id.getAttribute("data-id");
    console.log(detailBookId);
  });
  let book = await connection.findBookById(bookId, false);
  console.log(bookId);
  console.log(book);
  return book;
}

async function populateModal(bookId, modalCard) {
  //get the promise fulfilled for getting the book from the api
  let book = await bookId;
  console.log(book);
  //add in the book cover image or a replacement if it is not available
  try {
    modalCard.querySelector(".book_modal_img").src =
      book.volumeInfo.imageLinks.smallThumbnail;
  } catch (e) {
    modalCard.querySelector(".book_modal_img").src =
      "./images/bookCoverPlaceholder.gif";
  }
  //add in the alt tag information
  modalCard.querySelector(".book_modal_img").alt = book.volumeInfo.title;
  //add in the title
  modalCard.querySelector(".books_modal_title").innerHTML =
    book.volumeInfo.title;
  //insert the subtitle or nothing if there isn't one
  if (book.volumeInfo.subtitle) {
    modalCard.querySelector(".books_modal_title").innerHTML +=
      ": " + book.volumeInfo.subtitle;
  } else {
    modalCard.querySelector(".books_modal_title").innerHTML += "";
  }
  //insert authors divided by commas or state the author isn't listed
  if (book.volumeInfo.authors) {
    modalCard.querySelector(".books_modal_authors").innerHTML +=
      book.volumeInfo.authors.join(", ");
  } else {
    this.author = "No Author Listed";
  }
  //insert the publishing date or state it isn't listed
  if (book.volumeInfo.publishedDate) {
    modalCard.querySelector(".books_modal_publish_date").innerHTML += new Date(
      book.volumeInfo.publishedDate
    ).toDateString("en-US");
  } else {
    modalCard.querySelector(".books_modal_publish_date").innerHTML +=
      "No Publish Date Listed";
  }
  //insert the publisher if listed or state the publisher isn't listed
  if (book.volumeInfo.publisher) {
    modalCard.querySelector(".books_modal_publisher").innerHTML +=
      book.volumeInfo.publisher;
  } else {
    modalCard.querySelector(".books_modal_publisher").innerHTML +=
      "No Publisher Listed";
  }
  //insert the page count or state it isn't listed
  if (book.volumeInfo.printedPageCount) {
    modalCard.querySelector(".books_modal_page_count").innerHTML =
      book.volumeInfo.printedPageCount + " Pages";
  } else {
    modalCard.querySelector(".books_modal_page_count").innerHTML =
      "Book Length Not Given";
  }
  //insert the genre or state it isn't listed
  if (book.volumeInfo.categories) {
    modalCard.querySelector(".books_modal_genre").innerHTML =
      "Category: " + book.volumeInfo.categories;
  } else {
    modalCard.querySelector(".books_modal_genre").innerHTML =
      "Genre Not Listed";
  }
  //insert the number of reviews or state no reviews have been given
  if (book.volumeInfo.ratingsCount) {
    let review;
    if (book.volumeInfo.ratingsCount == 1) {
      review = " Review";
    } else {
      review = " Reviews";
    }
    //create stars from the average rating number to insert
    let starRating = getStars(book.volumeInfo.averageRating);
    modalCard.querySelector(".books_modal_ratings").innerHTML =
      book.volumeInfo.ratingsCount + review + " &nbsp; " + starRating;
  } else {
    modalCard.querySelector(".books_modal_ratings").innerHTML = "No Reviews";
  }
  //insert the book's infoLink and from Google
  modalCard.querySelector(".books_modal_infoLink").href =
    book.volumeInfo.infoLink;
  modalCard.querySelector(".books_modal_previewLink").href =
    book.volumeInfo.previewLink;
  //insert the book summary or state that it has no summary
  if (book.volumeInfo.previewLink) {
    modalCard.querySelector(".books_modal_summary").innerHTML =
      book.volumeInfo.description;
  } else {
    modalCard.querySelector(".books_modal_summary").innerHTML =
      "There is no summary given for this book.";
  }
}
