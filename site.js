/* Algemene site-functies: tekstgrootte, foto's, uitgelichte producten,
   klantreacties, video, bestelbalk, bestellen op de homepage en het weekaanbod. */

const TEKSTGROOTTE_SLEUTEL = "schaapsvis_tekstgrootte";
const INST = typeof INSTELLINGEN !== "undefined" ? INSTELLINGEN : {};

/* ---------- Tekstgrootte ---------- */

function pasTekstgrootteToe(grootte) {
  document.documentElement.setAttribute("data-tekstgrootte", grootte);
  document.querySelectorAll(".tekstgrootte-knoppen button").forEach((knop) => {
    const actief = knop.dataset.grootte === grootte;
    knop.classList.toggle("actief", actief);
    knop.setAttribute("aria-pressed", actief ? "true" : "false");
  });
  try {
    localStorage.setItem(TEKSTGROOTTE_SLEUTEL, grootte);
  } catch (fout) {
    /* opslaan lukt niet (bijv. privévenster): geen probleem */
  }
}

/* ---------- Eigen foto's met nette terugval ----------
   <img data-bronnen="img/a.jpg,img/a.png"> probeert de bronnen op volgorde.
   Lukt geen enkele, dan krijgt de omliggende [data-foto-plek] de klasse
   "zonder-foto" en toont de site de tekening of tekst die er al staat. */

function laadEigenFotos() {
  document.querySelectorAll("img[data-bronnen]").forEach((img) => {
    const plek = img.closest("[data-foto-plek]") || img.parentElement;
    const bronnen = img.dataset.bronnen.split(",").map((b) => b.trim()).filter(Boolean);
    let i = 0;
    const probeer = () => {
      if (i >= bronnen.length) {
        plek.classList.add("zonder-foto");
        img.remove();
        return;
      }
      const test = new Image();
      test.onload = () => {
        img.src = test.src;
        plek.classList.add("met-foto");
      };
      test.onerror = () => { i += 1; probeer(); };
      test.src = bronnen[i];
    };
    probeer();
  });
}

/* ---------- Uitgelichte producten op de homepage ---------- */

function toonUitgelichteProducten() {
  const grid = document.getElementById("uitgelicht-grid");
  if (!grid || typeof PRODUCTEN === "undefined") return;
  PRODUCTEN.filter((p) => p.uitgelicht).forEach((p) => grid.appendChild(bouwProductKaart(p)));
}

/* ---------- Klantreacties (alleen als ze zijn ingevuld) ---------- */

function toonKlantreacties() {
  const blok = document.getElementById("klantreacties");
  const reacties = Array.isArray(INST.klantreacties) ? INST.klantreacties.filter((r) => r && r.tekst) : [];
  if (!blok || reacties.length === 0) return;
  const grid = blok.querySelector(".testimonials-grid");
  reacties.forEach((r) => {
    const quote = document.createElement("figure");
    quote.className = "klantreactie";
    const tekst = document.createElement("blockquote");
    tekst.textContent = `"${r.tekst}"`;
    const naam = document.createElement("figcaption");
    naam.textContent = [r.naam, r.plaats].filter(Boolean).join(", ");
    quote.append(tekst, naam);
    grid.appendChild(quote);
  });
  blok.hidden = false;
}

/* ---------- Video: eigen uitlegvideo, of YouTube als die is ingevuld ---------- */

function toonVideo() {
  const sectie = document.getElementById("video-sectie");
  const id = (INST.videoYoutubeId || "").trim();
  if (!sectie || !id) return;
  const frame = sectie.querySelector(".video-omslag iframe");
  if (!frame) return;
  frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
  frame.title = "Uitlegvideo bezorgservice Schaap's Vis";
  frame.allow = "accelerometer; encrypted-media; picture-in-picture";
  const link = sectie.querySelector(".video-link");
  if (link) link.remove();
}

/* ---------- Bestelbalk onderin (zodra er iets in de winkelwagen zit) ---------- */

function werkBestelBalkBij() {
  const balk = document.getElementById("bestel-balk");
  if (!balk || typeof winkelwagenAantalTotaal === "undefined") return;
  const aantal = winkelwagenAantalTotaal();
  if (aantal > 0) {
    balk.querySelector(".bestel-balk-tekst").textContent =
      `${aantal} ${aantal === 1 ? "product" : "producten"} gekozen · ${formatPrijs(winkelwagenTotaalPrijs())}`;
    balk.hidden = false;
    document.body.classList.add("heeft-bestelbalk");
  } else {
    balk.hidden = true;
    document.body.classList.remove("heeft-bestelbalk");
  }
}

/* ---------- Formulieren versturen ----------
   Met een Formspree-link in js/instellingen.js gaat alles direct naar de
   winkel. Zonder link valt de site terug op het e-mailprogramma. */

