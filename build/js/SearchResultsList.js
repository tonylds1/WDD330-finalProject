var c = (n, e, t) =>
  new Promise((r, s) => {
    var d = (i) => {
        try {
          l(t.next(i));
        } catch (a) {
          s(a);
        }
      },
      o = (i) => {
        try {
          l(t.throw(i));
        } catch (a) {
          s(a);
        }
      },
      l = (i) => (i.done ? r(i.value) : Promise.resolve(i.value).then(d, o));
    l((t = t.apply(n, e)).next());
  });
import {
  loadTemplate as h,
  renderListWithTemplate as T,
  getLocalStorage as g,
  setLocalStorage as f,
} from "./utils.js";
export default class L {
  constructor(e, t, r) {
    (this.searchTerm = e), (this.dataSource = t), (this.listElement = r);
  }
  init() {
    return c(this, null, function* () {
      const e = yield this.dataSource.getBookData(this.searchTerm);
      console.log(e), this.renderList(e.items);
    });
  }
  renderList(e) {
    return c(this, null, function* () {
      const t = yield h("./partials/searchResults.html");
      T(t, this.listElement, e, this.prepareTemplate);
    });
  }
  prepareTemplate(e, t) {
    try {
      e.querySelector("img").src = t.volumeInfo.imageLinks.smallThumbnail;
    } catch (a) {
      e.querySelector("img").src = "./images/bookCoverPlaceholder.gif";
    }
    (e.querySelector("img").alt = t.volumeInfo.title),
      (e.querySelector(".bookTitle").innerHTML = t.volumeInfo.title);
    let r = e.querySelector(".authors");
    try {
      t.volumeInfo.authors.forEach((a) => {
        r.innerHTML += `${a}, `;
      });
    } catch (a) {
      r.innerHTML += "No Author Listed, ";
    }
    (r.innerHTML = r.innerHTML.slice(0, -2)),
      (e.querySelector(".publisher").innerHTML += t.volumeInfo.publisher);
    const s = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let d = new Date(t.volumeInfo.publishedDate);
    (e.querySelector(".publishDate").innerHTML += d.toLocaleDateString(
      "en-US",
      s
    )),
      (e.querySelector(".addToShelfButtons").innerHTML = y(t.id));
    let o = e.querySelector(".addToReading");
    o.addEventListener("click", () =>
      c(this, null, function* () {
        let a = o.getAttribute("data-id");
        u(a, "reading-shelf"), console.log(a);
      })
    );
    let l = e.querySelector(".addToRead");
    l.addEventListener("click", () =>
      c(this, null, function* () {
        let a = l.getAttribute("data-id");
        u(a, "read-shelf"), console.log(a);
      })
    );
    let i = e.querySelector(".addToWantToRead");
    return (
      i.addEventListener("click", () =>
        c(this, null, function* () {
          let a = i.getAttribute("data-id");
          u(a, "want-read-shelf"), console.log(a);
        })
      ),
      e
    );
  }
}
function u(n, e) {
  let t = g(e);
  t == null && (t = []);
  let r = new Date(),
    s = { id: n, now: r },
    d = !1;
  t.forEach((o) => {
    n == o.id && ((o.now = r), (d = !0));
  }),
    d == !1 && t.push(s),
    f(e, t);
}
function y(n) {
  return `<button class="addToReading" data-id="${n}">Reading</button>
    <button class="addToRead" data-id="${n}">Read</button>
    <button class="addToWantToRead" data-id="${n}">Want to Read</button>`;
}
