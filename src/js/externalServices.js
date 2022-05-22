// example book request with googleBooks API

// https://www.googleapis.com/books/v1/volumes?q=search"<search>"

// e.g. 
// https://www.googleapis.com/books/v1/volumes?q=search"the+hungry+caterpillar"

const baseURL = "// https://www.googleapis.com/books/v1/volumes?q=search"

  async function jsonPigeonTranslator(SearchRes) {
    let count = 0;
    const jsonPigeonResponse = await fetch("../json/books.json")
    .then(jsonPigeonResponse.json())
    .catch(error => {
        //get error information if it happens
        throw { name: "errorType", message: jsonPigeonResponse }
    })
    if (!jsonPigeonResponse) return; 
    else if (jsonPigeonResponse == SearchRes) {
      jsonPigeonResponse.forEach(book => {
        count++
        if (count == 40){
            return jsonPigeonResponse
        }        
      })
    }  
  };


export default class ElectronicPigeon {
constructor() {}
// get book data
getBookList(category, searchRes) {
    let books = fetch(baseURL + `${category}`)
    .then(jsonPigeonTranslator(searchRes))
    .then((data) => {
        books = data.Result;
        books.forEach((book) => {
        book.PreferredGenre = false;
        book.Rating = "Unrated";
        });
        return books;
    });
    // console.log(books);
    return books;
}

async findBookById(id) {
    let book = fetch(baseURL + `book/${id}`)
      .then(jsonPigeonTranslator(id))
      .then((data) => {
        book = data.Result;
        book.PreferredGenre = false;
        book.Rating = "Unrated";
        return book;
      });
    // console.log(book);
    return book;
  }

}