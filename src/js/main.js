import { loadHeaderFooter, setLocalStorage } from "./utils.js";

// setLocalStorage("searchScope", "search ");
async function loadSearchScope() {
    //set the search scope to the default of search all
    setLocalStorage("searchScope", "search ");
    //set search default value first
    let searchScope = "search ";
    //then put in the header & footer next
    await loadHeaderFooter();
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
loadSearchScope();