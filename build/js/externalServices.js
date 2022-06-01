var c = (r, o, s) =>
  new Promise((n, e) => {
    var u = (t) => {
        try {
          l(s.next(t));
        } catch (i) {
          e(i);
        }
      },
      a = (t) => {
        try {
          l(s.throw(t));
        } catch (i) {
          e(i);
        }
      },
      l = (t) => (t.done ? n(t.value) : Promise.resolve(t.value).then(u, a));
    l((s = s.apply(r, o)).next());
  });
const f = "https://www.googleapis.com/books/v1/volumes/";
function k(r) {
  return c(this, null, function* () {
    const o = r.json();
    if (r.ok) return o;
    throw (
      (console.log("There is an error!"), { name: "servicesError", message: o })
    );
  });
}
export default class d {
  constructor() {}
  getBookData(o, s = 0) {
    return c(this, null, function* () {
      const n = yield fetch(
          f +
            `?q=search ${o}
    &printType=books&maxResults=40&startIndex=${s}`
        ),
        e = yield k(n);
      return (
        e.items.forEach((a) => {
          (a.PreferredGenre = !1), (a.Rating = "Unrated");
        }),
        e
      );
    });
  }
  findBookById(o, s = !0) {
    return c(this, null, function* () {
      let n = yield fetch(f + o),
        e = yield k(n);
      return (
        s == !0 &&
          ((e.volumeInfo.PreferredGenre = !1),
          (e.volumeInfo.Rating = "Unrated")),
        e
      );
    });
  }
}
