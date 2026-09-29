/* Algemene site-functies: tekstgrootte, foto's, uitgelichte producten,
   klantreacties, video, bestelbalk en het weekaanbod-formulier. */

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

/* ---------- Video (alleen als er een YouTube-code is ingevuld) ---------- */

function toonVideo() {
  const sectie = document.getElementById("video-sectie");
  const id = (INST.videoYoutubeId || "").trim();
  if (!sectie || !id) return;
  const omslag = sectie.querySelector(".video-omslag");
  const frame = document.createElement("iframe");
  frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
  frame.title = "Uitlegvideo bezorgservice Schaap's Vis";
  frame.allow = "accelerometer; encrypted-media; picture-in-picture";
  frame.allowFullscreen = true;
  frame.loading = "lazy";
  omslag.appendChild(frame);
  sectie.hidden = false;
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
  werkBestelBalkBij();
  document.addEventListener("winkelwagen-gewijzigd", werkBestelBalkBij);
});
