/* Algemene site-functies: tekstgrootte-voorkeur onthouden. */

const TEKSTGROOTTE_SLEUTEL = "schaapsvis_tekstgrootte";

function pasTekstgrootteToe(grootte) {
  document.documentElement.setAttribute("data-tekstgrootte", grootte);
  document.querySelectorAll(".tekstgrootte-knoppen button").forEach((knop) => {
    knop.classList.toggle("actief", knop.dataset.grootte === grootte);
  });
  try {
    localStorage.setItem(TEKSTGROOTTE_SLEUTEL, grootte);
  } catch (fout) {
    console.error("Kon tekstgrootte niet opslaan:", fout);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let opgeslagenGrootte = "normaal";
  try {
    opgeslagenGrootte = localStorage.getItem(TEKSTGROOTTE_SLEUTEL) || "normaal";
  } catch (fout) {
    console.error("Kon tekstgrootte niet lezen:", fout);
  }
  pasTekstgrootteToe(opgeslagenGrootte);

  document.querySelectorAll(".tekstgrootte-knoppen button").forEach((knop) => {
    knop.addEventListener("click", () => pasTekstgrootteToe(knop.dataset.grootte));
  });
});
