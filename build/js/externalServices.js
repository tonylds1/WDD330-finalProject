var l = (n, e, o) =>
  new Promise((a, s) => {
    var c = (t) => {
        try {
          r(o.next(t));
        } catch (i) {
          s(i);
        }
      },
      u = (t) => {
        try {
          r(o.throw(t));
        } catch (i) {
          s(i);
        }
      },
      r = (t) => (t.done ? a(t.value) : Promise.resolve(t.value).then(c, u));
    r((o = o.apply(n, e)).next());
  });
const f = "https://www.googleapis.com/books/v1/volumes/";
function k(n) {
  return l(this, null, function* () {
    const e = n.json();
    if (n.ok) return e;
    throw (
      (console.log("There is an error!"), { name: "servicesError", message: e })
    );
  });
}
export default class d {
  constructor() {}
  getBookData(e, o, a = 0) {
    return l(this, null, function* () {
      const s = yield fetch(
          f +
            `?q=${e}${o}
    &printType=books&maxResults=40&startIndex=${a}`
        ),
        c = yield k(s);
      return (
        c.items.forEach((r) => {
          (r.PreferredGenre = !1), (r.Rating = "Unrated");
        }),
        c
      );
    });
  }
  findBookById(e, o = !0) {
    return l(this, null, function* () {
      let a = yield fetch(f + e),
        s = yield k(a);
      return (
        o == !0 &&
          ((s.volumeInfo.PreferredGenre = !1),
          (s.volumeInfo.Rating = "Unrated")),
        s
      );
    });
  }
}
