// import ElectronicPigeon from "./ePigeonCourierServices.js";
import ExternalServices from "./externalServices.js";
import { loadHeaderFooter, getParam, setLocalStorage } from "./utils.js";
import SearchResults from "./SearchResultsList.js";
import DarkMode from "./darkmode";

async function loadSearchScope() {
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
//get the element for the button to rewind 
//the search results to the next 40 results
const rewindBttn = document.querySelector(".rewinder");
//set an even listening for someone clicking it
rewindBttn.addEventListener("click", () => {
    if (searchBatchStart != 0) {
    searchBatchStart -= 40;
    // console.log(searchBatchStart);
    const searchResults2 = new SearchResults(searchScope, search, externalServices, 
        listElement, searchBatchStart);
    searchResults2.init();
    }
})
//get the element for the button to advance 
//the search results to the next 40 results
const advanceBttn = document.querySelector(".advancer");
//set an even listening for someone clicking it
advanceBttn.addEventListener("click", () => {
    searchBatchStart += 40;
    console.log(searchBatchStart);
    const searchResults2 = new SearchResults(searchScope, search, 
        externalServices, listElement, searchBatchStart);
    searchResults2.init();
})
//initilize the search using the different parameters
const searchResults = new SearchResults(searchScope, search, externalServices, 
    listElement, searchBatchStart);
searchResults.init();    
}
//run this fuction that waits for the header and footer to load
loadSearchScope();
//set the starting point for a search
let searchBatchStart = 0;
// Get the search input and display the results
const search = getParam("searchInput");
const externalServices = new ExternalServices();
const listElement = document.querySelector(".searchResults");

