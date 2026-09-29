# Schaap's Vis | Bezorgservice (MVP)

Website voor de bezorgservice van Schaap's Vishandel (Herenstraat 48, Leiden), gebouwd voor
Opdracht 2 (MVP/Webdesign) van de minor Startup Ville. Gericht op oudere klanten: grote
letters, een knop om de tekst nog groter te maken, en op elke pagina een telefoonnummer voor
wie liever belt. De homepage volgt de StoryBrand-opbouw: hero, result bar, probleem, missie,
gids (over ons), oplossing, plan, beloftes, bewijs, voor/na, call to action en footer.

## Snel aanpassen, zonder code

Alles wat je vaak wilt veranderen staat in **`js/instellingen.js`**. Op GitHub: open het
bestand, klik op het potlood, pas aan, klik op *Commit changes*. Vercel zet het vanzelf live.

| Wat | Waar in `js/instellingen.js` | Zolang het leeg is |
|---|---|---|
| Echte klantreacties | `klantreacties` | sectie "Wat klanten zeggen" blijft verborgen |
| Uitlegvideo (YouTube) | `videoYoutubeId` | videosectie blijft verborgen |
| Bestellingen en aanmeldingen direct binnen | `formulierUrl` (Formspree-link) | site opent het e-mailprogramma van de klant |

**Foto's** (verschijnen vanzelf zodra ze er staan, anders toont de site een tekening of icoon):

- `img/hero.jpg` grote foto bovenaan (bijvoorbeeld de toonbank of een bezorgtas aan de deur)
- `img/team-foto.jpg` foto van de familie of het team in de winkel
- `img/producten/zalm.jpg`, `kibbeling.jpg`, `makreel.jpg`, `garnalen.jpg`, `mosselen.jpg`,
  `haring.jpg`, `lekkerbek.jpg`, `soep.jpg`

**Bezoekersstatistieken:** in Vercel bij het project op *Analytics* > *Enable* klikken. Het
script staat al in alle pagina's (`/_vercel/insights/script.js`). Zo zie je hoeveel mensen
de homepage, de productpagina, de bestelpagina en de bedankpagina bezoeken.

## Structuur

```
index.html          Homepage (StoryBrand-opbouw)
producten.html      Productoverzicht met "toevoegen aan winkelwagen"
winkelwagen.html    Winkelwagen: aantallen aanpassen, verwijderen, totaal
bestellen.html      Bestelformulier (naam, adres, bezorgmoment) + overzicht
bedankt.html        Bevestigingspagina na het bestellen
contact.html        Contactgegevens en telefonisch bestellen
privacy.html        Korte privacyverklaring
css/style.css       Alle opmaak
js/instellingen.js  Klantreacties, video, formulierdienst (hier pas je dingen aan)
js/products.js      Producten, prijzen (voorbeeldprijzen) en productkaarten
js/cart.js          Winkelwagen-logica (localStorage)
js/site.js          Tekstgrootte, foto's, klantreacties, video, bestelbalk, weekaanbod
js/faq-chat.js      Veelgestelde vragen als klikbare knoppen
```

## Lokaal bekijken

Geen build-stap nodig, het is gewone HTML/CSS/JS. Start een lokale server vanuit deze map:

```
python3 -m http.server 8000
```

en open `http://localhost:8000` in de browser.

## Wat nog moet gebeuren voor een echte lancering

Dit is een MVP, bewust simpel gehouden. Voor een echt werkende versie nog nodig:

- **Bestellingen:** met een Formspree-link in `js/instellingen.js` komen bestellingen en
  aanmeldingen direct binnen (en zie je ze terug in het Formspree-overzicht). Zonder link
  opent het e-mailprogramma van de klant met alles al ingevuld. Check dat het adres in
  `bestelEmail` echt bestaat.
- **Betalen** gebeurt nog bij bezorging. Online betalen (bijvoorbeeld iDEAL) kan later
  toegevoegd worden.
