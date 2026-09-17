/* Productgegevens voor Schaap's Vis.
   Dit is placeholder-data voor de MVP. Vervang later door echte prijzen,
   voorraad en foto's, eventueel via een backend of CMS. */

const PRODUCTEN = [
  { id: "zalm", naam: "Verse zalmfilet", eenheid: "per 500 gram", prijs: 12.95, emoji: "🐟" },
  { id: "kibbeling", naam: "Kibbeling", eenheid: "per 250 gram", prijs: 7.50, emoji: "🍤" },
  { id: "makreel", naam: "Gerookte makreel", eenheid: "per stuk", prijs: 4.25, emoji: "🐟" },
  { id: "garnalen", naam: "Gepelde garnalen", eenheid: "per 250 gram", prijs: 9.95, emoji: "🦐" },
  { id: "mosselen", naam: "Verse mosselen", eenheid: "per kilo", prijs: 5.50, emoji: "🦪" },
  { id: "haring", naam: "Hollandse Nieuwe haring", eenheid: "per stuk", prijs: 2.25, emoji: "🐟" },
  { id: "lekkerbek", naam: "Lekkerbekje", eenheid: "per stuk", prijs: 3.95, emoji: "🍽️" },
  { id: "soep", naam: "Verse vissoep", eenheid: "per 500 ml", prijs: 6.50, emoji: "🍲" },
];

function vindProduct(id) {
  return PRODUCTEN.find((p) => p.id === id);
}

function formatPrijs(bedrag) {
  return "€ " + bedrag.toFixed(2).replace(".", ",");
}
