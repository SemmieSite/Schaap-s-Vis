// FAQ-chatwidget - Schaap's Vis
// Vaste vraag-antwoordparen als klikbare knoppen. Geen vrij tekstveld,
// geen trefwoord-matching, geen externe API's of AI.

const FAQ_ITEMS = [
  {
    vraag: "Wat zijn de openingstijden?",
    antwoord: "We zijn open van dinsdag t/m zaterdag, 09:00 – 17:00 uur."
  },
  {
    vraag: "Wat kost bezorgen?",
    antwoord: "Wij bezorgen gratis bij u thuis. Betalen kan bij bezorging."
  },
  {
    vraag: "Welke dag bezorgen jullie?",
    antwoord: "Wij bezorgen op dinsdag, met een ochtend- of middagblok naar keuze."
  },
  {
    vraag: "Hoe bestel ik?",
    antwoord: "U kunt online bestellen via onze website, of telefonisch via 06 42900227."
  },
  {
    vraag: "Wat verkopen jullie?",
    antwoord: "Wij verkopen onder andere zalm, garnalen, biologische zalm en glutenvrije kibbeling. Bekijk het volledige aanbod bij Producten."
  },
  {
    vraag: "Waar komt jullie biologische zalm vandaan?",
    antwoord: "Onze biologische zalm komt van Vårlaks, gekweekt door familiebedrijven ver boven de poolcirkel in Noord-Noorwegen. Het koude, zuivere water daar zorgt voor gezonde vis, zonder antibiotica, chemicaliën of GMO's. Elke stap, van ei tot bord, is volledig traceerbaar."
  },
  {
    vraag: "Hoe kan ik contact opnemen?",
    antwoord: "U kunt ons bereiken op 06 42900227, of via het contactformulier."
  },
  {
    vraag: "Hoe kan ik betalen?",
    antwoord: "Betalen kan bij bezorging."
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
    <button type="button" class="faq-chat-knop" aria-label="Vragen? Open de chat" aria-expanded="false">
      <span class="faq-chat-icoon" aria-hidden="true">💬</span>
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
