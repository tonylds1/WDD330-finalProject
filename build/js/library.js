var h = (e, n, t) =>
  new Promise((o, a) => {
    var r = (c) => {
        try {
          l(t.next(c));
        } catch (d) {
          a(d);
        }
      },
      u = (c) => {
        try {
          l(t.throw(c));
        } catch (d) {
          a(d);
        }
      },
      l = (c) => (c.done ? o(c.value) : Promise.resolve(c.value).then(r, u));
    l((t = t.apply(e, n)).next());
  });
import { loadHeaderFooter as v, setLocalStorage as s } from "./utils.js";
import p from "./libraryActions.js";
import S from "./darkmode.js";
function g() {
  return h(this, null, function* () {
    s("searchScope", "search ");
    let e = "search ";
    yield v(), new S().init();
    const t = document.getElementById("searchScope1");
    t.addEventListener("click", () => {
      (e = t.value), s("searchScope", e);
    });
    const o = document.getElementById("searchScope2");
    o.addEventListener("click", () => {
      (e = o.value), console.log(e), s("searchScope", e);
    });
    const a = document.getElementById("searchScope3");
    a.addEventListener("click", () => {
      (e = a.value), console.log(e), s("searchScope", e);
    });
    const r = document.getElementById("searchScope4");
    r.addEventListener("click", () => {
      (e = r.value), console.log(e), s("searchScope", e);
    });
  });
}
g();
const f = [
  { selector: "#read_bttn", shelf: "read-shelf" },
  { selector: "#reading_bttn", shelf: "reading-shelf" },
  { selector: "#want_bttn", shelf: "want-read-shelf" },
];
f.forEach((e) => {
  document.querySelector(e.selector).addEventListener("click", () => {
    new p(e.shelf).getShelvedBooks();
  });
}),
  document.querySelector("#reading_bttn").setAttribute("class", ".active");
for (
  var E = document.getElementById("MyLIB"),
    m = E.getElementsByClassName("btn"),
    i = 0;
  i < m.length;
  i++
)
  m[i].addEventListener("click", function () {
    var e = document.getElementsByClassName("active");
    (e[0].className = e[0].className.replace(" active", "")),
      (this.className += " active");
  });
