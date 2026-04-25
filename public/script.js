const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}
