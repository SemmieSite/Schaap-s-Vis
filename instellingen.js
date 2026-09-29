/* ============================================================
   INSTELLINGEN VAN DE SITE
   Dit is het enige bestand dat je hoeft aan te passen om
   klantreacties, de video of het bestelformulier te regelen.
   Aanpassen op GitHub: open dit bestand, klik op het potlood,
   wijzig de tekst tussen de aanhalingstekens en klik op
   "Commit changes". Vercel zet het daarna vanzelf live.
   ============================================================ */

const INSTELLINGEN = {
  // Telefoonnummer zoals het op de site staat, en in belbaar formaat.
  telefoon: "06 42900227",
  telefoonLink: "tel:+31642900227",

  // E-mailadres waar bestellingen naartoe gaan als er (nog) geen
  // formulierdienst is ingesteld. LET OP: dit adres moet echt bestaan.
  bestelEmail: "bestellingen@schaapsvis.nl",

  // Formulierdienst (Formspree). Maak gratis een formulier aan op
  // formspree.io en plak hier de link, bijvoorbeeld:
  // "https://formspree.io/f/abcdwxyz"
  // Leeg laten = bestellingen gaan via het e-mailprogramma van de klant.
  formulierUrl: "",

  // YouTube-video. Plak alleen de code uit de link.
  // Voorbeeld: bij https://www.youtube.com/watch?v=AbC123xYz
  // vul je "AbC123xYz" in. Leeg laten = de eigen uitlegvideo (uitleg.html) blijft staan.
  videoYoutubeId: "",

  // Echte klantreacties. Alleen echte reacties invullen, met
  // toestemming van de klant. Leeg laten = de sectie blijft verborgen.
  // Voorbeeld van de opbouw:
  // { tekst: "Wat de klant zei.", naam: "Voornaam", plaats: "Leiden" },
  klantreacties: [
  ],
};
