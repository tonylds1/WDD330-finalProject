//************************************************************************************* */
// Retrieving a specific volume
// You can retrieve information for a specific volume by sending an
//HTTP GET request to the Volume resource URI:

// https://www.googleapis.com/books/v1/volumes/volumeId
// Replace the volumeId path parameter with the ID of the volume to retrieve.
//See the Google Books IDs section for more information on volume IDs.

// Request
// Here is an example of a GET request that gets a single volume:

// GET https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey
//************************************************************************************** */
// Working with volumes
// Performing a search
// You can perform a volumes search by sending an HTTP GET request to the following URI:

// https://www.googleapis.com/books/v1/volumes?q=search+terms
// This request has a single required parameter:

// q - Search for volumes that contain this text string.
// There are special keywords you can specify in the search terms
// to search in particular fields, such as:
//
// intitle: Returns results where the text following this keyword is found in the title.
// inauthor: Returns results where the text following this keyword is found in the author.
// inpublisher: Returns results where the text following this keyword is found in the publisher.
// subject: Returns results where the text following this keyword is listed in the
// category list of the volume.
// isbn: Returns results where the text following this keyword is the ISBN number.
// lccn: Returns results where the text following this keyword is the Library of
// Congress Control Number.
// oclc: Returns results where the text following this keyword is the Online Computer
// Library Center number.
// Request
// Here is an example of searching for Daniel Keyes' "Flowers for Algernon":
// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
// Note: Performing a search does not require authentication, so you do not have to provide
//the Authorization HTTP header with the GET request. However, if the call is made with
//authentication, each Volume will include user-specific information, such as purchased status.
//******************************************************************************************* */
//(my API key) const key = AIzaSyCiVmg-pTPRBc_azcAvbcCBWQ6MPLSQHcM
//To cycle through all the contents use &startIndex=0
//To limit rusults to only books use &printType=books
//To sort by newest use &orderBy=newest  - &orderBy=relevance is the default
// https://www.googleapis.com/books/v1/volumes/volumeId
// Replace the volumeId path parameter with the ID of the volume to retrieve.

const key = "AIzaSyCiVmg-pTPRBc_azcAvbcCBWQ6MPLSQHcM";
const baseURL = "https://www.googleapis.com/books/v1/volumes/";

// convert response to a json object
async function jsonTranslationPigeon(res) {
  const jsonPigeonResponse = res.json();
  if (res.ok) {
    return jsonPigeonResponse;
  } else {
    console.log("There is an error!");
    throw { name: "servicesError", message: jsonPigeonResponse };
  }
}

// class for external use as a module
export default class ElectronicPigeon {
  constructor() {}

  // get book list in increments of 40
  async bookListDeliveryPigeon40(enteredSearch, searchBatch) {
    const booksPigeonDelivered = await fetch(
      baseURL +
        `?q=search ${enteredSearch}
    &printType=books&maxResults=40&startIndex=${searchBatch}&key=` +
        key
    );
    const booksPigeonTranslated = await jsonTranslationPigeon(
      booksPigeonDelivered
    );
    let books = booksPigeonTranslated;
    books.items.forEach((book) => {
      book.PreferredGenre = false;
      book.Rating = "Unrated";
    });
    console.log(booksPigeonTranslated);
    return booksPigeonTranslated;
  }
  // get book by id
  async pigeonBookDeliveryById(id, set = true) {
    let book = await fetch(baseURL + id);
    let jsonBook = await jsonTranslationPigeon(book);
    if (set == true) {
      jsonBook.volumeInfo.PreferredGenre = false;
      jsonBook.volumeInfo.Rating = "Unrated";
    }
    console.log(jsonBook);
    return jsonBook;
  }
}
