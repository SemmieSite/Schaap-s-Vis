/* Winkelwagen-logica voor Schaap's Vis.
   De winkelwagen wordt lokaal in de browser bewaard (localStorage).
   Er is nog geen backend: dit is voldoende voor de MVP, maar betekent
   dat de winkelwagen niet gedeeld wordt tussen apparaten. */

const WINKELWAGEN_SLEUTEL = "schaapsvis_winkelwagen";

function leesWinkelwagen() {
  try {
    const ruw = localStorage.getItem(WINKELWAGEN_SLEUTEL);
    return ruw ? JSON.parse(ruw) : {};
  } catch (fout) {
    console.error("Kon winkelwagen niet lezen:", fout);
    return {};
  }
}

function schrijfWinkelwagen(wagen) {
  try {
    localStorage.setItem(WINKELWAGEN_SLEUTEL, JSON.stringify(wagen));
  } catch (fout) {
    console.error("Kon winkelwagen niet opslaan:", fout);
  }
  werkWinkelwagenBadgeBij();
}

function voegToeAanWinkelwagen(productId, aantal) {
  const wagen = leesWinkelwagen();
  const huidigAantal = wagen[productId] || 0;
  wagen[productId] = huidigAantal + aantal;
  schrijfWinkelwagen(wagen);
}

function stelAantalIn(productId, aantal) {
  const wagen = leesWinkelwagen();
  if (aantal <= 0) {
    delete wagen[productId];
  } else {
    wagen[productId] = aantal;
  }
  schrijfWinkelwagen(wagen);
}

function verwijderUitWinkelwagen(productId) {
  const wagen = leesWinkelwagen();
  delete wagen[productId];
  schrijfWinkelwagen(wagen);
}

function maakWinkelwagenLeeg() {
  schrijfWinkelwagen({});
}

function winkelwagenRegels() {
  const wagen = leesWinkelwagen();
  return Object.keys(wagen)
    .map((id) => {
      const product = vindProduct(id);
      if (!product) return null;
      const aantal = wagen[id];
      return {
        product: product,
        aantal: aantal,
        subtotaal: product.prijs * aantal,
      };
    })
    .filter(Boolean);
}

function winkelwagenAantalTotaal() {
  const wagen = leesWinkelwagen();
  return Object.values(wagen).reduce((som, aantal) => som + aantal, 0);
}

function winkelwagenTotaalPrijs() {
  return winkelwagenRegels().reduce((som, regel) => som + regel.subtotaal, 0);
}

function werkWinkelwagenBadgeBij() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const aantal = winkelwagenAantalTotaal();
  badge.textContent = String(aantal);
  badge.style.display = aantal > 0 ? "inline-block" : "none";
}

document.addEventListener("DOMContentLoaded", werkWinkelwagenBadgeBij);
