import { loadHeaderFooter as r } from "./utils.js";
import t from "./libraryActions.js";
r();
let s = document.querySelector("#read_bttn");
s.addEventListener("click", () => {
  new t("read-shelf").getShelvedBooks();
});
let n = document.querySelector("#reading_bttn");
n.addEventListener("click", () => {
  let e = new t("reading-shelf");
  n.setAttribute("class", ".active"), e.getShelvedBooks();
});
let c = document.querySelector("#want_bttn");
c.addEventListener("click", () => {
  new t("want-read-shelf").getShelvedBooks();
});
for (
  var o = document.getElementById("MyLIB"),
    l = o.getElementsByClassName("btn"),
    a = 0;
  a < l.length;
  a++
)
  l[a].addEventListener("click", function () {
    var e = document.getElementsByClassName("active");
    (e[0].className = e[0].className.replace(" active", "")),
      (this.className += " active");
  });
