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

  //scroll lock site background
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (!navToggle || !navOverlay || !mobileMenu) return;

  navToggle.classList.remove("is-open");
  navOverlay.classList.remove("is-open");
  mobileMenu.classList.remove("is-open");

  //scroll unlock site background
  document.body.style.overflow = "";

  //wait for animation end then hide elements
  setTimeout(() => {
    navOverlay.hidden = true;
    mobileMenu.hidden = true;
  }, 125);
}

function toggleMenu() {
  const isOpen = navToggle.classList.contains("is-open");
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (navToggle && navOverlay && mobileMenu) {
  navToggle.addEventListener("click", toggleMenu);
  navOverlay.addEventListener("click", closeMenu);

  //ESC key closes menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navToggle.classList.contains("is-open")) {
      closeMenu();
    }
  });
  
  //clicking a link in the mobile menu closes the menu
  mobileMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const basePortion = 1;

const portionsInput = document.getElementById("portionsInput");
const portionsBtn = document.getElementById("portionsBtn");
const ingredientsList = document.getElementById("ingredientsList");

// 1) Li-Daten aus dem HTML einsammeln -> Array
function readIngredientsFromDOM(listEl) {
  const items = listEl.querySelectorAll("li");
  const arr = [];

  items.forEach((li) => {
    // FALL 1: Überschrift
    if (li.classList.contains("ingredients-heading")) {
      arr.push({
        type: "heading",
        text: li.textContent
      });
      return;
    }

    // FALL 2: Zutat
    const qtyRaw = li.dataset.menge;
    const unit = li.dataset.einheit || "";
    const name = li.dataset.name || "";
    const note = li.dataset.note || "";

    const qty = qtyRaw === "" ? null : Number(qtyRaw);

    arr.push({
      type: "ingredient",
      qty,
      unit,
      name,
      note
    });
  });

  return arr;
}

function formatNumber(n) {
  if (Number.isInteger(n)) return String(n);
  return String(parseFloat(n.toFixed(2)));
}

function formatNumber(n) {
  const fractions = {
    0.25: "1/4",
    0.5: "1/2",
    0.75: "3/4"
  };

  const rounded = Number(n.toFixed(2));
  return fractions[rounded] || String(rounded);
}

function scaleQty(qty, portions) {
  if (qty === null || !isFinite(qty)) return null;
  return (qty / basePortion) * portions;
}

function getPortionsSafe() {
  if (!portionsInput) return basePortion;

  const raw = Number(portionsInput.value);
  if (!isFinite(raw) || raw < 1) return basePortion;

  return Math.floor(raw);
}

function renderIngredients(listEl, ingredients, portions) {
  let html = "";

  ingredients.forEach((ing) => {

    // Überschrift rendern
    if (ing.type === "heading") {
      html += `<li class="ingredients-heading">${ing.text}</li>`;
      return;
    }

    // Zutat rendern
    const scaledQty = scaleQty(ing.qty, portions);

    let qtyText = "";
    if (scaledQty !== null) {
      qtyText = formatNumber(scaledQty);
      if (ing.unit) qtyText += " " + ing.unit;
    }

    html += `
      <li class="ingredient-item">
        <div class="ingredient-left">
          <div class="qty">${qtyText}</div>
          <div class="ing-name">${ing.name}</div>
          <div class="note">${ing.note || ""}</div>
        </div>
      </li>
    `;
  });

  listEl.innerHTML = html;
}

// Initial: Daten einmal aus dem DOM lesen
const ingredients = ingredientsList 
? readIngredientsFromDOM(ingredientsList) 
: [];

function update() {
  const portions = getPortionsSafe();
  if (portionsInput) portionsInput.value = portions;

  if (ingredientsList) {
    renderIngredients(ingredientsList, ingredients, portions);
  }
}

// Events
if (portionsBtn) portionsBtn.addEventListener("click", update);

if (portionsInput) {
  portionsInput.addEventListener("change", update);
  portionsInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") update();
  });
}

// Start
update();