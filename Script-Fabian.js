const basePortions = 1;

const ingredients = [
  { name: "Chicken Wings", amount: 800, unit: "g" },
  { name: "Salz", amount: 2, unit: "g" },
  { name: "Dunkle Sojasoße", amount: 200, unit: "ml" },
  { name: "Ingwerpulver", amount: 10, unit: "g" },
  { name: "Reisweinessig", amount: 10, unit: "ml" },
  { name: "Honig", amount: 1, unit: "EL" },
  { name: "Maisstärke", amount: 1, unit: "EL" },
  { name: "warmes Wasser", amount: 5, unit: "EL" },
];

const input = document.getElementById("portionInput");
const button = document.getElementById("portionBtn");
const list = document.getElementById("ingredientsList");

function sanitizePortions(value) {
  let v = parseInt(value, 10);

  if (isNaN(v)) v = 1;
  if (v < 1) v = 1;
  if (v > 20) v = 20;

  return v;
}

function renderIngredients(portions) {
  list.innerHTML = "";

  ingredients.forEach((item) => {
    const newAmount = (item.amount / basePortions) * portions;

    const li = document.createElement("li");
    li.textContent = `${newAmount} ${item.unit} ${item.name}`;
    list.appendChild(li);
  });
}
button.addEventListener("click", () => {
  const portions = sanitizePortions(input.value);
  input.value = portions;
  renderIngredients(portions);
});

input.addEventListener("input", () => {
  input.value = input.value.replace(/[^0-9]/g, "");
});
renderIngredients(sanitizePortions(input.value));
