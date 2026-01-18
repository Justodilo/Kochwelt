
const navToggle = document.getElementById("navToggle");
const navOverlay = document.getElementById("navOverlay");
const mobileMenu = document.getElementById("mobileMenu");

function openMenu() {
  if (!navToggle || !navOverlay || !mobileMenu) return;

  navToggle.classList.add("is-open");
  navOverlay.classList.add("is-open");
  mobileMenu.classList.add("is-open");

  navOverlay.hidden = false;
  mobileMenu.hidden = false;

  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (!navToggle || !navOverlay || !mobileMenu) return;

  navToggle.classList.remove("is-open");
  navOverlay.classList.remove("is-open");
  mobileMenu.classList.remove("is-open");

  document.body.style.overflow = "";

  setTimeout(() => {
    navOverlay.hidden = true;
    mobileMenu.hidden = true;
  }, 300);
}

function toggleMenu() {
  const isOpen = navToggle.classList.contains("is-open");
  if (isOpen) closeMenu();
  else openMenu();
}

if (navToggle && navOverlay && mobileMenu) {
  navToggle.addEventListener("click", toggleMenu);
  navOverlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navToggle.classList.contains("is-open")) {
      closeMenu();
    }
  });

  mobileMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const base_portion = 1;

let ingredients = [
  { qty: 800, unit: "g", name: "Chicken Wings" },
  { qty: 2, unit: "g", name: "Salz" },
  { qty: 200, unit: "ml", name: "Dunkle Sojasoße" },
  { qty: 10, unit: "g", name: "Ingwerpulver" },
  { qty: 10, unit: "ml", name: "Reisweinessig" },
  { qty: 1, unit: "EL", name: "Honig" },
  { qty: 1, unit: "EL", name: "Maisstärke" },
  { qty: 5, unit: "EL", name: "warmes Wasser" },
];

let portionsInput = document.getElementById("portionsInput");
const portionsBtn = document.getElementById("portionsBtn");
const ingredientsList = document.getElementById("ingredientsList");

function formatNumber(n) {
  if (Number.isInteger(n)) return String(n);
  return String(parseFloat(n.toFixed(2)));
}

function scaleQty(qty, portions) {
  if (qty === null) return null;
  return (qty / base_portion) * portions;
}

function renderIngredients(portions) {
  if (!ingredientsList) return;

  let html = "";

  for (let i = 0; i < ingredients.length; i++) {
    let ing = ingredients[i];
    let scaledQty = scaleQty(ing.qty, portions);

    let qtyText = "";
    if (scaledQty !== null) {
      qtyText = formatNumber(scaledQty);
      if (ing.unit) qtyText = qtyText + " " + ing.unit;
    }

    html =
      html +
      '<li class="ingredient-item">' +
      '<div class="ingredient-left">' +
      '<div class="qty">' +
      qtyText +
      "</div>" +
      '<div class="ing-name">' +
      ing.name +
      "</div>" +
      '<div class="note">' +
      (ing.note || " ") +
      "</div>" +
      "</div>" +
      "</li>";
  }

  ingredientsList.innerHTML = html;
}

function getPortionsSafe() {
  if (!portionsInput) return base_portion;

  let raw = Number(portionsInput.value);

  if (!isFinite(raw) || raw < 1) return base_portion;

  return Math.floor(raw);
}

function update() {
  let portions = getPortionsSafe();

  if (portionsInput) portionsInput.value = portions;
  renderIngredients(portions);
}

if (portionsBtn) {
  portionsBtn.addEventListener("click", update);
}

if (portionsInput) {
  portionsInput.addEventListener("change", update);
  portionsInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") update();
  });
}

update();
