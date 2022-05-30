// import ElectronicPigeon from "./ePigeonCourierServices.js";
import ExternalServices from "./externalServices.js";
import { loadHeaderFooter, getParam } from "./utils.js";
import SearchResults from "./SearchResultsList.js";
import DarkMode from "./darkmode";

//put in the header & footer
// loadHeaderFooter();
async function loadPage() {
    await loadHeaderFooter();
    const darkMode = new DarkMode
    darkMode.init()
  }
  loadPage()

// Get the search input and display the results
const search = getParam("searchInput");
const externalServices = new ExternalServices();
const listElement = document.querySelector(".searchResults");

const searchResults = new SearchResults(search, externalServices, listElement);
searchResults.init();
