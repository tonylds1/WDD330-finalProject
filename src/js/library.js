import { loadHeaderFooter } from "./utils.js";
import LibraryActions from "./libraryActions.js";

//put in the header & footer
loadHeaderFooter();

//create variable for the LibraryActions module
let shelf = new LibraryActions();

//create a variable to pass in as the button for the "Read" shelf
let readButton = document.querySelector("#read_bttn");
//this will add the list of books they've read to the page
shelf.getShelvedBooks(readButton, "read_shelf");
// console.log(readButton);

//create a variable to pass in as the button for the "Read" shelf
let readingButton = document.querySelector("#reading_bttn");
//this will add the list of books their reading to the page
shelf.getShelvedBooks(readingButton, "reading_shelf");
// console.log(readingButton);

let wantButton = document.querySelector("#want_bttn");
//this will add the list of books their reading to the page
shelf.getShelvedBooks(wantButton, "want_shelf");
// console.log(wantButton);