function heeftFormulierdienst() {
  return Boolean((INST.formulierUrl || "").trim());
}

async function verstuurNaarFormulierdienst(gegevens) {
  const antwoord = await fetch(INST.formulierUrl.trim(), {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(gegevens),
  });
  if (!antwoord.ok) throw new Error("Formulier niet verstuurd: " + antwoord.status);
  return true;
}

function maakMailLink(onderwerp, tekst) {
  return `mailto:${INST.bestelEmail || ""}?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(tekst)}`;
}

function koppelWeekaanbodFormulier() {
  const form = document.getElementById("weekaanbod-form");
  if (!form) return;
  const melding = form.querySelector(".form-melding");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const email = form.email.value.trim();
    const knop = form.querySelector("button[type=submit]");
    if (heeftFormulierdienst()) {
      knop.disabled = true;
      knop.textContent = "Even geduld...";
      try {
        await verstuurNaarFormulierdienst({ _subject: "Aanmelding weekaanbod", soort: "weekaanbod", email });
        form.reset();
        melding.textContent = "Dank u wel! U krijgt vanaf maandag ons weekaanbod.";
        melding.className = "form-melding gelukt";
      } catch (fout) {
        melding.textContent = "Dat lukte helaas niet. Probeer het later nog eens, of bel ons op " + (INST.telefoon || "") + ".";
        melding.className = "form-melding fout";
      }
      knop.disabled = false;
      knop.textContent = "Aanmelden";
    } else {
      window.location.href = maakMailLink("Aanmelding weekaanbod", `Ik wil graag elke maandag het weekaanbod ontvangen op: ${email}`);
      melding.textContent = "Uw e-mailprogramma opent nu. Klik daar op Verzenden om de aanmelding af te ronden.";
      melding.className = "form-melding gelukt";
    }
  });
}

/* ---------- Bestellen op de homepage (alles op één pagina) ---------- */

function tekenBestelKaart() {
  const kaart = document.getElementById("bestel-kaart");
  if (!kaart || kaart.dataset.klaar === "ja" || typeof winkelwagenRegels === "undefined") return;
  const regels = winkelwagenRegels();
  kaart.querySelector('[data-deel="leeg"]').hidden = regels.length > 0;
  kaart.querySelector('[data-deel="formulier"]').hidden = regels.length === 0;
  const lijst = document.getElementById("home-overzicht-regels");
  lijst.innerHTML = "";
  regels.forEach((r) => {
    const rij = document.createElement("div");
    rij.className = "overzicht-regel";
    rij.innerHTML = `
      <span class="regel-naam">${r.product.naam}</span>
      <span class="aantal-kiezer klein">
        <button type="button" class="min-knop" aria-label="Eén ${r.product.naam} minder">−</button>
        <span class="regel-aantal">${r.aantal}</span>
        <button type="button" class="plus-knop" aria-label="Eén ${r.product.naam} meer">+</button>
      </span>
      <span class="regel-prijs">${formatPrijs(r.subtotaal)}</span>`;
    rij.querySelector(".min-knop").addEventListener("click", () => stelAantalIn(r.product.id, r.aantal - 1));
    rij.querySelector(".plus-knop").addEventListener("click", () => stelAantalIn(r.product.id, Math.min(20, r.aantal + 1)));
    lijst.appendChild(rij);
  });
  document.getElementById("home-overzicht-totaal").textContent = formatPrijs(winkelwagenTotaalPrijs());
}

