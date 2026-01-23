console.log("hello");

let cookieCount = 0;
let cps = 1;
let cookie = 1
let autoClickers = 0;

const cookieCountDislay = document.getElementById("cookieCount");
const cpsDisplay = document.getElementById("cps");
const img = document.querySelector("img");

cookieCountDislay.innerText = cookieCount;
cpsDisplay.innerText = cps;

img.addEventListener("click", function () {
  cookieCount + 1;
  cookieCountDislay.innerText = cookieCount;
}); 

setInterval(function () {
  cookieCount++;
}, 1000);


const upgrades = [
  {
    id: 1,
    name: "Auto-Clicker",
    cost: 100,
    increase: 1,
    owned: 0,
    type: "autp",
  },
  {
    id: 2,
    name: "Cookie Crumbler",
    cost: 500,
    increase: 5,
    owned: 0,
    type: "cps",
  },
  {
    id: 3,
    name: "Crumbly Cookie",
    cost: 1000,
    increase: 10,
    owned: 0,
    type: "cps",
  },
  {
    id: 4,
    name: "Double Chocolate Chip",
    cost: 2000,
    increase: 20,
    owned: 0,
    type: "cps",
  },
  {
    id: 5,
    name: "Big Dipper Cookie",
    cost: 5000,
    increase: 50,
    owned: 0,
    type: "cps",
  },
  {
    id: 6,
    name: "Magic Chips",
    cost: 10000,
    increase: 100,
    owned: 0,
    type: "cps",
  },
  {
    id: 7,
    name: "Chunky Cookie",
    cost: 20000,
    increase: 200,
    owned: 0,
    type: "cps",
  },
  {
    id: 8,
    name: "Mega Cookie",
    cost: 50000,
    increase: 500,
    owned: 0,
    type: "cps",
  },
  {
    id: 9,
    name: "Thats the way the cookie Crumbles",
    cost: 100000,
    increase: 1000,
    owned: 0,
    type: "cps",
  },
  {
    id: 10,
    name: "Infinity Cookie ",
    cost: 200000,
    increase: 2000,
    owned: 0,
    type: "cps",
  },
];

function upgrades() {
  return upgrades.reduce((s, u) => s + u.owned, 0);
}

function clickCookie() {
  cookiee += cookieCount 
  showFloatingText(cookieCount);

  const chip =document.querySelector("clickCookie img");
  chip.classList.add("clicked", 150)

  update ();
}

function buyUpgrade (id) {
  const u = upgrades.find((x) => x.id===id);
  if (!u || chip < u.cost) return;

  chip-= u.cost
  u.owned++;
  u.cost = Math.floor(u.cost*1.5);

  if (u.type === "cps") cps += u.increase;
  if (u.type === "click") cookieCount += u.increase;
  if (u.type === "auto") autoClickers += u.increase;

  update ();
}

function updateUI 