var u = (e, t, o) =>
  new Promise((n, r) => {
    var s = (c) => {
        try {
          a(o.next(c));
        } catch (l) {
          r(l);
        }
      },
      i = (c) => {
        try {
          a(o.throw(c));
        } catch (l) {
          r(l);
        }
      },
      a = (c) => (c.done ? n(c.value) : Promise.resolve(c.value).then(s, i));
    a((o = o.apply(e, t)).next());
  });
function b(e) {
  try {
    if (e.ok) return e.text();
    throw new Error("Bad Response");
  } catch (t) {}
}
export function loadTemplate(e) {
  return u(this, null, function* () {
    const t = yield fetch(e).then(b),
      o = document.createElement("template");
    return (o.innerHTML = t), o;
  });
}
export function renderListWithTemplate(e, t, o, n, r) {
  o.forEach((s) => {
    const i = e.content.cloneNode(!0),
      a = n(i, s);
    t.appendChild(a);
  });
}
export function renderWithTemplate(e, t, o, n) {
  let r = e.content.cloneNode(!0);
  n && (r = n(r, o)), t.appendChild(r);
}
export function loadHeaderFooter() {
  return u(this, null, function* () {
    let e, t;
    (e = yield loadTemplate("./partials/header.html")),
      (t = yield loadTemplate("./partials/footer.html"));
    const o = document.querySelector("header"),
      n = document.querySelector("footer");
    renderWithTemplate(e, o), renderWithTemplate(t, n);
  });
}
export function getLocalStorage(e) {
  return JSON.parse(localStorage.getItem(e));
}
export function setLocalStorage(e, t) {
  localStorage.setItem(e, JSON.stringify(t));
}
export function getParam(e) {
  const t = window.location.search;
  return new URLSearchParams(t).get(e);
}
export function alertMessage(e, t, o = !0) {
  const n = document.createElement("p");
  (n.className = "alert"),
    (n.innerHTML = e + "<span class='x-out' id=" + t + ">X</span>"),
    n.addEventListener("click", () => {
      r.removeChild(n);
    });
  const r = document.querySelector("main");
  r.prepend(n), o && window.scrollTo(0, 0);
}
export function removeAllInserts(e, t) {
  document
    .querySelectorAll("." + e)
    .forEach((n) => document.querySelector(`.${t}`).removeChild(n));
}
export function insertTitle(e, t) {
  const o = document.querySelectorAll(".shelf_title");
  (o.className = "delete_me"),
    o.className === "delete_me" && o.forEach((r) => e.removeChild(r));
  let n = document.createElement("h1");
  (n.className = "shelf_title"),
    (n.innerHTML = `Welcome to Your ${t}!`),
    e.prepend(n);
}
export function insertBookCount(e) {
  removeAllInserts("count_message", "opening");
  const t = document.createElement("p");
  (t.className = "count_message"),
    (t.innerHTML = `This shelf has &nbsp;*&nbsp; <span class="count">${e}</span> &nbsp;*&nbsp; books presently.`),
    console.log(t.innerHTML);
  const o = document.querySelector("main");
  console.log(o.firstChild.nextSibling),
    o.insertBefore(t, o.firstChild.nextSibling);
}
export const selectElement = (e) => {
    const t = document.querySelector(e);
    if (t) return t;
    throw new Error(
      `Double check your '${t}' seletor and make sure it's typed correctly`
    );
  },
  isNullOrUndefined = (e) => e == null || e == null;
export function runModal(e, t, o = !1) {
  let n,
    r = document.querySelectorAll(".modal"),
    s = 0;
  r.forEach((l) => {
    l.setAttribute("data-id", "match" + s), s++;
  });
  let i = document.querySelectorAll(".details_bttn"),
    a = 0;
  i.forEach((l) => {
    (l.id = "details_bttn" + a), l.setAttribute("data-id", "match" + a);
    let d = document.getElementById("details_bttn" + a);
    (d.onclick = function () {
      r.forEach((m) => {
        if (m.getAttribute("data-id") == d.getAttribute("data-id")) {
          if (o == !0) {
            let p =
              d.previousElementSibling.lastElementChild.previousElementSibling
                .previousElementSibling.firstElementChild;
            console.log(p);
            let f = p.getAttribute("data-id");
            console.log(f);
            let h = d.nextElementSibling;
            console.log(h);
            let g = e(f);
            t(g, h);
          }
          n = m;
        }
      }),
        (n.style.display = "block");
    }),
      a++;
  }),
    document.querySelectorAll(".close").forEach((l) => {
      l.onclick = function () {
        n.style.display = "none";
      };
    }),
    (window.onclick = function (l) {
      l.target == n && (n.style.display = "none");
    });
}
export function getStars(e) {
  let t = Math.round(e * 2) / 2,
    o = [];
  for (var n = t; n >= 1; n--)
    o.push(
      "<i class='fa fa-star' aria-hidden='true' style='color: gold;'></i>&nbsp;"
    );
  n == 0.5 &&
    o.push(
      "<i class='fa fa-star-half-o' aria-hidden='true' style='color: gold;'></i>&nbsp;"
    );
  for (let r = 5 - t; r >= 1; r--)
    o.push(
      "<i class='fa fa-star-o' aria-hidden='true' style='color: gold;'></i>&nbsp;"
    );
  return o.join("");
}
export function doubleNumberInsert(e, t) {
  let o = t,
    n = 0;
  e.forEach((r) => {
    n % 2 == 0 && o++, (r.innerHTML = o), n++;
  });
}
