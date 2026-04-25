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

const race = document.querySelector(".race");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (race && !reduceMotion.matches) {
  const RACER_SRC = "/assets/favicon-32.png";

  function spawn() {
    const wrap = document.createElement("div");
    wrap.className = "racer-wrap";

    const img = document.createElement("img");
    img.src = RACER_SRC;
    img.alt = "";
    img.className = "racer-bob";

    const duration = 4 + Math.random() * 5;
    const yOffset = (Math.random() - 0.5) * 14;

    wrap.style.animationDuration = `${duration.toFixed(2)}s`;
    wrap.style.marginTop = `${(yOffset - 16).toFixed(1)}px`;

    wrap.appendChild(img);
    race.appendChild(wrap);

    setTimeout(() => wrap.remove(), duration * 1000 + 200);
  }

  function loop() {
    spawn();
    setTimeout(loop, 250 + Math.random() * 1500);
  }

  setTimeout(loop, 500);
}

const heroLogo = document.querySelector(".hero-logo");
const heroInner = document.querySelector(".hero-inner");

if (heroLogo && heroInner) {
  const messages = [
    "Caught you 🦌💫",
    "You found me ✨",
    "Hi there 👋 nice to see you",
    "Spotted 🌈",
    "Leap leap leap 🏃",
  ];
  const confettiBits = ["🌈", "✨", "💫", "🦌", "⭐", "🏃", "🧗", "🥾"];
  let leaping = false;

  heroLogo.addEventListener("click", () => {
    if (leaping) return;
    leaping = true;

    if (!reduceMotion.matches) {
      heroLogo.classList.add("is-leaping");

      const logoRect = heroLogo.getBoundingClientRect();
      const innerRect = heroInner.getBoundingClientRect();
      const cx = logoRect.left + logoRect.width / 2 - innerRect.left;
      const cy = logoRect.top + logoRect.height / 2 - innerRect.top;

      for (let i = 0; i < 14; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti";
        piece.textContent =
          confettiBits[Math.floor(Math.random() * confettiBits.length)];
        piece.style.left = `${cx}px`;
        piece.style.top = `${cy}px`;
        heroInner.appendChild(piece);

        const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.4;
        const distance = 100 + Math.random() * 100;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const rot = (Math.random() - 0.5) * 720;

        requestAnimationFrame(() => {
          piece.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
          piece.style.opacity = "0";
        });

        setTimeout(() => piece.remove(), 1100);
      }

      setTimeout(() => heroLogo.classList.remove("is-leaping"), 850);
    }

    const toast = document.createElement("div");
    toast.className = "easter-toast";
    toast.textContent = messages[Math.floor(Math.random() * messages.length)];
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);

    setTimeout(() => {
      leaping = false;
    }, 850);
  });
}
