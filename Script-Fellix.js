
const portionenInput = document.getElementById("portionen");
const zutaten = document.querySelectorAll("#zutaten li");
const portionenBtn = document.querySelector("#portionen-btn");
const basisPortionen = 1;

portionenBtn.addEventListener("click", () => {     //So wird es ausgeführt sobald man den Button drückt
    let value = portionenInput.value.trim();



    if (value === "") return; //Wenn es leer ist passiert nichts

    let neuePortionen = Number(value);

    // Begrenzen auf 1–20
    if (neuePortionen < 1) neuePortionen = 1;
    if (neuePortionen > 20) neuePortionen = 20;

    // korrigierten Wert zurück ins Input schreiben
    portionenInput.value = neuePortionen;

    zutaten.forEach(zutat => {
        const basisMenge = zutat.dataset.menge;
        const einheit = zutat.dataset.einheit || "";
        const name = zutat.dataset.name;

        if (!basisMenge) return;

        const neueMenge = (basisMenge / basisPortionen) * neuePortionen;
        const gerundet = Number.isInteger(neueMenge)
            ? neueMenge
            : neueMenge.toFixed(1);




        zutat.textContent = einheit
            ? `${gerundet} ${einheit} ${name}`
            : `${gerundet} ${name}`;
    });
});
