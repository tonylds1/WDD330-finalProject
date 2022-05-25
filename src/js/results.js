// import ElectronicPigeon from "./ePigeonCourierServices.js";
import ExternalServices from "./externalServices.js";
import { loadHeaderFooter, getParam } from "./utils.js";

const externalServices = new ExternalServices
//put in the header & footer
loadHeaderFooter();

//This is with the new folder name
// let pigeon = new ElectronicPigeon();
// let enteredSearch = "cars";
// let bookId = "Zkp1AwAAQBAJ";
// //can use this to increment to the next 40 if
// //desired result is not found in the first 40
// let searchBatch = 0;

// // let pigeonResult = pigeon.bookListDeliveryPigeon40(enteredSearch, searchBatch);
// // console.log(pigeonResult)

// // let book = pigeon.pigeonBookDeliveryById(bookId);
// // console.log(book);
// // feedLocalStorage("read-shelf", book);

const search = getParam("searchInput");
// console.log(search)

let results = externalServices.getBookData(search)
console.log(results)