- **Productfoto's**: zolang er geen foto's in `img/producten/` staan, toont de site iconen.
- **Prijzen en producten** in `js/products.js` zijn voorbeeldprijzen: check ze met de winkel.

## Hosting

Gehost op Vercel (schaap-s-vis.vercel.app), gekoppeld aan deze GitHub-repo: elke commit op
`main` staat binnen een minuut live. Let op: het gratis Hobby-plan van Vercel is alleen voor
niet-commercieel gebruik. Voor een echte webshop is Vercel Pro nodig (20 dollar per maand).

## Proces (documentatie voor Opdracht 2)

Dit hoort bij de opdracht, niet bij de live site zelf, bezoekers van de webshop
hoeven dit niet te zien.

### Story map, de klantreis

De reis van een oudere klant die verse vis wil, zonder de deur uit te hoeven:

1. **Ontdekken**, hoort over de bezorgservice via de winkel, een folder of via familie/buren.
2. **Overwegen**, twijfelt: is dit te vertrouwen, en is het niet te ingewikkeld?
3. **Bestellen**, bestelt via de website, óf belt de winkel voor wie liever niet online bestelt.
4. **Wachten**, krijgt een bevestiging en weet wanneer de bezorging komt.
5. **Ontvangen**, vis wordt vers aan de deur bezorgd; betalen kan bij bezorging.
6. **Terugkomen**, is tevreden en wordt vaste klant, met een volgende bestelling.

### Features

Uit de story map volgen de functies die de MVP nodig heeft. Al gebouwd in de webshop:

- Online bestelformulier met grote letters en duidelijke stappen
- Telefonisch bestellen als alternatief voor wie niet online wil
- Zelf de tekstgrootte aanpassen (A / A+ / A++)
- Winkelwagen met helder overzicht en totaalprijs
- Bevestigingspagina na het bestellen
- Contactgegevens en openingstijden direct zichtbaar
- Uitlegvideo op de homepage

Nog toe te voegen: _[vul aan, bv. bezorgdag kiezen, e-mailbevestiging, favorieten opslaan]_

### Low-fidelity MVP

_[Vervang dit door foto's/scans van je papieren schetsen of screenshots van je low-fi
Figma-frames: homepage, bestelformulier, winkelwagen. Zet ze bijvoorbeeld in een map
`docs/img/` en verwijs ernaar met `![omschrijving](docs/img/bestandsnaam.png)`.]_

### Klikbaar prototype

Voordat de webshop echt werd gebouwd, is eerst een klikbaar prototype getest:
_[plak hier je Figma-prototype link]_.

### High-fidelity MVP

De uitgewerkte versie is deze webshop zelf: volledig gestyled, met werkend
bestelproces en winkelwagen (zie hierboven).

### Ontwikkelactiviteiten

1. **Onderzoek & story map**, klantreis en behoeften van oudere klanten in kaart gebracht.
2. **Low-fi schetsen**, eerste opzet van de belangrijkste schermen.
3. **Klikbaar prototype**, getest of de flow logisch aanvoelt vóór het bouwen.
4. **Bouw high-fi MVP**, webshop gebouwd met HTML, CSS en JavaScript, gehost op GitHub Pages.
5. **Testen & bijschaven**, _[vul aan: bv. testen met echte klanten van de winkel]_

### Team & partners

- **Team**: _[namen teamgenoten en rol, bv. Sem Haasnoot, ontwikkeling & design]_
- **Partners**: _[bv. Schaap's Vis (de viszaak) als opdrachtgever/uitvoerende partij]_

### Kosten

| Onderdeel | Omschrijving | Kosten |
|---|---|---|
| Hosting | GitHub Pages | Gratis |
| Domeinnaam | _[bv. schaapsvis.nl]_ | _[vul in]_ |
| Ontwikkeling | _[eigen uren / externe hulp]_ | _[vul in]_ |
| Bezorging | _[bv. eigen auto / bezorger]_ | _[vul in]_ |

Alle bedragen zijn nog voorlopig en worden verder uitgewerkt in het businessplan.
