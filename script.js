const base_portion = 2;

let ingredients = [
    { qty: 350, unit:"g", name: "gekochter kalter Reis(am besten Vortag, Jasminreis)"},
    { qty: 2, unit:"Stk", name: "Eier(n)"},
    { qty: 150, unit:"g", name: "Hähnchenfleisch oder Garnelen(optional)"},
    { qty: 3, unit:"EL", name: "Rapsöl"},
    { qty: 2, unit:"Stk", name: "Schalotte(n)"},
    { qty: 2, unit:"Stk", name: "Knoblauchzeh(en)"},
    { qty: 1, unit:"Stk", name: "kleine Rote Chili(nach Schärfewunsch)(Optional Chiliflocken)"},
    { qty: 0.5, unit:"TL", name: "Terasi (Indonesische Shrimppaste, optional)"},
    { qty: 0.25, unit:"TL", name: "Salz"},
    { qty: 2, unit:"EL", name: "Kecap Manis (süße indonesische Sojasoße)"},
    { qty: 1, unit:"TL", name: "helle Sojasoße"},
    { qty: 0.5, unit:"EL", name: "Oystersoße"},
    { qty: null, unit:"", name: "Prise weißer Pfeffer"},
];
let portionsInput = document.getElementById("portionsInput");
const portionsBtn = document.getElementById("portionsBtn");
const ingredientsList = document.getElementById("ingredientsList");

// wenn n eine ganze Zahl dann anzeigen, wenn nicht sowas wie 2.00, dann runden auf 2 kommastellen
// parsefloat entfernt unnötige Nullen
function formatNumber(n) {
    if (Number.isInteger(n)) return String(n);
     return String(parseFloat(n.toFixed(2)));
}

function scaleQty(qty,portions) {
    if (qty === null) return null;
    return (qty / base_portion) * portions;
}
function renderIngredients(portions) {
  if (!ingredientsList) return;

  let html = "";

  //schleife denn JS fängt von 0 und sollte weitergeben bis alle 'ingredients', ++ =weiter
  for (let i = 0; i < ingredients.length; i++) {
    let ing = ingredients[i];
    let scaledQty = scaleQty(ing.qty, portions);

    let qtyText = ""; //wieder leeren
    // wenn menge gibt, dann hübsche Zahl anzeigen
    if (scaledQty !== null) {
      qtyText = formatNumber(scaledQty);
    //wenn unit gibt, gern damit
      if (ing.unit) qtyText = qtyText + " " + ing.unit;
    }

html = html + '<li class="ingredient-item">' +
                '<div class="ingredient-left">' +
                    '<div class="qty">' +
                    qtyText +
                    '</div>' +

                    '<div class="ing-name">' +
                     ing.name +
                    '</div>' +
                '</div>' +
              '</li>';
  }

  ingredientsList.innerHTML = html;
}
function getPortionsSafe() {
  if (!portionsInput) return base_portion;

  let raw = Number(portionsInput.value);

  // Ungültig oder < 1 => Default (kein 0, -n, " ", n.n,)
  if (!isFinite(raw) || raw < 1) return base_portion;

  // Ganze Portionen erzwingen
  return Math.floor(raw);
}

function update() {
// Portionen sauber holen (getPortsafe)
  let portions = getPortionsSafe();

// falls eingabefeld existiert, schreib die (bereinigte) Zahl wieder ins Eingabefeld
  if (portionsInput) portionsInput.value = portions;
  renderIngredients(portions);
}

/** Events */
if (portionsBtn) {
  portionsBtn.addEventListener("click", update);
}

if (portionsInput) {
  portionsInput.addEventListener("change", update);
  portionsInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") update();
  });
}

/** Initial render */
update();