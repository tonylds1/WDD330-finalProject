//Used for product-listing pages
import {
  loadTemplate,
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage
} from "./utils.js";

export default class SearchResults {
  constructor(searchTerm, dataSource, listElement) {
    this.searchTerm = searchTerm;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getBookData(this.searchTerm);
    console.log(list)

    //render the list
    this.renderList(list.items)
  }

  async renderList(list) {
    // this.listElement.innerHTML = "";
    const cardTemplate = await loadTemplate(
      "./partials/searchResults.html"
    );
    renderListWithTemplate(
      cardTemplate,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }

  prepareTemplate(templateClone, book) {
    // Add in the image
    try {
      templateClone.querySelector("img").src = book.volumeInfo.imageLinks.smallThumbnail;
    } catch (e) {
      templateClone.querySelector("img").src = "./images/bookCoverPlaceholder.gif";
    }

    templateClone.querySelector("img").alt = book.volumeInfo.title
    templateClone.querySelector(".bookTitle").innerHTML = book.volumeInfo.title
    let authors = templateClone.querySelector(".authors")

    // Add in the author
    try {
      book.volumeInfo.authors.forEach(author => {
        authors.innerHTML += `${author}, `
      });
    } catch (e) {
      authors.innerHTML += "No Author Listed, "
    }
    // remove the trailing space and comma on the last entry
    authors.innerHTML = authors.innerHTML.slice(0, -2);

    // Add in the publisher and the publish date
    templateClone.querySelector(".publisher").innerHTML += book.volumeInfo.publisher
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    let publishDate = new Date(book.volumeInfo.publishedDate)
    templateClone.querySelector(".publishDate").innerHTML += publishDate.toLocaleDateString("en-US", options)

    // give functionality to each button
    templateClone.querySelector(".addToShelfButtons").innerHTML = bookListButtons(book.id)

    // templateClone.querySelector(".addToReading")
    let addToReadingBtn = templateClone.querySelector(".addToReading")
    addToReadingBtn.addEventListener("click", async () => {
      let id = addToReadingBtn.getAttribute("data-id");
      // add the id to the reading list
      addToShelf(id, "reading-shelf")
      console.log(id);
    });
    let addToReadBtn = templateClone.querySelector(".addToRead")
    addToReadBtn.addEventListener("click", async () => {
      let id = addToReadBtn.getAttribute("data-id");
      // add the id to the read list
      addToShelf(id, "read-shelf")
      console.log(id);
    });
    let addToWantToReadBtn = templateClone.querySelector(".addToWantToRead")
    addToWantToReadBtn.addEventListener("click", async () => {
      let id = addToWantToReadBtn.getAttribute("data-id");
      // add the id to the want to read list
      addToShelf(id, "want-read-shelf")
      console.log(id);
    });

    return templateClone;
  }
}

function addToShelf(id, shelfId) {
    
    let shelf = getLocalStorage(shelfId)
    if (shelf == null){
        shelf = []
    }
    let now = new Date()
    let newBook = {id, now}
    let duplicate = false

    // remove any duplicates
    shelf.forEach(book => {
        // if the book is a duplicate, just update the when it was added
        if (id == book["id"]){
            book["now"] = now
            duplicate = true
        }
    });

    // only add the book if it is unique
    if (duplicate == false) {
        shelf.push(newBook)
    }

    setLocalStorage(shelfId, shelf)
}

function bookListButtons(id) {
  return `<button class="addToReading" data-id="${id}">Reading</button>
    <button class="addToRead" data-id="${id}">Read</button>
    <button class="addToWantToRead" data-id="${id}">Want to Read</button>`
}
