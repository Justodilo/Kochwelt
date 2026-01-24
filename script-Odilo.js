//Burger Menu Funktionen

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

//PORTIONENRECHNER!!


let portions = document.getElementById("portionsInput");
let portionsBtn = document.getElementById("portionsBtn");
let ingredients = document.getElementById("ingredientsList");
let base_portion = Number(ingredients.dataset.basePortion) || 2;

let ingredientData = Array.from(ingredients.getElementsByClassName("ingredient-item")).map(item => {
    return {
        qty: item.dataset.qty ? parseFloat(item.dataset.qty) : null,
        unit: item.dataset.unit || "",
        name: item.dataset.name || "",
        note: item.dataset.note || ""
    };
});

function update() {
    let currentPortions = getPortionsSafe();

    if (portions) portions.value = currentPortions;
    renderIngredients(currentPortions);
}

function getPortionsSafe() {
    if (!portions) return base_portion;

    let raw = Number(portions.value);

    if (!isFinite(raw) || raw < 1) raw = 1;
    if (raw > 20) raw = 20;

    return Math.floor(raw);
}

function renderIngredients(portions) {
    if (!ingredients) return;

    let html = "";

    for (let i = 0; i < ingredientData.length; i++) {
        let ing = ingredientData[i];
        let scaledQty = scaleQty(ing.qty, portions);

        let qtyText = "";
        if (scaledQty !== null) {
            qtyText = formatNumber(scaledQty);
            if (ing.unit) qtyText += " " + ing.unit;
        }

        html += `<li class="ingredient-item">
                    <div class="ingredient-left">
                        <div class="qty">${qtyText}</div>
                        <div class="ing-name">${ing.name}</div>
                        <div class="note">${ing.note || " "}</div>
                    </div>
                 </li>`;
    }

    ingredients.innerHTML = html;
}

function scaleQty(qty, portions) {
    if (qty === null) return null;
    return (qty / base_portion) * portions;
}

function formatNumber(n) {
    if (Number.isInteger(n)) return String(n);
    return String(parseFloat(n.toFixed(2)));
}

update();