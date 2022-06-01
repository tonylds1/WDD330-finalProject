var u = (c, e, t) =>
  new Promise((o, n) => {
    var i = (l) => {
        try {
          a(t.next(l));
        } catch (r) {
          n(r);
        }
      },
      s = (l) => {
        try {
          a(t.throw(l));
        } catch (r) {
          n(r);
        }
      },
      a = (l) => (l.done ? o(l.value) : Promise.resolve(l.value).then(i, s));
    a((t = t.apply(c, e)).next());
  });
import {
  loadTemplate as f,
  renderListWithTemplate as b,
  getLocalStorage as h,
  setLocalStorage as y,
  runModal as p,
  getStars as v,
  doubleNumberInsert as g,
} from "./utils.js";
import k from "./externalServices.js";
let T = new k();
export default class I {
  constructor(e, t, o, n, i) {
    (this.searchScope = e),
      (this.searchTerm = t),
      (this.dataSource = o),
      (this.listElement = n),
      (this.searchBatchStart = i);
  }
  init() {
    return u(this, null, function* () {
      const e = document.getElementById("searchScope1");
      h("searchScope") == e.value &&
        ((e.checked = !0), (this.searchScope = e.value));
      const o = document.getElementById("searchScope2");
      h("searchScope") == o.value &&
        ((o.checked = !0), (this.searchScope = o.value));
      const i = document.getElementById("searchScope3");
      h("searchScope") == i.value &&
        ((i.checked = !0), (this.searchScope = i.value));
      const a = document.getElementById("searchScope4");
      h("searchScope") == a.value &&
        ((a.checked = !0), (this.searchScope = a.value)),
        console.log(this.searchScope);
      const r = yield this.dataSource.getBookData(
        this.searchScope,
        this.searchTerm,
        this.searchBatchStart
      );
      let m = document.querySelectorAll(".result-div");
      m.length > 0 &&
        m.forEach((S) => {
          S.parentNode.removeChild(S);
        }),
        this.searchBatchStart != 0
          ? document.querySelector(".rewinder").classList.remove("hide")
          : document.querySelector(".rewinder").classList.add("hide"),
        this.renderList(r.items);
    });
  }
  renderList(e) {
    return u(this, null, function* () {
      const t = yield f("./partials/searchResults.html");
      b(t, this.listElement, e, this.prepareTemplate);
      let o = document.querySelector(".back_to_top");
      o != null && o.parentNode.removeChild(o), p(_, q, !0);
      let n = document.querySelectorAll(".specialCount");
      g(n, this.searchBatchStart);
      let i = document.querySelector(".search_results_header");
      i.innerHTML =
        "(" +
        (this.searchBatchStart + 1) +
        "-" +
        (this.searchBatchStart + 40) +
        ")";
      let s = document.createElement("button");
      (s.type = "button"),
        (s.className = "back_to_top"),
        (s.innerHTML = "Back to the Top"),
        this.listElement.appendChild(s),
        s.addEventListener("click", () => {
          window.scrollTo(0, 0);
        });
    });
  }
  prepareTemplate(e, t) {
    try {
      e.querySelector("img").src = t.volumeInfo.imageLinks.smallThumbnail;
    } catch (r) {
      e.querySelector("img").src = "./images/bookCoverPlaceholder.gif";
    }
    (e.querySelector("img").alt = t.volumeInfo.title),
      (e.querySelector(".bookTitle").innerHTML = t.volumeInfo.title);
    let o = e.querySelector(".authors");
    try {
      t.volumeInfo.authors.forEach((r) => {
        o.innerHTML += `${r}, `;
      });
    } catch (r) {
      o.innerHTML += "No Author Listed, ";
    }
    (o.innerHTML = o.innerHTML.slice(0, -2)),
      t.volumeInfo.publisher
        ? (e.querySelector(".publisher").innerHTML += t.volumeInfo.publisher)
        : (e.querySelector(".publisher").innerHTML = "No Publisher Listed");
    const n = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let i = new Date(t.volumeInfo.publishedDate);
    (e.querySelector(".publishDate").innerHTML += i.toLocaleDateString(
      "en-US",
      n
    )),
      (e.querySelector(".addToShelfButtons").innerHTML = L(t.id));
    let s = e.querySelector(".addToReading");
    s.addEventListener("click", () =>
      u(this, null, function* () {
        let r = s.getAttribute("data-id");
        d(r, "reading-shelf");
      })
    );
    let a = e.querySelector(".addToRead");
    a.addEventListener("click", () =>
      u(this, null, function* () {
        let r = a.getAttribute("data-id");
        d(r, "read-shelf");
      })
    );
    let l = e.querySelector(".addToWantToRead");
    return (
      l.addEventListener("click", () =>
        u(this, null, function* () {
          let r = l.getAttribute("data-id");
          d(r, "want-read-shelf");
        })
      ),
      e
    );
  }
}
function d(c, e) {
  let t = h(e);
  t == null && (t = []);
  let o = new Date(),
    n = { id: c, now: o },
    i = !1;
  t.forEach((s) => {
    c == s.id && ((s.now = o), (i = !0));
  }),
    i == !1 && t.push(n),
    y(e, t);
}
function L(c) {
  return `<button class="addToReading" data-id="${c}">Reading</button>
    <button class="addToRead" data-id="${c}">Read</button>
    <button class="addToWantToRead" data-id="${c}">Want to Read</button>`;
}
function _(c) {
  return u(this, null, function* () {
    return (
      document.querySelectorAll(".addToReading").forEach((o) => {
        let n = o.getAttribute("data-id");
      }),
      yield T.findBookById(c, !1)
    );
  });
}
function q(c, e) {
  return u(this, null, function* () {
    let t = yield c;
    try {
      e.querySelector(".book_modal_img").src =
        t.volumeInfo.imageLinks.smallThumbnail;
    } catch (o) {
      e.querySelector(".book_modal_img").src =
        "./images/bookCoverPlaceholder.gif";
    }
    if (
      ((e.querySelector(".book_modal_img").alt = t.volumeInfo.title),
      (e.querySelector(".books_modal_title").innerHTML = t.volumeInfo.title),
      t.volumeInfo.subtitle
        ? (e.querySelector(".books_modal_title").innerHTML +=
            ": " + t.volumeInfo.subtitle)
        : (e.querySelector(".books_modal_title").innerHTML += ""),
      t.volumeInfo.authors
        ? (e.querySelector(".books_modal_authors").innerHTML +=
            t.volumeInfo.authors.join(", "))
        : (this.author = "No Author Listed"),
      t.volumeInfo.publishedDate
        ? (e.querySelector(".books_modal_publish_date").innerHTML += new Date(
            t.volumeInfo.publishedDate
          ).toDateString("en-US"))
        : (e.querySelector(".books_modal_publish_date").innerHTML +=
            "No Publish Date Listed"),
      t.volumeInfo.publisher
        ? (e.querySelector(".books_modal_publisher").innerHTML +=
            t.volumeInfo.publisher)
        : (e.querySelector(".books_modal_publisher").innerHTML +=
            "No Publisher Listed"),
      t.volumeInfo.printedPageCount
        ? (e.querySelector(".books_modal_page_count").innerHTML =
            t.volumeInfo.printedPageCount + " Pages")
        : (e.querySelector(".books_modal_page_count").innerHTML =
            "Book Length Not Given"),
      t.volumeInfo.categories
        ? (e.querySelector(".books_modal_genre").innerHTML =
            "Category: " + t.volumeInfo.categories)
        : (e.querySelector(".books_modal_genre").innerHTML =
            "Genre Not Listed"),
      t.volumeInfo.ratingsCount)
    ) {
      let o;
      t.volumeInfo.ratingsCount == 1 ? (o = " Review") : (o = " Reviews");
      let n = v(t.volumeInfo.averageRating);
      e.querySelector(".books_modal_ratings").innerHTML =
        t.volumeInfo.ratingsCount + o + " &nbsp; " + n;
    } else e.querySelector(".books_modal_ratings").innerHTML = "No Reviews";
    (e.querySelector(".books_modal_infoLink").href = t.volumeInfo.infoLink),
      (e.querySelector(".books_modal_previewLink").href =
        t.volumeInfo.previewLink),
      t.volumeInfo.previewLink
        ? (e.querySelector(".books_modal_summary").innerHTML =
            t.volumeInfo.description)
        : (e.querySelector(".books_modal_summary").innerHTML =
            "There is no summary given for this book.");
  });
}
