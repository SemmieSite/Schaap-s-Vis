// FAQ-chatwidget - Schaap's Vis
// Vaste vraag-antwoordparen als klikbare knoppen. Geen vrij tekstveld,
// geen trefwoord-matching, geen externe API's of AI.

const FAQ_ITEMS = [
  {
    vraag: "Welke dag bezorgen jullie?",
    antwoord: "Wij bezorgen op dinsdag. U kiest zelf: 's ochtends (9:00 tot 12:00) of 's middags (13:00 tot 17:00)."
  },
  {
    vraag: "Wat kost bezorgen?",
    antwoord: "Niets, wij bezorgen gratis bij u thuis. U betaalt alleen uw vis, pas bij de deur."
  },
  {
    vraag: "Hoe bestel ik?",
    antwoord: "Kies uw vis op de homepage en rond onderaan de pagina uw bestelling af. Liever bellen? Bel 06 42900227, dan noteren wij het voor u."
  },
  {
    vraag: "Kan ik bestellen voor iemand anders?",
    antwoord: "Ja. Vul bij het bestellen gewoon het adres in van degene die de vis krijgt, bijvoorbeeld uw vader of moeder."
  },
  {
    vraag: "Wat zijn de openingstijden van de winkel?",
    antwoord: "De winkel aan de Herenstraat 48 in Leiden is open van dinsdag tot en met vrijdag van 9:00 tot 18:00, en op zaterdag van 9:00 tot 17:00."
  },
  {
    vraag: "Wat verkopen jullie?",
    antwoord: "Wij verkopen onder andere zalm, garnalen, biologische zalm en kibbeling. Bekijk het volledige aanbod bij Producten."
  },
  {
    vraag: "Waar komt jullie biologische zalm vandaan?",
    antwoord: "Onze biologische zalm komt van Vårlaks, gekweekt door familiebedrijven ver boven de poolcirkel in Noord-Noorwegen. Het koude, zuivere water daar zorgt voor gezonde vis, zonder antibiotica, chemicaliën of GMO's. Elke stap, van ei tot bord, is volledig traceerbaar."
  },
  {
    vraag: "Hoe kan ik betalen?",
    antwoord: "U betaalt bij de deur, als u uw vis heeft. Online betalen is nog niet nodig."
  },
  {
    vraag: "Hoe kan ik contact opnemen?",
    antwoord: "Bel ons op 06 42900227, of kom langs in de winkel aan de Herenstraat 48 in Leiden."
  }
];

function bouwFaqWidget() {
  const wrapper = document.createElement("div");
  wrapper.className = "faq-chat";
  wrapper.innerHTML = `
    <div class="faq-chat-venster" role="dialog" aria-label="Veelgestelde vragen" hidden>
      <div class="faq-chat-header">
        <span>Vragen? Wij helpen u graag</span>
        <button type="button" class="faq-chat-sluiten" aria-label="Chat sluiten">✕</button>
      </div>
      <div class="faq-chat-berichten" aria-live="polite"></div>
    </div>
    <button type="button" class="faq-chat-knop" aria-label="Vragen? Open de veelgestelde vragen" aria-expanded="false">
      <svg class="faq-chat-icoon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>
      <span class="faq-chat-label">Vragen?</span>
    </button>
  `;
  document.body.appendChild(wrapper);

  const knop = wrapper.querySelector(".faq-chat-knop");
  const venster = wrapper.querySelector(".faq-chat-venster");
  const sluitKnop = wrapper.querySelector(".faq-chat-sluiten");
  const berichten = wrapper.querySelector(".faq-chat-berichten");

  const gesteldeVragen = new Set();

  function voegBerichtToe(tekst, type) {
    const bericht = document.createElement("div");
    bericht.className = `faq-chat-bubbel faq-chat-bubbel-${type}`;
    bericht.textContent = tekst;
    berichten.appendChild(bericht);
    berichten.scrollTop = berichten.scrollHeight;
  }

  function toonVraagknoppen() {
    let lijst = berichten.querySelector(".faq-chat-vragenlijst");
    if (!lijst) {
      lijst = document.createElement("div");
      lijst.className = "faq-chat-vragenlijst";
    }
    lijst.innerHTML = "";

    FAQ_ITEMS.filter((item) => !gesteldeVragen.has(item.vraag)).forEach((item) => {
      const vraagKnop = document.createElement("button");
      vraagKnop.type = "button";
      vraagKnop.className = "faq-chat-vraagknop";
      vraagKnop.textContent = item.vraag;
      vraagKnop.addEventListener("click", () => kiesVraag(item));
      lijst.appendChild(vraagKnop);
    });

    berichten.appendChild(lijst);
    berichten.scrollTop = berichten.scrollHeight;
  }

  function kiesVraag(item) {
    gesteldeVragen.add(item.vraag);
    voegBerichtToe(item.vraag, "vraag");
    setTimeout(() => {
      voegBerichtToe(item.antwoord, "antwoord");
      toonVraagknoppen();
    }, 300);
  }

  function openChat() {
    venster.hidden = false;
    requestAnimationFrame(() => wrapper.classList.add("faq-chat-open"));
    knop.setAttribute("aria-expanded", "true");
    if (!berichten.children.length) {
      voegBerichtToe("Goedendag! Kies hieronder een vraag.", "antwoord");
      toonVraagknoppen();
    }
  }

  function sluitChat() {
    wrapper.classList.remove("faq-chat-open");
    knop.setAttribute("aria-expanded", "false");
    setTimeout(() => {
      venster.hidden = true;
    }, 250);
  }

  knop.addEventListener("click", () => {
    if (wrapper.classList.contains("faq-chat-open")) {
      sluitChat();
    } else {
      openChat();
    }
  });

  sluitKnop.addEventListener("click", sluitChat);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && wrapper.classList.contains("faq-chat-open")) {
      sluitChat();
    }
  });
}

document.addEventListener("DOMContentLoaded", bouwFaqWidget);
