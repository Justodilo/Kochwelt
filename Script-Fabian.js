var navToggle = document.getElementById("navToggle");
var navOverlay = document.getElementById("navOverlay");
var mobileMenu = document.getElementById("mobileMenu");

navToggle.onclick = function () {
  if (mobileMenu.classList.contains("is-open")) {
    navToggle.classList.remove("is-open");
    navOverlay.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    navOverlay.hidden = true;
    mobileMenu.hidden = true;
    document.body.style.overflow = "";
  } else {
    navToggle.classList.add("is-open");
    navOverlay.classList.add("is-open");
    mobileMenu.classList.add("is-open");
    navOverlay.hidden = false;
    mobileMenu.hidden = false;
    document.body.style.overflow = "hidden";
  }
};

navOverlay.onclick = function () {
  navToggle.classList.remove("is-open");
  navOverlay.classList.remove("is-open");
  mobileMenu.classList.remove("is-open");
  navOverlay.hidden = true;
  mobileMenu.hidden = true;
  document.body.style.overflow = "";
};

var links = mobileMenu.querySelectorAll(".nav-link");
for (var i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    navToggle.classList.remove("is-open");
    navOverlay.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    navOverlay.hidden = true;
    mobileMenu.hidden = true;
    document.body.style.overflow = "";
  };
}

document.onkeydown = function (e) {
  if (e.key === "Escape") {
    navToggle.classList.remove("is-open");
    navOverlay.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    navOverlay.hidden = true;
    mobileMenu.hidden = true;
    document.body.style.overflow = "";
  }
};

var portionsInput = document.getElementById("portionsInput");
var portionsBtn = document.getElementById("portionsBtn");
var ingredientsList = document.getElementById("ingredientsList");

var ingredients = [
  [800, "g", "Chicken Wings"],
  [2, "g", "Salz"],
  [200, "ml", "Dunkle Sojasoße"],
  [10, "g", "Ingwerpulver"],
  [10, "ml", "Reisweinessig"],
  [1, "EL", "Honig"],
  [1, "EL", "Maisstärke"],
  [5, "EL", "warmes Wasser"]
];

portionsInput.oninput = function () {
  portionsInput.value = portionsInput.value.replace(/[^0-9]/g, "");
};

portionsBtn.onclick = function () {
  var portions = Number(portionsInput.value);

  if (!portions) portions = 1;
  if (portions < 1) portions = 1;
  if (portions > 20) portions = 20;

  portionsInput.value = portions;

  ingredientsList.innerHTML = "";

  for (var i = 0; i < ingredients.length; i++) {
    var amount = ingredients[i][0] * portions;
    var unit = ingredients[i][1];
    var name = ingredients[i][2];

    ingredientsList.innerHTML +=
      "<li class='ingredient-item'>" +
      "<div class='ingredient-left'>" +
      "<div class='qty'>" + amount + " " + unit + "</div>" +
      "<div class='ing-name'>" + name + "</div>" +
      "</div>" +
      "</li>";
  }
};

portionsBtn.onclick();