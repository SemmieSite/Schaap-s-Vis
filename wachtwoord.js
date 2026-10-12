/* Wachtwoordscherm voor Schaap's Vis.
   Staat als eerste script in de <head> van elke pagina. Zonder het juiste
   wachtwoord blijft de pagina verborgen; na invullen onthoudt de browser dat.

   LET OP: dit is een afscherming in de browser, geen echte beveiliging.
   De pagina's worden wel gedownload, ze zijn alleen verborgen. Wie de broncode
   bekijkt kan de pagina's lezen of het wachtwoord proberen te raden.
   Voor echte beveiliging: Vercel > Settings > Deployment Protection.

   Wachtwoord wijzigen: zet WACHTWOORD_HASH op de SHA-256 van "schaapsvis:" +
   het nieuwe wachtwoord (bijvoorbeeld via https://emn178.github.io/online-tools/sha256.html).
   Wachtwoordscherm helemaal uitzetten: zet WACHTWOORD_HASH op "". */

(function () {
  "use strict";

  var WACHTWOORD_HASH = "5aaf26fb1ad8461258d04f227151893990f618da1cdf937b8e851bd8439ff3db";
  var ONTHOUD_SLEUTEL = "schaapsvis_toegang";
  var ZOUT = "schaapsvis:";

  if (!WACHTWOORD_HASH) return;

  function leesOnthouden() {
    try { return localStorage.getItem(ONTHOUD_SLEUTEL); } catch (fout) { return null; }
  }

  function bewaarOnthouden() {
    try { localStorage.setItem(ONTHOUD_SLEUTEL, WACHTWOORD_HASH); } catch (fout) { /* geen opslag: dan vraagt de site het op elke pagina opnieuw */ }
  }

  if (leesOnthouden() === WACHTWOORD_HASH) return;

  var root = document.documentElement;
  var verberg = document.createElement("style");
  verberg.id = "slot-stijl";
  verberg.textContent =
    "html.slot-actief body > *:not(#slot-scherm){display:none!important}" +
    "#slot-scherm{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:1rem;background:#eef3f2;color:#1a1a1a;font-family:'Public Sans',system-ui,-apple-system,'Segoe UI',Arial,sans-serif;font-size:18px;line-height:1.5}" +
    "#slot-scherm .slot-kaart{width:100%;max-width:26rem;background:#fff;border:1px solid #d8d2c4;border-radius:7px;padding:2rem 1.5rem;box-shadow:0 2px 12px rgba(11,37,69,.12)}" +
    "#slot-scherm h1{margin:0 0 .5rem;font-family:'Bitter',Georgia,serif;font-size:1.6rem;line-height:1.2;color:#0b2545}" +
    "#slot-scherm p{margin:0 0 1.25rem}" +
    "#slot-scherm label{display:block;margin-bottom:.35rem;font-weight:600}" +
    "#slot-scherm input[type=password],#slot-scherm input[type=text]{box-sizing:border-box;width:100%;padding:.75rem;font:inherit;border:2px solid #6b6b6b;border-radius:7px}" +
    "#slot-scherm input[type=password]:focus,#slot-scherm input[type=text]:focus{outline:3px solid #0b6e6e;outline-offset:2px;border-color:#0b6e6e}" +
    "#slot-scherm .slot-toon{display:flex;align-items:center;gap:.5rem;margin:.75rem 0 1.25rem;font-weight:400}" +
    "#slot-scherm .slot-toon input{width:1.25rem;height:1.25rem;margin:0}" +
    "#slot-scherm button{width:100%;padding:.85rem 1rem;font:inherit;font-weight:700;color:#fff;background:#0b6e6e;border:0;border-radius:7px;cursor:pointer}" +
    "#slot-scherm button:hover{background:#084f4f}" +
    "#slot-scherm button:focus-visible{outline:3px solid #0b2545;outline-offset:2px}" +
    "#slot-scherm .slot-fout{min-height:1.5rem;margin:1rem 0 0;color:#b00020;font-weight:600}";
  document.head.appendChild(verberg);
  root.classList.add("slot-actief");

  function sha256Hex(tekst) {
    var bytes = new TextEncoder().encode(tekst);
    return crypto.subtle.digest("SHA-256", bytes).then(function (buffer) {
      return Array.prototype.map.call(new Uint8Array(buffer), function (b) {
        return ("0" + b.toString(16)).slice(-2);
      }).join("");
    });
  }

  function ontgrendel() {
    bewaarOnthouden();
    root.classList.remove("slot-actief");
    var scherm = document.getElementById("slot-scherm");
    if (scherm) scherm.remove();
    var stijl = document.getElementById("slot-stijl");
    if (stijl) stijl.remove();
  }

  function toonScherm() {
    var scherm = document.createElement("div");
    scherm.id = "slot-scherm";
    scherm.setAttribute("role", "dialog");
    scherm.setAttribute("aria-modal", "true");
    scherm.setAttribute("aria-labelledby", "slot-titel");
    scherm.innerHTML =
      '<div class="slot-kaart">' +
        '<h1 id="slot-titel">Schaap\'s Vis</h1>' +
        '<p>Deze website is nog niet openbaar. Vul het wachtwoord in om verder te gaan.</p>' +
        '<form id="slot-formulier" novalidate>' +
          '<label for="slot-invoer">Wachtwoord</label>' +
          '<input type="password" id="slot-invoer" autocomplete="current-password" autocapitalize="off" spellcheck="false" required>' +
          '<label class="slot-toon"><input type="checkbox" id="slot-toon"> Toon wachtwoord</label>' +
          '<button type="submit">Verder</button>' +
          '<p class="slot-fout" id="slot-fout" role="alert"></p>' +
        '</form>' +
      '</div>';
    document.body.appendChild(scherm);

    var formulier = document.getElementById("slot-formulier");
    var invoer = document.getElementById("slot-invoer");
    var fout = document.getElementById("slot-fout");

    document.getElementById("slot-toon").addEventListener("change", function (e) {
      invoer.type = e.target.checked ? "text" : "password";
    });

    formulier.addEventListener("submit", function (e) {
      e.preventDefault();
      fout.textContent = "";
      if (!window.crypto || !crypto.subtle) {
        fout.textContent = "Dit werkt alleen via een beveiligde verbinding (https).";
        return;
      }
      sha256Hex(ZOUT + invoer.value).then(function (hash) {
        if (hash === WACHTWOORD_HASH) {
          ontgrendel();
        } else {
          fout.textContent = "Dat wachtwoord klopt niet. Probeer het nog eens.";
          invoer.select();
        }
      });
    });

    invoer.focus();
  }

  if (document.body) {
    toonScherm();
  } else {
    document.addEventListener("DOMContentLoaded", toonScherm);
  }
})();
