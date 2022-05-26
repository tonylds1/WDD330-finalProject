import { loadHeaderFooter } from "./utils.js";
import LibraryActions from "./libraryActions.js";

//put in the header & footer
loadHeaderFooter();

//create variable for the LibraryActions module
let shelf = new LibraryActions();

//create a variable to pass in as the button for the "Read" shelf
let readButton = document.querySelector("#read_bttn");
//this will add the list of books they've read to the page
shelf.getShelvedBooks(readButton, "read-shelf");
// console.log(readButton);

//create a variable to pass in as the button for the "Read" shelf
let readingButton = document.querySelector("#reading_bttn");
//this will add the list of books their reading to the page
shelf.getShelvedBooks(readingButton, "reading-shelf");
// console.log(readingButton);

let wantButton = document.querySelector("#want_bttn");
//this will add the list of books their reading to the page
shelf.getShelvedBooks(wantButton, "want-read-shelf");
// console.log(wantButton);


//active listener for book shelve buttons MyLIB
// This script adds active class to the current button (highlight it)
// var header = document.getElementById("myLIB");
// var btns = document.querySelectorAll("btn");
// // for (var i = 0; i < btns.length; i++) {
//   btns.addEventListener("click", function() {
//     console.log("I am working")
//   var current = document.getElementsByClassName("active");
//   current[0].className = current[0].className.replace("active","");
//   this.className += "active";
//   });
// }