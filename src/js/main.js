import ExternalServices from "./externalServices.js";
import { loadHeaderFooter, setLocalStorage } from "./utils.js";

//put in the header & footer
loadHeaderFooter();

//This is with the new folder name
let connection = new ExternalServices();
let enteredSearch = "cars";
let bookId = "Zkp1AwAAQBAJ";
//can use this to increment to the next 40 if
//desired result is not found in the first 40
let searchBatch = 0;

let searchResult = connection.getBookData(enteredSearch, searchBatch);
console.log(searchResult)

let book = connection.findBookById(bookId);
console.log(book);
setLocalStorage("read-shelf", book);
