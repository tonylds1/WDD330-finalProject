import { loadHeaderFooter } from "./utils.js";
import DarkMode from "./darkmode";

//put in the header & footer

async function loadPage() {
  await loadHeaderFooter();
  const darkMode = new DarkMode();
  darkMode.init();
}
loadPage();
