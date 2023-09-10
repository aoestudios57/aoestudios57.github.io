// Montamos el canvas con alta resolución
var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = "1220px";
canvas.style.height = "400px";
var ctx = canvas.getContext("2d");

// Klasse Karte
class Karte {
  // Die static-Variablen gehören zur Klasse
  static x = 50;
  static y = 50;

  constructor(wert, symbol) {
    this.img = new Image();
    this.wert = wert;
    this.symbol = symbol;
  }
}

// Verwendete Variablen
var karten = [];
var spielerKarten = [];
var dealerKarten = [];
var kartenIndex = 0;
var symbole = ["S", "H", "D", "C"];
// Erzeugen der Karten mit Attributen Wert und Symbol
for (let i = 0; i < 4; i++) {
  for (let j = 1; j <= 13; j++) {
    karten.push(new Karte(j, symbole[i]));
  }
}

// Mischen der Karten
for (let i = 0; i < 100; i++) {
  karten.splice(Math.random() * 52, 0, karten[0]);
  karten.shift();
}

function zeichneKarte(K) {
  // Wir müssen zuerst die Karte laden und dann den src hinzufügen,
  // damit die Karten auf der Seite angezeigt werden
  K.img.onload = () => {
    ctx.drawImage(K.img, Karte.x, Karte.y, 239, 335);
    Karte.x += 300;
  };
  // Um das richtige Bild zu laden, verknüpfen wir die Nummer und das Symbol,
  // um den Dateinamen zu generieren
  K.img.src = "imagenes/cartas/" + K.wert.toString() + K.symbol + ".svg";
}

function karteZiehen() {
  // Wir setzen ein Maximum an gezogenen Karten, damit auch der Dealer seine Karten ziehen kann
  if (kartenIndex < 8) {
    let K = karten[kartenIndex]; // Gezogene Karte
    spielerKarten.push(K);
    zeichneKarte(K);
    kartenIndex++;
  }
}

function stehenBleiben() {
  document.getElementById("ziehen").disabled = true;
  document.getElementById("stehen").disabled = true;
  document.getElementById("neustart").style.visibility = "visible";
  let punkteSpieler = 0;
  let punkteDealer = 0;
  let info = document.getElementById("info");
  // Zählen und Anzeigen der Punkte des Spielers
  for (let i in spielerKarten) {
    punkteSpieler += spielerKarten[i].wert;
  }
  // Ziehen von Karten für den Dealer und Zählen seiner Punkte
  while (punkteDealer < 17) {
    dealerKarten.push(karten[kartenIndex]);
    punkteDealer += karten[kartenIndex].wert;
    kartenIndex++;
  }
  // Die Punkte des Spiels werden in "info" angezeigt
  info.innerHTML = "Spielerpunkte: " + punkteSpieler + "<br>Dealerpunkte: " + punkteDealer;
  // Zeichnen der Dealer-Karten
  Karte.x = 50;
  Karte.y = 400;
  for (let i in dealerKarten) {
    zeichneKarte(dealerKarten[i]);
  }
  // Überprüfung des Gewinners
  if (punkteSpieler == 21) {
    info.innerHTML += "<br><b>Blackjack!!! Du hast gewonnen!</b>";
  } else if (punkteSpieler > 21) {
    info.innerHTML += "<br><b>Du hast verloren... Du hast zu viele Punkte</b>";
  } else if (punkteDealer > 21) {
    info.innerHTML += "<br><b>Du hast gewonnen!!! Der Dealer hat zu viele Punkte</b>";
  } else if (punkteDealer >= punkteSpieler) {
    info.innerHTML += "<br><b>Der Dealer hat gewonnen...</b>";
  } else {
    info.innerHTML += "<br><b>Du hast gewonnen!!!</b>";
  }
}

// Seite neu laden, wenn der Button geklickt wird
function nochmalSpielen() {
  location.reload(true);
}
