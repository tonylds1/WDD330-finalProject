import { flyInHeaderFooter } from "./flyInNutsAndBolts.js";
import LibraryDeliveryBeak from "./libraryDeliveryPigeon.js";

//put in the header & footer
flyInHeaderFooter();

//create variable for the LibraryDeliveryBeak module
let shelf = new LibraryDeliveryBeak();

//create a variable to pass in as the button for the "Read" shelf
let readButton = document.querySelector("#read_bttn");
//this will add the list of books they've read to the page
shelf.bookShelfFeeder(readButton, "read_shelf");
// console.log(readButton);

//create a variable to pass in as the button for the "Read" shelf
let readingButton = document.querySelector("#reading_bttn");
//this will add the list of books their reading to the page
shelf.bookShelfFeeder(readingButton, "reading_shelf");
// console.log(readingButton);

let wantButton = document.querySelector("#want_bttn");
//this will add the list of books their reading to the page
shelf.bookShelfFeeder(wantButton, "want_shelf");
// console.log(wantButton);
