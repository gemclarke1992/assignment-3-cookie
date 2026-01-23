console.log("hello");

let cookieCount = 0;
let cps = 0;
let clickPower = 1;
let autoClickers = 0;
let autoClickPower = 1;
let manualClicks = 0;

let hasSaved = false;

const cookieCountDisplay = document.getElementById("cookieCount");
const cpsDisplay = document.getElementById("cps");
const img = document.querySelector("img");

cookieCountDisplay.innerText = cookieCount;
cpsDisplay.innerText = cps;

img.addEventListener("click", function () {
  cookieCount += clickPower;
  manualClicks += clickPower;
  cookieCountDisplay.innerText = cookieCount;

  const chip = document.querySelector("#cookie img");
  chip.classList.add("clicked");
  setTimeout(() => img.classList.remove("clicked"), 150);

  update();
});

const upgrades = [
  {
    id: 1,
    name: "Auto-Clicker",
    cost: 100,
    increase: 1,
    owned: 0,
    type: "auto",
  },
  {
    id: 2,
    name: "Cookie Crumbler",
    cost: 200,
    increase: 5,
    owned: 0,
    type: "cps",
  },
  {
    id: 3,
    name: "Crumbly Cookie",
    cost: 500,
    increase: 10,
    owned: 0,
    type: "cps",
  },
  {
    id: 4,
    name: "Double Chocolate Chip",
    cost: 1000,
    increase: 50,
    owned: 0,
    type: "cps",
  },
  {
    id: 5,
    name: "Big Dipper Cookie",
    cost: 3000,
    increase: 100,
    owned: 0,
    type: "cps",
  },
  {
    id: 6,
    name: "Magic Chips",
    cost: 10000,
    increase: 1000,
    owned: 0,
    type: "click",
  },
  {
    id: 7,
    name: "Chunky Cookie",
    cost: 20000,
    increase: 20000,
    owned: 0,
    type: "click",
  },
  {
    id: 8,
    name: "Mega Cookie",
    cost: 50000,
    increase: 50000,
    owned: 0,
    type: "click",
  },
  {
    id: 9,
    name: "Thats the way the cookie Crumbles",
    cost: 100000,
    increase: 1000000,
    owned: 0,
    type: "click",
  },
  {
    id: 10,
    name: "Infinity Cookie ",
    cost: 200000,
    increase: 2000000,
    owned: 0,
    type: "click",
  },
];

update();

function buyUpgrade(id) {
  const u = upgrades.find((x) => x.id === id);
  if (!u || cookieCount < u.cost) return;

  cookieCount = cookieCount - u.cost;
  u.owned++;

  if (u.type === "click") {
    clickPower += u.increase;
  } else if (u.type === "auto") {
    autoClickers += u.increase;
  } else if (u.type === "cps") {
    autoClickPower += u.increase;
  }

  update();
}

function updateUI() {
  document.getElementById("cookieCount").textContent =
    `Cookies: ${Math.floor(cookieCount)}`;

  cpsDisplay.textContent = `CPS: ${cps}`;
}

function renderUpgrades() {
  const el = document.getElementById("upgrades");
  el.innerHTML = "";

  upgrades.forEach((u) => {
    const div = document.createElement("div");
    div.className = "upgrade";

    div.innerHTML = `
        <h4>${u.name}</h4>
        <p>Owned: ${u.owned}</p>
        <p>Adds: ${u.increase} ${u.type === "click" ? "per click" : "cookies"} </p>
        <p>Cost: ${u.cost} cookies</p>
      `;
    const btn = document.createElement("button");
    btn.textContent = "Buy";
    btn.disabled = cookieCount < u.cost;
    btn.addEventListener("click", () => buyUpgrade(u.id));

    div.appendChild(btn);
    el.appendChild(div);
  });
}
function saveGame() {
  localStorage.setItem(
    "cookieSave",
    JSON.stringify({
      cookieCount,
      cps,
      clickPower,
      autoClickers,
      autoClickPower,

      upgrades: upgrades.map((u) => ({
        owned: u.owned,
        cost: u.cost,
      })),
    }),
  );
  hasSaved = true;
}
function loadGame() {
  const saved = JSON.parse(localStorage.getItem("cookieSave"));
  if (!saved) {
    alert("No save found");
    return;
  }

  cookieCount = saved.cookieCount;
  cps = saved.cps;
  clickPower = saved.clickPower;
  autoClickers = saved.autoClickers;
  autoClickPower = saved.autoClickPower ?? 1;
  autoClickSpeed = saved.autoClickSpeed ?? 1;

  saved.upgrades.forEach((u, index) => {
    upgrades[index].owned = u.owned;
    upgrades[index].cost = u.cost;
    if (upgrades[index].type === "click")
      clickPower += upgrades[index].increase * upgrades[index].owned;
    if (upgrades[index].type === "auto")
      autoClickers += upgrades[index].increase * upgrades[index].owned;
  });
  updateUI();
  alert("Game loaded");
}

window.addEventListener("load", () => {
  if (localStorage.getItem("cookieSave") && hasSaved) {
    if (confirm("Load saved game?")) {
      loadGame();
    }
  }
});

function resetGame() {
  if (!confirm("Are you sure you want to reset?")) return;
  cookieCount = 0;
  cps = 0;
  clickPower = 1;
  autoClickers = 0;
  manualClicks = 0;

  upgrades.forEach((u) => {
    u.owned = 0;
  });
  update();
  localStorage.removeItem("cookieSave");
}

function update() {
  updateUI();
  renderUpgrades();
}

setInterval(() => {
  cookieCount += autoClickers * autoClickPower;

  cps = manualClicks + autoClickers * autoClickPower;

  manualClicks = 0;
  update();
}, 1000);

update();
