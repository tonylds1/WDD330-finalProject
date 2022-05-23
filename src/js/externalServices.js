// example book request with googleBooks API

// https://www.googleapis.com/books/v1/volumes?q=search"<search>"

// e.g. 
// https://www.googleapis.com/books/v1/volumes?q=search"the+hungry+caterpillar"

const key = "AIzaSyCiVmg-pTPRBc_azcAvbcCBWQ6MPLSQHcM"
const baseURL = "https://www.googleapis.com/books/v1/volumes/"

 
   

function jsonTranslationPigeon(res) {
    const jsonPigeonResponse = res.json();
    if (res.ok) {
      return jsonPigeonResponse;
    } else {
        console.log("There is an error!")
        throw { name: "servicesError", message: jsonPigeonResponse };
    }
  } 

export default class ExternalServices {
constructor() {}
// get book data

async jsonPigeonTranslator(enteredSearch) {  
    const jsonPigeonResponse = await fetch(baseURL + `?q=search ${enteredSearch}
    &printType=books&maxResults=40&startIndex=39&key=` + key)
    const jsonPigeonTranslation = await jsonTranslationPigeon(jsonPigeonResponse)
    .catch(error => {
        //get error information if it happens
        console.log("There is an error!")
        throw { name: "errorType", message: jsonPigeonResponse }
    })
    if (!jsonPigeonResponse) {
        return; 
    }
    else {
        let books = jsonPigeonTranslation;
        books.items.forEach(book => {
            book.PreferredGenre = false;
            book.Rating = "Unrated";
        })
        console.log(jsonPigeonTranslation);
        return jsonPigeonTranslation
        }   
    }

    async pigeonBookDeliveryById(id) {
        let book = await fetch(baseURL + id)
        let jsonBook = await jsonTranslationPigeon(book)
        jsonBook.volumeInfo.PreferredGenre = false;
        jsonBook.volumeInfo.Rating = "Unrated";   
        console.log(jsonBook);
        return jsonBook;
        }

}