//this module is used for most of the work done on the library.html page
import { grabLocalStorage, feedLocalStorage } from "./flyInNutsAndBolts.js";
import ElectronicPigeon from "./ePigeonCourierServices.js";

//create variable for ElectonicPigeon Module
let wire = new ElectronicPigeon();

//class for external use as a module
export default class LibraryDeliveryBeak {
  constructor() {}

  bookShelfFeeder(button, storageKey) {
    //create a listener even for a button click
    button.addEventListener("click", async () => {
      //create variable for the element to insert list into
      const listInsertionPoint = document.getElementById("my_book_lists");
      let readList = await grabLocalStorage(storageKey);

      //this is here temporarily so that this feature can be tested
      //this will be replaced with the list built from books added from the search
      // readList = ["QwpEt9vUgBcC"]

      if (readList == null) {
        readList = [];
        feedLocalStorage(storageKey, readList);
      } else {
        feedLocalStorage(storageKey, readList);
      }
      if (readList.length < 1) {
        //code to post this message onto the page
        console.log("Nothing is here, try adding a book!");
      }
      let displayList = readList.forEach((bookId) => {
        let myBook = wire.pigeonBookDeliveryById(bookId, false);
        //code to post book onto template will go here
        console.log(myBook);
      });
    });
  }
}
