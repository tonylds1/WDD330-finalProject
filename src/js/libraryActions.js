//this module is used for most of the work done on the library.html page
import {
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  removeAllInserts,
  insertTitle,
  insertBookCount
} from "./utils.js";
import ExternalServices from "./externalServices.js";

//create variable for ElectonicPigeon Module
let connection = new ExternalServices();

//class for external use as a module
export default class LibraryActions {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.bookShelf = [];
    this.book = {};
    this.bookCover = "./images/bookCoverPlaceholder.gif";
    this.author = "No Author Listed";
    this.publisher = "No Publisher Listed";
    this.publishDate = "No Publish Date Listed";
    this.header = "";
    this.bttnNameNow = "";
    this.bttnNameBefore = "";
    this.bttnNameWant = "";
    this.bookCount = 0;
  }

  async getShelvedBooks() {  
    //create variable for the element to insert titles into
    const insertionPoint1 = document.getElementById("my_book_lists");
    //create variable for the element to insert list into 
    const insertionPoint2 = document.getElementById("card-container"); 
    //create title to show what shelf is being listed       
    this.selectShelfName(this.storageKey);        
    //put local storage in the list
    this.bookShelf = await getLocalStorage(this.storageKey);   
    //reset bookShelf to an empty list if localStorage is empty
    this.changeNullShelfToList(this.storageKey);     
    //if the bookshelf is empty in localStorage post a message 
    if (this.bookShelf.length < 1) {
      insertionPoint2.innerHTML = ""; 
      insertionPoint1.innerHTML = this.renderBanner();
      this.addShelfTitleAndEmptyShelfMessage(insertionPoint1);         
    } else {   
      //clear previous data from area holding the list      
      insertionPoint2.innerHTML = "";
      //add in the title at the top by creating a title
      let title = this.header + " Shelf!"
      //put the title at the top
      insertTitle(insertionPoint1, title);
      //remove any previous alerts from empty shelves
      removeAllInserts("alert", "opening");
      //insert the total count of the books on the shelf      
      insertBookCount(this.bookCount);
      //remove any previous banners form empty shelves     
     if (this.bookShelf.length >= 1) { 
       removeAllInserts("banner2" , "opening") 
      // const banners = document.querySelectorAll(".banner2");
      // banners.forEach((banner) => document.querySelector("main").removeChild(banner));
     }    
      //display the books that are in the shelf     
      this.displayBooksFromShelf(insertionPoint2);     
    }    
  }

  selectShelfName() {
    //create title to show what shelf is being listed
    if (this.storageKey == "reading-shelf") {
      this.header = "Reading Now";
      this.bttnNameNow = "Remove";
      this.bttnNameBefore = "Read Before";
      this.bttnNameWant = "Want to Read";      
      } else if (this.storageKey == "read-shelf") {
      this.header = "Read Before";
      this.bttnNameNow = "Reading Now";
      this.bttnNameBefore = "Remove";
      this.bttnNameWant = "Want to Read";
      } else if (this.storageKey == "want-read-shelf") {
      this.header = "Want To Read";
      this.bttnNameNow = "Reading Now";
      this.bttnNameBefore = "Read Before";
      this.bttnNameWant = "Remove";
      }     
  }

  changeNullShelfToList() {
     //reset bookShelf to an empty list if localStorage is empty
     if (this.bookShelf == null) {
      this.bookShelf = [];
      //set that local storage shelf to an empty list
      setLocalStorage(this.storageKey, this.bookShelf);
    }
  }

  addShelfTitleAndEmptyShelfMessage(insertionPoint1) {
    //remove any preexisting messages from other empty shelves
    removeAllInserts("alert", "opening");   
    //code to post this message onto the page
    let message = "Nothing is here, try adding a book!";
    // console.log(message);
    alertMessage(message, "my_book_lists", false);
    //add in the title at the top by creating a title
    let title = this.header + " Shelf!"
    //put the title at the top
    insertTitle(insertionPoint1, title);    
  }

  async displayBooksFromShelf(insertionPoint2) {
    //set up variables for the elements holding the count   
    let countHolder = document.querySelector(".count");
    //loop through list of the books from the shelf   
    for (const bookId of this.bookShelf) {
      this.book = await connection.findBookById(bookId.id, false);
      // console.log(this.book);
      //check if the data has an image to dispay and if not insert one
      try {
        this.bookCover = this.book.volumeInfo.imageLinks.smallThumbnail;
      } catch (error) {
        this.bookCover = "./images/bookCoverPlaceholder.gif";
      }
      //insert authors divided by commas or state the author isn't listed
      if (this.book.volumeInfo.authors) {
        this.author = this.book.volumeInfo.authors.join(", ");
      } else {
        this.author = "No Author Listed";
      }
      //insert the publisher if listed or state the publisher isn't listed
      if (this.book.volumeInfo.publisher) {
        this.publisher = this.book.volumeInfo.publisher;
      } else {
        this.publisher = "No Publisher Listed";
      }
      //insert the publishing date or state it isn't listed
      if (this.book.volumeInfo.publishedDate) {
        this.publishDate = new Date(
          this.book.volumeInfo.publishedDate
        ).toDateString("en-US");
      } else {
        this.publishDate = "No Publish Date Listed";
      }  
      //increase count by one for each book 
      this.bookCount++;     
      //display the filled out HTML    
      insertionPoint2.innerHTML += this.renderProductDetails();     
      //add the button functionality so they add the the other shelves
      this.addBttnFunctionality()  
    }
    countHolder.innerHTML = this.bookCount;
    //reset the count to zero
    this.bookCount = 0;    
  }
  
  bookCount() {

  }

  renderBanner() {
    return `
    <div class="banner2">
      <p>
        Search for books and create your personal library of books you desire
        to read, books you are reading and completed.
      </p>
    </div>
    <section id="card-container">
    <!-- List for each book shelf of "Read"/"Reading"/"Want to Read" -->
    </section>
      `
  }

  renderProductDetails() {
    return `
      <div class="result-div card_size">
        <div class="book_count">
          <span class="specialCount">${this.bookCount}</span>       
          <img
            src="${this.bookCover}"
            alt="Cover for ${this.book.volumeInfo.title}"
          />
          <div>
            <p class="shelf_label"><b><u>Current Shelf</u>:</b></p>
            <p class="current_shelf"><b>  ${this.header}</b></p>
          </div>
        </div>
        <div class="book-details">
          <h3 class="bookTitle">${this.book.volumeInfo.title}</h3>
          <hr>
          <p class="authors">By: ${this.author}</p>
          <br>
          <p class="publishDate">Published on ${this.publishDate}</p>
          <p class="publisher">by ${this.publisher}</p>
          <br><br>
          <div class="addToShelfButtons">
            <button class="addToReading" data-id="${this.book.id}">${this.bttnNameNow}</button>          
            <button class="addToWantToRead" data-id="${this.book.id}">${this.bttnNameWant}</button>
            <button class="addToRead" data-id="${this.book.id}">${this.bttnNameBefore}</button>
          </div>         
        </div>
      </div>
    `;
  }

  addBttnFunctionality() {    
    //get a list of all the button nodes for the "reading shelf"
    let addToReadingBtn = document.querySelectorAll(".addToReading");
    //add an event listener for "clicking" the button for each book 
    addToReadingBtn.forEach(node => { 
      //change class name if it is the delete button
      //use this class name to chang the color to red     
      if (node.textContent == "Remove") {
        node.className += " book_delete";       
      } else {
        node.className += " book_add";
      }
      node.addEventListener("click", async () => {
      //set the id variable to the book.id stored in data-id
      let id = node.getAttribute("data-id");   
      //subtract the book with this id if the button is in "reading-shelf"
      //or add the book to the appropriate list if it is not already in that list
      this.alterShelf(id, "reading-shelf");    
      });
    })
    //get a list of all the button nodes for the "read shelf"
    let addToReadBtn = document.querySelectorAll(".addToRead");
    //add an event listener for "clicking" the button for each book 
    addToReadBtn.forEach(node => {
      //change class name if it is the delete button
      //use this class name to chang the color to red     
      if (node.textContent == "Remove") {
        node.className += " book_delete";       
      } else {
        node.className += " book_add";
      }
      node.addEventListener("click", async () => {
      //set the id variable to the book.id stored in data-id
      let id = node.getAttribute("data-id");
      //subtract the book with this id if the button is in "read-shelf"
      //or add the book to the appropriate list if it is not already in that list
      this.alterShelf(id, "read-shelf");
      });
    });
    //get a list of all the button nodes for the "want to read shelf"
    let addToWantToReadBtn = document.querySelectorAll(".addToWantToRead");
    //add an event listener for "clicking" the button for each book
    addToWantToReadBtn.forEach(node => {
      //change class name if it is the delete button
      //use this class name to chang the color to red     
      if (node.textContent == "Remove") {
        node.className += " book_delete";       
      } else {
        node.className += " book_add";
      }      
      node.addEventListener("click", async () => {
      //set the id variable to the book.id stored in data-id 
      let id = node.getAttribute("data-id");
      //subtract the book with this id if the button is in "want-read-shelf"
      //or add the book to the appropriate list if it is not already in that list     
      this.alterShelf(id, "want-read-shelf");
      });
    }); 
  }

  alterShelf(id, shelfId) {
    //set up the variables
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
      if (id == book.id) {
        //update the when it was added
        book["now"] = now;
        //turn the variable duplicate to true
        duplicate = true;
        //add true to the object's duplicate value
        book.duplicate = true;      
      }
      //if the book is not a duplicate
      else {
        //change or set the book object's duplicate value to false
        book.duplicate = false;     
      }
    });
    //if this button is for the shelf the user is on then change 
    //it to a delete button to offer the option of removing the book
    // console.log("The storageKey is " + this.storageKey + " and we are testing " + shelfId);
    if (this.storageKey == shelfId) {
      let removedList = [];
      // console.log("This is the " + this.storageKey + " delete button.")    
      shelf.forEach(book => { 
        console.log(book.duplicate);
        if (book.duplicate == false) { 
          //add all the books that don't match
          //the book to be deleted to a list      
          removedList.push(book) 
         } 
      })
      console.log (removedList)
      //make that list the new value of the local storage
      setLocalStorage(shelfId, removedList);     
      //reload the page with that book removed
      this.getShelvedBooks();
      console.log("You got this far.")
    } else {
      console.log(id + " / storageKey = " + this.storageKey + " / Shelf = " + shelfId);  
      // only add the book if it is unique
      if (duplicate == false) {
        newBook.duplicate = false;
        shelf.push(newBook);
      }
      //set the local storage equal to the list with the newly added book
      setLocalStorage(shelfId, shelf);
      console.log("You're running this code!")    
    }    
  }
}