function koppelBestelFormulier() {
  const kaart = document.getElementById("bestel-kaart");
  const form = document.getElementById("bestelformulier");
  if (!kaart || !form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const regels = winkelwagenRegels();
    if (regels.length === 0) {
      tekenBestelKaart();
      return;
    }
    const g = {
      naam: form.naam.value.trim(),
      straat: form.straat.value.trim(),
      postcode: form.postcode.value.trim(),
      plaats: form.plaats.value.trim(),
      telefoon: form.telefoon.value.trim(),
      bezorgmoment: form.bezorgmoment.value,
      opmerkingen: form.opmerkingen.value.trim(),
    };
    const totaal = formatPrijs(winkelwagenTotaalPrijs());
    const regelTekst = regels.map((r) => `- ${r.aantal} × ${r.product.naam} (${formatPrijs(r.subtotaal)})`).join("\n");
    const bodyTekst =
      `Nieuwe bestelling via de website\n\n` +
      `Naam: ${g.naam}\n` +
      `Adres: ${g.straat}, ${g.postcode} ${g.plaats}\n` +
      `Telefoon: ${g.telefoon}\n` +
      `Bezorgmoment: dinsdag, ${g.bezorgmoment}\n` +
      `Opmerkingen: ${g.opmerkingen || "-"}\n\n` +
      `Bestelde producten:\n${regelTekst}\n\n` +
      `Totaal: ${totaal}`;

    const knop = form.querySelector("button[type=submit]");
    let verzonden = false;
    if (heeftFormulierdienst()) {
      knop.disabled = true;
      knop.textContent = "Bestelling wordt verstuurd...";
      try {
        await verstuurNaarFormulierdienst({
          _subject: `Nieuwe bestelling: ${g.naam}`,
          soort: "bestelling",
          naam: g.naam,
          adres: `${g.straat}, ${g.postcode} ${g.plaats}`,
          telefoon: g.telefoon,
          bezorgmoment: `dinsdag, ${g.bezorgmoment}`,
          opmerkingen: g.opmerkingen || "-",
          producten: regelTekst,
          totaal,
        });
        verzonden = true;
      } catch (fout) {
        console.error(fout);
      }
    }

    const tel = `<a href="${INST.telefoonLink}">${INST.telefoon}</a>`;
    const vinkje = '<div class="bedankt-icoon" aria-hidden="true"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4L12 14l-3-3"/></svg></div>';
    const bevestiging = kaart.querySelector('[data-deel="klaar"]');
    if (verzonden) {
      bevestiging.innerHTML = `${vinkje}
        <h3 class="bestel-kop">Dank u wel, uw bestelling is binnen!</h3>
        <p>Wij brengen uw vis aanstaande dinsdag in de ${g.bezorgmoment.toLowerCase()}. U betaalt ${totaal} aan de deur.</p>
        <p>Wilt u iets veranderen? Bel ons op ${tel}.</p>`;
    } else {
      bevestiging.innerHTML = `${vinkje}
        <h3 class="bestel-kop">Bijna klaar, nog één stap</h3>
        <p>Klik op de knop hieronder. Uw e-mailprogramma opent dan met de bestelling al ingevuld. U hoeft alleen nog op <strong>Verzenden</strong> te klikken.</p>
        <p><a class="knop knop-primair knop-groot-auto" href="${maakMailLink(`Nieuwe bestelling: ${g.naam}`, bodyTekst)}">Bestelling verzenden per e-mail</a></p>
        <p class="let-op">Lukt dit niet? Bel ons dan op ${tel}, dan noteren wij uw bestelling telefonisch.</p>`;
    }
    kaart.dataset.klaar = "ja";
    kaart.querySelector('[data-deel="formulier"]').hidden = true;
    kaart.querySelector('[data-deel="leeg"]').hidden = true;
    bevestiging.hidden = false;
    maakWinkelwagenLeeg();
    bevestiging.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function koppelToonAlleProducten() {
  const knop = document.getElementById("toon-alle-producten");
  const grid = document.getElementById("overige-grid");
  if (!knop || !grid || typeof PRODUCTEN === "undefined") return;
  knop.addEventListener("click", () => {
    PRODUCTEN.filter((p) => !p.uitgelicht).forEach((p) => grid.appendChild(bouwProductKaart(p)));
    grid.hidden = false;
    knop.closest(".sectie-cta").remove();
  });
}

/* De balk onderin is niet nodig als het bestelformulier al in beeld is. */
function verbergBalkBijBestellen() {
  const sectie = document.getElementById("bestellen");
  if (!sectie || !document.getElementById("bestel-balk") || !("IntersectionObserver" in window)) return;
  new IntersectionObserver((items) => {
    document.body.classList.toggle("bij-bestellen", items[0].isIntersecting);
  }, { threshold: 0.05 }).observe(sectie);
}

/* ---------- Start ---------- */

document.addEventListener("DOMContentLoaded", () => {
  let opgeslagenGrootte = "normaal";
  try {
    opgeslagenGrootte = localStorage.getItem(TEKSTGROOTTE_SLEUTEL) || "normaal";
  } catch (fout) {
    /* geen opgeslagen voorkeur */
  }
  pasTekstgrootteToe(opgeslagenGrootte);
  document.querySelectorAll(".tekstgrootte-knoppen button").forEach((knop) => {
    knop.addEventListener("click", () => pasTekstgrootteToe(knop.dataset.grootte));
  });

  laadEigenFotos();
  toonUitgelichteProducten();
  toonKlantreacties();
  toonVideo();
  koppelWeekaanbodFormulier();
  koppelToonAlleProducten();
  koppelBestelFormulier();
  tekenBestelKaart();
  verbergBalkBijBestellen();
  werkBestelBalkBij();
  document.addEventListener("winkelwagen-gewijzigd", werkBestelBalkBij);
  document.addEventListener("winkelwagen-gewijzigd", tekenBestelKaart);
});
