var m = (e, t, o) =>
  new Promise((n, r) => {
    var l = (c) => {
        try {
          s(o.next(c));
        } catch (i) {
          r(i);
        }
      },
      a = (c) => {
        try {
          s(o.throw(c));
        } catch (i) {
          r(i);
        }
      },
      s = (c) => (c.done ? n(c.value) : Promise.resolve(c.value).then(l, a));
    s((o = o.apply(e, t)).next());
  });
function u(e) {
  try {
    if (e.ok) return e.text();
    throw new Error("Bad Response");
  } catch (t) {}
}
export function loadTemplate(e) {
  return m(this, null, function* () {
    const t = yield fetch(e).then(u),
      o = document.createElement("template");
    return (o.innerHTML = t), o;
  });
}
export function renderListWithTemplate(e, t, o, n) {
  o.forEach((r) => {
    const l = e.content.cloneNode(!0),
      a = n(l, r);
    t.appendChild(a);
  });
}
export function renderWithTemplate(e, t, o, n) {
  let r = e.content.cloneNode(!0);
  n && (r = n(r, o)), t.appendChild(r);
}
export function loadHeaderFooter() {
  return m(this, null, function* () {
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
    (t.innerHTML = `You have &nbsp;- <span class="count">${e}</span> -&nbsp; total books on this shelf.`),
    console.log(t.innerHTML);
  const o = document.querySelector("main");
  console.log(o.firstChild.nextSibling),
    o.insertBefore(t, o.firstChild.nextSibling);
}
