var n = (u, o, t) =>
  new Promise((s, e) => {
    var l = (a) => {
        try {
          i(t.next(a));
        } catch (r) {
          e(r);
        }
      },
      h = (a) => {
        try {
          i(t.throw(a));
        } catch (r) {
          e(r);
        }
      },
      i = (a) => (a.done ? s(a.value) : Promise.resolve(a.value).then(l, h));
    i((t = t.apply(u, o)).next());
  });
import {
  getLocalStorage as c,
  setLocalStorage as d,
  alertMessage as m,
  removeAllInserts as b,
  insertTitle as f,
  insertBookCount as g,
} from "./utils.js";
import k from "./externalServices.js";
let p = new k();
export default class v {
  constructor(o) {
    (this.storageKey = o),
      (this.bookShelf = []),
      (this.book = {}),
      (this.bookCover = "./images/bookCoverPlaceholder.png"),
      (this.author = "No Author Listed"),
      (this.publisher = "No Publisher Listed"),
      (this.publishDate = "No Publish Date Listed"),
      (this.header = ""),
      (this.bttnNameNow = ""),
      (this.bttnNameBefore = ""),
      (this.bttnNameWant = ""),
      (this.bookCount = 0);
  }
  getShelvedBooks() {
    return n(this, null, function* () {
      const o = document.getElementById("my_book_lists"),
        t = document.getElementById("card-container");
      if (
        (this.selectShelfName(this.storageKey),
        (this.bookShelf = yield c(this.storageKey)),
        this.changeNullShelfToList(this.storageKey),
        this.bookShelf.length < 1)
      )
        (t.innerHTML = ""),
          (o.innerHTML = this.renderBanner()),
          this.addShelfTitleAndEmptyShelfMessage(o);
      else {
        t.innerHTML = "";
        let s = this.header + " Shelf!";
        f(o, s),
          b("alert", "opening"),
          g(this.bookCount),
          this.bookShelf.length >= 1 && b("banner2", "opening"),
          this.displayBooksFromShelf(t);
      }
    });
  }
  selectShelfName() {
    this.storageKey == "reading-shelf"
      ? ((this.header = "Reading Now"),
        (this.bttnNameNow = "Remove"),
        (this.bttnNameBefore = "Read Before"),
        (this.bttnNameWant = "Want to Read"))
      : this.storageKey == "read-shelf"
      ? ((this.header = "Read Before"),
        (this.bttnNameNow = "Reading Now"),
        (this.bttnNameBefore = "Remove"),
        (this.bttnNameWant = "Want to Read"))
      : this.storageKey == "want-read-shelf" &&
        ((this.header = "Want To Read"),
        (this.bttnNameNow = "Reading Now"),
        (this.bttnNameBefore = "Read Before"),
        (this.bttnNameWant = "Remove"));
  }
  changeNullShelfToList() {
    this.bookShelf == null &&
      ((this.bookShelf = []), d(this.storageKey, this.bookShelf));
  }
  addShelfTitleAndEmptyShelfMessage(o) {
    b("alert", "opening"),
      m("Nothing is here, try adding a book!", "my_book_lists", !1);
    let s = this.header + " Shelf!";
    f(o, s);
  }
  displayBooksFromShelf(o) {
    return n(this, null, function* () {
      let t = document.querySelector(".count");
      for (const s of this.bookShelf) {
        this.book = yield p.findBookById(s.id, !1);
        try {
          this.bookCover = this.book.volumeInfo.imageLinks.smallThumbnail;
        } catch (e) {
          this.bookCover = "./images/bookCoverPlaceholder.gif";
        }
        this.book.volumeInfo.authors
          ? (this.author = this.book.volumeInfo.authors.join(", "))
          : (this.author = "No Author Listed"),
          this.book.volumeInfo.publisher
            ? (this.publisher = this.book.volumeInfo.publisher)
            : (this.publisher = "No Publisher Listed"),
          this.book.volumeInfo.publishedDate
            ? (this.publishDate = new Date(
                this.book.volumeInfo.publishedDate
              ).toDateString("en-US"))
            : (this.publishDate = "No Publish Date Listed"),
          this.bookCount++,
          (o.innerHTML += this.renderProductDetails()),
          this.addBttnFunctionality();
      }
      (t.innerHTML = this.bookCount), (this.bookCount = 0);
    });
  }
  bookCount() {}
  renderBanner() {
    return `
    <div class="banner2">
      <p>
        Search for books and create your personal library of books you desire
        to read, books you are reading and completed.
      </p>
    </div>
    <section id="card-container">
    <!-- List for each book shelf of "Read"/"Reading"/"Want to Read" -->
    </section>
      `;
  }
  renderProductDetails() {
    return `
      <div class="result-div card_size">
        <div class="book_count">
          <span class="specialCount">${this.bookCount}</span>       
          <img
            src="${this.bookCover}"
            alt="Cover for ${this.book.volumeInfo.title}"
          />
          <div>
            <p class="shelf_label"><b><u>Current Shelf</u>:</b></p>
            <p class="current_shelf"><b>  ${this.header}</b></p>
          </div>
        </div>
        <div class="book-details">
          <h3 class="bookTitle">${this.book.volumeInfo.title}</h3>
          <hr>
          <p class="authors">By: ${this.author}</p>
          <br>
          <p class="publishDate">Published on ${this.publishDate}</p>
          <p class="publisher">by ${this.publisher}</p>
          <br><br>
          <div class="addToShelfButtons">
            <button class="addToReading" data-id="${this.book.id}">${this.bttnNameNow}</button>          
            <button class="addToWantToRead" data-id="${this.book.id}">${this.bttnNameWant}</button>
            <button class="addToRead" data-id="${this.book.id}">${this.bttnNameBefore}</button>
          </div>         
        </div>
      </div>
    `;
  }
  addBttnFunctionality() {
    document.querySelectorAll(".addToReading").forEach((e) => {
      e.textContent == "Remove"
        ? (e.className += " book_delete")
        : (e.className += " book_add"),
        e.addEventListener("click", () =>
          n(this, null, function* () {
            let l = e.getAttribute("data-id");
            this.alterShelf(l, "reading-shelf");
          })
        );
    }),
      document.querySelectorAll(".addToRead").forEach((e) => {
        e.textContent == "Remove"
          ? (e.className += " book_delete")
          : (e.className += " book_add"),
          e.addEventListener("click", () =>
            n(this, null, function* () {
              let l = e.getAttribute("data-id");
              this.alterShelf(l, "read-shelf");
            })
          );
      }),
      document.querySelectorAll(".addToWantToRead").forEach((e) => {
        e.textContent == "Remove"
          ? (e.className += " book_delete")
          : (e.className += " book_add"),
          e.addEventListener("click", () =>
            n(this, null, function* () {
              let l = e.getAttribute("data-id");
              this.alterShelf(l, "want-read-shelf");
            })
          );
      });
  }
  alterShelf(o, t) {
    let s = c(t);
    s == null && (s = []);
    let e = new Date(),
      l = { id: o, now: e },
      h = !1;
    if (
      (s.forEach((i) => {
        o == i.id
          ? ((i.now = e), (h = !0), (i.duplicate = !0))
          : (i.duplicate = !1);
      }),
      this.storageKey == t)
    ) {
      let i = [];
      s.forEach((a) => {
        console.log(a.duplicate), a.duplicate == !1 && i.push(a);
      }),
        console.log(i),
        d(t, i),
        this.getShelvedBooks(),
        console.log("You got this far.");
    } else
      console.log(o + " / storageKey = " + this.storageKey + " / Shelf = " + t),
        h == !1 && ((l.duplicate = !1), s.push(l)),
        d(t, s),
        console.log("You're running this code!");
  }
}
