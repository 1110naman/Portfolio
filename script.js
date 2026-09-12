const cards = [
  ["CURRENT INNINGS","SDE-2","Backend · AdTech · Nykaa"],
  ["OPERATIONS","40%","MTTD + MTTR reduction"],
  ["CAMPAIGN PLATFORM","1000+","Brand managers supported"],
  ["RELIABILITY","60%","Fewer notification failures"],
  ["AUTOMATION","50%","Less manual effort"]
];

let active = 0;
let timer;
const label = document.getElementById("scoreLabel");
const value = document.getElementById("scoreValue");
const sub = document.getElementById("scoreSub");
const counter = document.getElementById("cardCounter");
const progress = document.getElementById("cardProgress");
const dots = document.getElementById("dots");

cards.forEach((_, i) => {
  const d = document.createElement("button");
  d.className = "dot" + (i === 0 ? " active" : "");
  d.setAttribute("aria-label", `Show scorecard ${i + 1}`);
  d.addEventListener("click", () => showCard(i));
  dots.appendChild(d);
});

function showCard(i) {
  active = (i + cards.length) % cards.length;
  const [a,b,c] = cards[active];
  label.textContent = a;
  value.textContent = b;
  sub.textContent = c;
  counter.textContent = `0${active + 1} / 0${cards.length}`;
  [...dots.children].forEach((d, n) => d.classList.toggle("active", n === active));
  progress.style.transition = "none";
  progress.style.width = "0%";
  requestAnimationFrame(() => {
    progress.style.transition = "width 4.5s linear";
    progress.style.width = "100%";
  });
}
function next(){ showCard(active + 1); }
function prev(){ showCard(active - 1); }
document.getElementById("nextCard").addEventListener("click", next);
document.getElementById("prevCard").addEventListener("click", prev);

function start(){ clearInterval(timer); showCard(active); timer = setInterval(next, 4500); }
start();

const card = document.querySelector(".live-card");
card.addEventListener("mouseenter", () => clearInterval(timer));
card.addEventListener("mouseleave", start);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

const ball = document.querySelector(".ball");
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max ? scrollY / max : 0;
      ball.style.setProperty("--scroll-y", `${p * 180}px`);
      ball.style.setProperty("--scroll-r", `${p * 720}deg`);
      ticking = false;
    });
    ticking = true;
  }
}, {passive:true});

const revealItems = document.querySelectorAll(".innings-card,.big-stat,.trophies>div,.xi-row,.commentary-card,.foundation-card,.principles div");
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      if (entry.target.matches(".big-stat")) {
        const el = entry.target.querySelector("[data-count]");
        if (el && !el.dataset.done) {
          el.dataset.done = "1";
          const end = Number(el.dataset.count);
          let n = 0;
          const step = Math.max(1, Math.ceil(end / 35));
          const run = () => {
            n = Math.min(end, n + step);
            el.textContent = n;
            if (n < end) requestAnimationFrame(run);
          };
          run();
        }
      }
    }
  });
}, {threshold:.15});
revealItems.forEach(el => io.observe(el));

const style = document.createElement("style");
style.textContent = `
.innings-card,.big-stat,.trophies>div,.xi-row,.commentary-card,.foundation-card,.principles div{
  opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s ease;
}
.is-visible{opacity:1!important;transform:none!important}
`;
document.head.appendChild(style);
