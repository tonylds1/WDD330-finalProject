var h = (e, l, c) =>
  new Promise((s, a) => {
    var r = (o) => {
        try {
          n(c.next(o));
        } catch (d) {
          a(d);
        }
      },
      p = (o) => {
        try {
          n(c.throw(o));
        } catch (d) {
          a(d);
        }
      },
      n = (o) => (o.done ? s(o.value) : Promise.resolve(o.value).then(r, p));
    n((c = c.apply(e, l)).next());
  });
import { loadHeaderFooter as i, setLocalStorage as t } from "./utils.js";
import S from "./darkmode.js";
function m() {
  return h(this, null, function* () {
    t("searchScope", "search ");
    let e = "search ";
    yield i(), new S().init();
    const c = document.getElementById("searchScope1");
    c.addEventListener("click", () => {
      (e = c.value), t("searchScope", e);
    });
    const s = document.getElementById("searchScope2");
    s.addEventListener("click", () => {
      (e = s.value), console.log(e), t("searchScope", e);
    });
    const a = document.getElementById("searchScope3");
    a.addEventListener("click", () => {
      (e = a.value), console.log(e), t("searchScope", e);
    });
    const r = document.getElementById("searchScope4");
    r.addEventListener("click", () => {
      (e = r.value), console.log(e), t("searchScope", e);
    });
  });
}
m();
