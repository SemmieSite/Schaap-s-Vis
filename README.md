# Schaap's Vis — Bezorgservice (MVP)

Website voor de bezorgservice van de viszaak, gebouwd voor Opdracht 2 (MVP/Webdesign)
van de minor Startup Ville. Gericht op oudere klanten: grote letters, een knop om de
tekst nog groter te maken, en op elke pagina een telefoonnummer voor wie liever belt.

## Structuur

```
index.html         Homepage
producten.html      Productoverzicht met "toevoegen aan winkelwagen"
winkelwagen.html     Winkelwagen: aantallen aanpassen, verwijderen, totaal
bestellen.html       Bestelformulier (naam, adres, bezorgmoment) + overzicht
bedankt.html         Bevestigingspagina na het bestellen
contact.html         Contactgegevens en telefonisch bestellen
css/style.css        Alle opmaak
js/products.js       Productdata (placeholder)
js/cart.js           Winkelwagen-logica (localStorage)
js/site.js           Tekstgrootte-voorkeur
```

## Lokaal bekijken

Geen build-stap nodig, het is gewone HTML/CSS/JS. Start een lokale server vanuit deze map:

```
python3 -m http.server 8000
```

en open `http://localhost:8000` in de browser.

## Wat nog moet gebeuren voor een echte lancering

Dit is een MVP, bewust simpel gehouden. Voor een echt werkende versie nog nodig:

- **Bestellingen komen nu aan als e-mail.** Er is geen server: bij het afronden van
  een bestelling opent het e-mailprogramma van de klant met alles al ingevuld, en
  moet de klant zelf op "verzenden" klikken. Werkt prima als MVP, maar niet
  waterdicht (als iemand geen e-mailprogramma heeft ingesteld, lukt dit niet — vandaar
  ook steeds de telefonische bestel-optie op de site). Voor een volgende versie: een
  echte order-verwerking (bijvoorbeeld Formspree, Netlify Forms, of een eigen back-end).
- **Betalen** gebeurt nog bij bezorging. Online betalen (bijvoorbeeld iDEAL) kan later
  toegevoegd worden.
- **Productfoto's**: nu staan er emoji's als tijdelijke plaatjes in plaats van echte foto's.
- **Contactgegevens** (adres, telefoonnummer) staan nog als placeholder
  (`[Straatnaam en huisnummer]`, `0000 - 000 000`) in alle bestanden — zoek-en-vervang dit
  voor de echte gegevens.
- **Prijzen en producten** in `js/products.js` zijn voorbeelddata.

## Hosting

Deze site is een verzameling statische bestanden, dus prima te hosten via GitHub Pages:
Settings → Pages → Deploy from branch → `main` → `/ (root)`.
