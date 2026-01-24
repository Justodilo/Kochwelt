
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
        let gerundet; // Variable für das gerundete ergebnis
    
        if (Number.isInteger(neueMenge)) { // Ist neue menge eine ganze zahl wenn ja
            gerundet = neueMenge; // dann soll gerundet die neue menge sein (muss nicht gerundet werden)
        }
        else { //sonst
            gerundet = neueMenge.toFixed(1); // soll gerundet werden auf eine stelle nach dem kommer
        }
        if (einheit) { //wenn die einheit vorhanden ist dann
            zutat.textContent = `${gerundet} ${einheit} ${name}`; // gerundetes ergebnis einheit und name
        }
    });
});
