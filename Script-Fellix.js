
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
