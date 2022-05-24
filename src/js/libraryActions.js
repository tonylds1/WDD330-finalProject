//this module is used for most of the work done on the library.html page
import { getLocalStorage, setLocalStorage } from "./utils.js";
import ExternalServices from "./externalServices.js";

//create variable for ElectonicPigeon Module
let connection = new ExternalServices();

//class for external use as a module
export default class LibraryActions {
  constructor() {}

  getShelvedBooks(button, storageKey) {
    //create a listener even for a button click
    button.addEventListener("click", async () => {
      //create variable for the element to insert list into
      const listInsertionPoint = document.getElementById("my_book_lists");
      let readList = await getLocalStorage(storageKey);

      //this is here temporarily so that this feature can be tested
      //this will be replaced with the list built from books added from the search
      // readList = ["QwpEt9vUgBcC"]

      if (readList == null) {
        readList = [];
        setLocalStorage(storageKey, readList);
      } else {
        setLocalStorage(storageKey, readList);
      }
      if (readList.length < 1) {
        //code to post this message onto the page
        console.log("Nothing is here, try adding a book!");
      }
      let displayList = readList.forEach((bookId) => {
        let myBook = connection.findBookById(bookId, false);
        //code to post book onto template will go here
        console.log(myBook);
      });
    });
  }
}
