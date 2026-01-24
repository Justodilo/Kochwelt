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
const portionenInput = document.getElementById("portionen");
const zutaten = document.querySelectorAll("#zutaten li");
const portionenBtn = document.querySelector("#portionen-btn");
const basisPortionen = 1;

portionenBtn.addEventListener("click", () => {     //So wird es ausgeführt sobald man den Button drückt

    let value = portionenInput.value.trim(); //trim entfernt lerzeichen
    let neuePortionen = Number(value);

    // Begrenzen auf 1–20
    if (neuePortionen < 1) neuePortionen = 1;
    if (neuePortionen > 20) neuePortionen = 20;

    // korrigierten Wert zurück ins Input schreiben
    portionenInput.value = neuePortionen;

    zutaten.forEach(zutat => { //Mit for Each wird über jede li also "Zeile" in meiner Zutatenliste geschaut
        const basisMenge = zutat.dataset.menge; //Ich hol mir die menge
        const einheit = zutat.dataset.einheit; //Ich hol mit die maßeinheit.
        const name = zutat.dataset.name;// Und ich hol mir den Namen
        const neueMenge = (basisMenge / basisPortionen) * neuePortionen; // Basis menge durch Portionen mal eingegeben Portionen
        if (einheit) {
            zutat.innerHTML = `<span class="menge">${neueMenge} ${einheit}</span> ${name}`; //Wenn einheit einen wert hat dann neue menge
        }
    });
    
});

