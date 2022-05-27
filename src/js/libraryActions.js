//this module is used for most of the work done on the library.html page
import {
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  removeAllAlerts,
  insertTitle,
} from "./utils.js";
import ExternalServices from "./externalServices.js";

//create variable for ElectonicPigeon Module
let connection = new ExternalServices();

//class for external use as a module
export default class LibraryActions {
  constructor() {
    this.bookShelf = [];
    this.book = {};
    this.bookCover = "./images/bookCoverPlaceholder.gif";
    this.author = "No Author Listed";
    this.publisher = "No Publisher Listed";
    this.publishDate = "No Publish Date Listed";
    this.header = "";
  }

  async getShelvedBooks(storageKey) {
    //create variable for the element to insert list into
    const insertionPoint = document.getElementById("my_book_lists");  
    //create title to show what shelf is being listed       
    this.selectShelfName(storageKey);        
    //put local storage in the list
    this.bookShelf = await getLocalStorage(storageKey);
    //reset bookShelf to an empty list if localStorage is empty
    this.changeNullShelfToList(storageKey);      
    //if the bookshelf is empty in localStorage post a message
    if (this.bookShelf.length < 1) {
      this.addShelfTitleAndEmptyShelfMessage(insertionPoint);
    } else {
      //clear the insert area of data
      insertionPoint.innerHTML = "";
      //add in the title at the top by creating a title
      let title = this.header + " Shelf!"
      //put the title at the top
      insertTitle(insertionPoint, title);
      //if there are books on the shelf display them
      // let displayList = /*this.bookShelf.forEach((bookId) =>*/
      this.displayBooksFromShelf(insertionPoint);
    }    
  }

  selectShelfName(storageKey) {
    //create title to show what shelf is being listed
    if (storageKey == "reading-shelf") {
      this.header = "Reading Now";
      } else if (storageKey == "read-shelf") {
      this.header = "Read Before";
      } else if (storageKey == "want-read-shelf") {
      this.header = "Want To Read";
      }     
  }

  changeNullShelfToList(storageKey) {
     //reset bookShelf to an empty list if localStorage is empty
     if (this.bookShelf == null) {
      this.bookShelf = [];
      //set that local storage shelf to an empty list
      setLocalStorage(storageKey, this.bookShelf);
    }
  }

  addShelfTitleAndEmptyShelfMessage(insertionPoint) {
    //remove any preexisting messages from other empty shelves
    removeAllAlerts();  
    //code to post this message onto the page
    let message = "Nothing is here, try adding a book!";
    console.log(message);
    alertMessage(message, "my_book_lists");
    //add in the title at the top by creating a title
    let title = this.header + " Shelf!"
    //put the title at the top
    insertTitle(insertionPoint, title);    
  }

  async displayBooksFromShelf(insertionPoint) {
    for (const bookId of this.bookShelf) {
      this.book = await connection.findBookById(bookId.id, false);
      console.log(this.book);
      //check if the data has an image to dispay and if not insert one
      try {
        this.bookCover = this.book.volumeInfo.imageLinks.smallThumbnail;
      } catch (error) {
        this.bookCover = "./images/bookCoverPlaceholder.gif";
      }
      if (this.book.volumeInfo.authors) {
        this.author = this.book.volumeInfo.authors.join(", ");
      } else {
        this.author = "No Author Listed";
      }
      if (this.book.volumeInfo.publisher) {
        this.publisher = this.book.volumeInfo.publisher;
      } else {
        this.publisher = "No Publisher Listed";
      }
      if (this.book.volumeInfo.publishedDate) {
        this.publishDate = new Date(
          this.book.volumeInfo.publishedDate
        ).toDateString("en-US");
      } else {
        this.publishDate = "No Publish Date Listed";
      }
      console.log(
        this.bookCover,
        this.author,
        this.publisher,
        this.publishDate
      );
      insertionPoint.innerHTML += this.renderProductDetails();
    }
  }

  renderProductDetails() {
    return `<div class="result-div">
      <img
        src="${this.bookCover}"
        alt="Cover for ${this.book.volumeInfo.title}"
      />
      <div class="book-details">
        <h3 class="bookTitle">${this.book.volumeInfo.title}</h3>
        <hr>
        <p class="authors">By: ${this.author}</p>
        <br>
        <p class="publishDate">Published on ${this.publishDate}</p>
        <p class="publisher">by ${this.publisher}</p>
        <div class="addToShelfButtons">
        </div>
      </div>
    </div>`;
  }
}
