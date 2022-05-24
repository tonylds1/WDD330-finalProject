//this module is used for most of the work done on the library.html page
import { grabLocalStorage, feedLocalStorage } from "./flyInNutsAndBolts.js"
import ElectronicPigeon from "./ePigeonCourierServices.js"

//create variable for ElectonicPigeon Module
let wire = ElectronicPigeon();

//class for external use as a module
export default class LibraryDeliveryBeak {
    constructor() {}

    bookShelfFeeder(button) {
        //create a listener even for a button click
        button.addEventListener("click", async () => {
        //create variable for the element to insert list into
        const listInsertionPoint = document.getElementById("my_book_lists");        
        let readList = await grabLocalStorage("read_shelf");

        readList = ["QwpEt9vUgBcC","LHfgyAEACAAJ","dI1AOAAACAAJ","t9czswEACAAJ","Zkp1AwAAQBAJ","yxfvwwEACAAJ","TtsRMQAACAAJ"]

        if (readList == null) {
            readList = [];
            feedLocalStorage("read_shelf", readList);
        }
        let displayList = readList.forEach(bookId => {
            let myBook = wire.pigeonBookDeliveryById(bookId, false);
            //code to post book onto template
        })
    }); 
    }
}

