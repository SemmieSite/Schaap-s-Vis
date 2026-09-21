// FAQ-chatwidget - Schaap's Vis
// Vaste vraag-antwoordparen met trefwoordherkenning. Geen externe API's of AI.

const FAQ_ITEMS = [
  {
    trefwoorden: ["open", "openingstijden", "wanneer open"],
    antwoord: "We zijn open van dinsdag t/m zaterdag, 09:00 – 17:00 uur."
  },
  {
    trefwoorden: ["bezorg", "bezorgen", "bezorgkosten", "thuisbezorgd"],
    antwoord: "Wij bezorgen gratis bij u thuis. Betalen kan bij bezorging."
  },
  {
    trefwoorden: ["bestellen", "hoe bestel"],
    antwoord: "U kunt online bestellen via onze website, of telefonisch via 06 42900227."
  },
  {
    trefwoorden: ["assortiment", "producten", "wat verkopen"],
    antwoord: "Wij verkopen onder andere zalm, garnalen, biologische zalm en glutenvrije kibbeling. Bekijk het volledige aanbod bij Producten."
  },
  {
    trefwoorden: ["zalm", "biologische zalm", "vårlaks", "varlaks", "waar komt de zalm vandaan"],
    antwoord: "Onze biologische zalm komt van Vårlaks, gekweekt door familiebedrijven ver boven de poolcirkel in Noord-Noorwegen. Het koude, zuivere water daar zorgt voor gezonde vis, zonder antibiotica, chemicaliën of GMO's. Elke stap, van ei tot bord, is volledig traceerbaar."
  },
  {
    trefwoorden: ["contact", "telefoonnummer", "bellen", "nummer"],
    antwoord: "U kunt ons bereiken op 06 42900227, of via het contactformulier."
  },
  {
    trefwoorden: ["betalen", "betaling"],
    antwoord: "Betalen kan bij bezorging."
  }
];

const FAQ_STANDAARD_ANTWOORD = "Daar heb ik zo geen antwoord op. Bel ons gerust op 06 42900227, dan helpen wij u graag verder.";

function vindFaqAntwoord(vraag) {
  const ingevoerd = vraag.toLowerCase();
  const gevonden = FAQ_ITEMS.find((item) =>
    item.trefwoorden.some((trefwoord) => ingevoerd.includes(trefwoord.toLowerCase()))
  );
  return gevonden ? gevonden.antwoord : FAQ_STANDAARD_ANTWOORD;
}

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
      <form class="faq-chat-formulier">
        <input type="text" class="faq-chat-invoer" placeholder="Stel uw vraag..." aria-label="Uw vraag" autocomplete="off">
        <button type="submit" class="faq-chat-verstuur">Versturen</button>
      </form>
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
  const formulier = wrapper.querySelector(".faq-chat-formulier");
  const invoer = wrapper.querySelector(".faq-chat-invoer");

  function voegBerichtToe(tekst, type) {
    const bericht = document.createElement("div");
    bericht.className = `faq-chat-bubbel faq-chat-bubbel-${type}`;
    bericht.textContent = tekst;
    berichten.appendChild(bericht);
    berichten.scrollTop = berichten.scrollHeight;
  }

  function openChat() {
    venster.hidden = false;
    requestAnimationFrame(() => wrapper.classList.add("faq-chat-open"));
    knop.setAttribute("aria-expanded", "true");
    if (!berichten.children.length) {
      voegBerichtToe(
        "Goedendag! Waar kan ik u mee helpen? Vraag gerust naar bijvoorbeeld onze openingstijden, bezorging of de biologische zalm.",
        "antwoord"
      );
    }
    invoer.focus();
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

  formulier.addEventListener("submit", (event) => {
    event.preventDefault();
    const vraag = invoer.value.trim();
    if (!vraag) return;
    voegBerichtToe(vraag, "vraag");
    invoer.value = "";
    const antwoord = vindFaqAntwoord(vraag);
    setTimeout(() => voegBerichtToe(antwoord, "antwoord"), 300);
  });
}

document.addEventListener("DOMContentLoaded", bouwFaqWidget);
