/* Productgegevens voor Schaap's Vis.
   Prijzen zijn nog voorbeeldprijzen voor de MVP: check ze met de winkel.
   Productfoto's: zet een foto in de map img/producten/ met als naam
   het id van het product + .jpg (bijvoorbeeld img/producten/zalm.jpg).
   Staat er geen foto, dan toont de site vanzelf een icoon. */

const PRODUCTEN = [
  { id: "zalm", naam: "Biologische zalmfilet", eenheid: "per 500 gram", prijs: 12.95, icoon: "vis", uitgelicht: true, omschrijving: "Van Vårlaks uit Noord-Noorwegen" },
  { id: "kibbeling", naam: "Glutenvrije kibbeling", eenheid: "per 250 gram", prijs: 7.50, icoon: "kibbeling", uitgelicht: true, omschrijving: "Een van onze specialiteiten" },
  { id: "makreel", naam: "Gerookte makreel", eenheid: "per stuk", prijs: 4.25, icoon: "vis", uitgelicht: true, omschrijving: "Lekker op brood of in een salade" },
  { id: "garnalen", naam: "Gepelde garnalen", eenheid: "per 250 gram", prijs: 9.95, icoon: "garnaal", uitgelicht: true, omschrijving: "Klaar om te eten" },
  { id: "mosselen", naam: "Verse mosselen", eenheid: "per kilo", prijs: 5.50, icoon: "mossel" },
  { id: "haring", naam: "Hollandse haring", eenheid: "per stuk", prijs: 2.25, icoon: "vis" },
  { id: "lekkerbek", naam: "Lekkerbekje", eenheid: "per stuk", prijs: 3.95, icoon: "lekkerbek" },
  { id: "soep", naam: "Verse vissoep", eenheid: "per 500 ml", prijs: 6.50, icoon: "soep" },
];

const PRODUCT_ICONEN = {
  vis: '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 16c8-11 24-11 32 0-8 11-24 11-32 0z"/><path d="M35 16l10-8v16l-10-8z"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none"/><path d="M17 11c1.5 3 1.5 7 0 10"/></svg>',
  kibbeling: '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 20c0-4 3-7 7-7s7 2 7 6-3 7-7 7-7-2-7-6z"/><path d="M19 12c0-4 3-7 7-7s7 3 6 7-3 6-7 6-6-2-6-6z"/><path d="M27 23c0-4 3-6 7-6s8 2 8 6-4 6-8 6-7-2-7-6z"/><path d="M10 18h.01M14 21h.01M24 9h.01M29 12h.01M33 22h.01M37 25h.01"/></svg>',
  garnaal: '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M37 9c-8-6-22-4-25 7-2 7 2 12 8 13"/><path d="M37 9c1 6-4 10-11 10-4 0-6 3-5 6"/><path d="M20 29l-5 1M20 29l-3 3"/><path d="M29 7.5l-2 11M22 9l1 10M16 13l5 7M13 20l7 2"/><path d="M37 9l7-5M37 9h8"/><circle cx="33" cy="10" r="1" fill="currentColor" stroke="none"/></svg>',
  mossel: '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M24 3c9 3 14 11 12 21-3 4-8 6-12 6s-9-2-12-6C10 14 15 6 24 3z"/><path d="M24 29V8M24 29l-6-18M24 29l6-18M24 29l-10-12M24 29l10-12"/></svg>',
  lekkerbek: '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 18c2-7 10-11 20-11s18 4 20 9c-2 6-10 10-20 10S6 23 4 18z"/><path d="M11 15h.01M16 20h.01M21 13h.01M26 19h.01M31 14h.01M36 19h.01M19 23h.01M30 23h.01"/></svg>',
  soep: '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 15h32c0 8-7 14-16 14S8 23 8 15z"/><path d="M5 15h38"/><path d="M19 3c-2 2.5 2 4 0 7M25 3c-2 2.5 2 4 0 7M31 3c-2 2.5 2 4 0 7"/></svg>',
};

function vindProduct(id) {
  return PRODUCTEN.find((p) => p.id === id);
}

function formatPrijs(bedrag) {
  return "€ " + bedrag.toFixed(2).replace(".", ",");
}

/* Bouwt een productkaart met aantal-kiezer en "Toevoegen"-knop.
   Wordt gebruikt op de homepage (uitgelichte producten) en op producten.html. */
function bouwProductKaart(product) {
  const kaart = document.createElement("div");
  kaart.className = "product-kaart";
  kaart.innerHTML = `
    <div class="product-plaatje">
      <span class="product-icoon">${PRODUCT_ICONEN[product.icoon] || PRODUCT_ICONEN.vis}</span>
    </div>
    <h3>${product.naam}</h3>
    ${product.omschrijving ? `<p class="product-omschrijving">${product.omschrijving}</p>` : ""}
    <div class="product-eenheid">${product.eenheid}</div>
    <div class="product-prijs">${formatPrijs(product.prijs)}</div>
    <div class="product-acties">
      <div class="aantal-kiezer">
        <button type="button" class="min-knop" aria-label="Eén minder">−</button>
        <input type="number" class="aantal-invoer" value="1" min="1" max="20" aria-label="Aantal ${product.naam}">
        <button type="button" class="plus-knop" aria-label="Eén meer">+</button>
      </div>
      <button type="button" class="knop knop-primair toevoegen-knop">Toevoegen</button>
    </div>
    <div class="toegevoegd-melding" role="status"></div>
  `;

  // Eigen productfoto tonen als die bestaat (img/producten/<id>.jpg).
  const foto = new Image();
  foto.onload = () => {
    foto.alt = product.naam;
    foto.className = "product-foto";
    const plek = kaart.querySelector(".product-plaatje");
    plek.innerHTML = "";
    plek.classList.add("met-foto");
    plek.appendChild(foto);
  };
  foto.src = `img/producten/${product.id}.jpg`;

  const invoer = kaart.querySelector(".aantal-invoer");
  kaart.querySelector(".min-knop").addEventListener("click", () => {
    invoer.value = Math.max(1, parseInt(invoer.value || "1", 10) - 1);
  });
  kaart.querySelector(".plus-knop").addEventListener("click", () => {
    invoer.value = Math.min(20, parseInt(invoer.value || "1", 10) + 1);
  });
  kaart.querySelector(".toevoegen-knop").addEventListener("click", () => {
    const aantal = Math.min(20, Math.max(1, parseInt(invoer.value || "1", 10)));
    voegToeAanWinkelwagen(product.id, aantal);
    const melding = kaart.querySelector(".toegevoegd-melding");
    melding.textContent = `${aantal} × toegevoegd`;
    setTimeout(() => { melding.textContent = ""; }, 2500);
  });

  return kaart;
}
