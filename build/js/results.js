import e from "./externalServices.js";
import { loadHeaderFooter as s, getParam as t } from "./utils.js";
import r from "./SearchResultsList.js";
s();
const c = t("searchInput"),
  o = new e(),
  a = document.querySelector(".searchResults"),
  n = new r(c, o, a);
n.init();
