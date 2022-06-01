import { loadHeaderFooter, setLocalStorage } from "./utils.js";
import LibraryActions from "./libraryActions.js";
import DarkMode from "./darkmode";

async function loadPage() {
  //set the search scope to the default of search all
  setLocalStorage("searchScope", "search ");
  //set search default value first
  let searchScope = "search ";
  //then put in the header & footer next
  await loadHeaderFooter();
  //then put in dark mode
  const darkMode = new DarkMode();
  darkMode.init();
  //set the search scope to "search " if clicked
  const searchScope1 = document.getElementById("searchScope1");
  searchScope1.addEventListener("click", () => {
      searchScope = searchScope1.value;
      setLocalStorage("searchScope", searchScope);  
  })
  //set the search scope to "intitle:" if clicked
  const searchScope2 = document.getElementById("searchScope2");
  searchScope2.addEventListener("click", () => {
      searchScope = searchScope2.value;
      console.log(searchScope);
      setLocalStorage("searchScope", searchScope);  
  })
  //set the search scope to "inauthor:" if clicked
  const searchScope3 = document.getElementById("searchScope3");
  searchScope3.addEventListener("click", () => {
      searchScope = searchScope3.value;
      console.log(searchScope);
      setLocalStorage("searchScope", searchScope);       
  })
  //set the search scope to "subject:" if clicked
  const searchScope4 = document.getElementById("searchScope4");
  searchScope4.addEventListener("click", () => {
      searchScope = searchScope4.value;
      console.log(searchScope);
      setLocalStorage("searchScope", searchScope);  
  })
}
//run this fuction that waits for the header and footer to load
loadPage();

  const buttons = [
    {selector: "#read_bttn", shelf: "read-shelf"},
    {selector: "#reading_bttn", shelf: "reading-shelf"},
    {selector: "#want_bttn", shelf: "want-read-shelf"},
  ];

  buttons.forEach(button => {
    let readButton = document.querySelector(button.selector);
    //add an event listener to that button that calls the "getShelvedBooks" method
    readButton.addEventListener("click", () => {
      //create a LibraryActions class object with "read-shelf" argument
      //to make it possible to access its "getShelvedBooks" method
      let shelf = new LibraryActions(button.shelf);
      //this will add the list of books they've read to the page
      shelf.getShelvedBooks();
    });
  });

    document.querySelector("#reading_bttn").setAttribute("class", ".active");

// //create a variable for the "Read Before" shelf button element
// let readButton = document.querySelector("#read_bttn");
// //add an event listener to that button that calls the "getShelvedBooks" method
// readButton.addEventListener("click", () => {
//   //create a LibraryActions class object with "read-shelf" argument
//   //to make it possible to access its "getShelvedBooks" method
//   let shelf = new LibraryActions("read-shelf");
//   //this will add the list of books they've read to the page
//   shelf.getShelvedBooks();
// });

// //create a variable for the "Reading Now" shelf button element
// let readingButton = document.querySelector("#reading_bttn");
// //add an event listener to that button that calls the "getShelvedBooks" method
// readingButton.addEventListener("click", () => {
//   //create a LibraryActions class object with "reading-shelf" argument
//   //to make it possible to access its "getShelvedBooks" method
//   let shelf = new LibraryActions("reading-shelf");
//   readingButton.setAttribute("class", ".active");
//   //this will add the list of books their reading to the page
//   shelf.getShelvedBooks();
// });

// //create a variable for the "Want to Read" shelf button element
// let wantButton = document.querySelector("#want_bttn");
// //add an event listener to that button that calls the "getShelvedBooks" method
// wantButton.addEventListener("click", () => {
//   //create a LibraryActions class object with "want-read-shelf" argument
//   //to make it possible to access its "getShelvedBooks" method
//   let shelf = new LibraryActions("want-read-shelf");
//   //this will add the list of books their reading to the page
//   shelf.getShelvedBooks();
// });

// Add active class to the current button (highlight it)
var header = document.getElementById("MyLIB");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

