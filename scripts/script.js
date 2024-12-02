let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "Spieler 1"; // Startspieler ist "Spieler 1"
let gameOver = false; // Variable, um festzustellen, ob das Spiel zu Ende ist

let winningCombinations = [
  [0, 1, 2], // Erste horizontale Reihe
  [3, 4, 5], // Zweite horizontale Reihe
  [6, 7, 8], // Dritte horizontale Reihe
  [0, 3, 6], // Erste vertikale Reihe
  [1, 4, 7], // Zweite vertikale Reihe
  [2, 5, 8], // Dritte vertikale Reihe
  [0, 4, 8], // Diagonale von oben links nach unten rechts
  [2, 4, 6], // Diagonale von unten links nach oben rechts
];

function init() {
  render(); // Tabelle rendern
  updateCurrentPlayerDisplay(); // Anzeige des aktuellen Spielers aktualisieren
}

function render() {
  let contentDiv = document.getElementById("content");
  let html = "<table>";
  html += "<tbody>"; // Beginne das tbody-Tag hier

  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      let fieldIndex = i * 3 + j;
      let field = fields[fieldIndex];

      let symbol = "";
      if (field === "Spieler 1") {
        symbol = generateCircleSVG(); // Kreis für Spieler 1
      } else if (field === "Spieler 2") {
        symbol = generateXSVG(); // Kreuz für Spieler 2
      }

      // Erstelle die Tabelle mit onclick-Event für jedes td
      html += `<td onclick="handleClick(${fieldIndex})">${symbol}</td>`;
    }
    html += "</tr>";
  }

  html += "</tbody>"; // Ende des tbody-Tags
  html += "</table>";
  contentDiv.innerHTML = html;
}

function renderField(index) {
  const cell = document.querySelectorAll("td")[index];
  let symbol = "";
  if (fields[index] === "Spieler 1") {
    symbol = generateCircleSVG(); // Kreis für Spieler 1
  } else if (fields[index] === "Spieler 2") {
    symbol = generateXSVG(); // Kreuz für Spieler 2
  }
  cell.innerHTML = symbol;
}

// Die Funktion, die nur das angeklickte Feld aktualisiert
function handleClick(index) {
  if (gameOver || fields[index]) return; // Wenn das Spiel vorbei ist oder das Feld schon besetzt ist, passiert nichts

  fields[index] = currentPlayer; // Setze das Symbol für den aktuellen Spieler
  renderField(index); // Nur das angeklickte Feld neu rendern

  // Überprüfe, ob ein Spieler gewonnen hat
  const winnerCombination = checkWinner();
  if (winnerCombination) {
    gameOver = true; // Das Spiel ist vorbei
    drawWinningLine(winnerCombination); // Zeichne die Linie für die Gewinnerfelder
    setTimeout(() => {
      alert(currentPlayer + " hat gewonnen!"); // Zeige eine Gewinnmeldung an, nachdem die Linie angezeigt wurde
    }, 1000); // Verpasse eine kleine Verzögerung (1000ms), damit die Linie animiert wird
  } else {
    // Wenn noch niemand gewonnen hat, Spieler wechseln
    currentPlayer = currentPlayer === "Spieler 1" ? "Spieler 2" : "Spieler 1";
    updateCurrentPlayerDisplay(); // Anzeige des aktuellen Spielers aktualisieren
  }
}

// Die Funktion zum Aktualisieren der Anzeige des aktuellen Spielers
function updateCurrentPlayerDisplay() {
  // HTML-Elemente für die Spieler
  const player1Element = document.getElementById("player1");
  const player2Element = document.getElementById("player2");

  if (currentPlayer === "Spieler 1") {
    player1Element.classList.add("highlightPlayer"); // Spieler 1 hervorheben
    player2Element.classList.remove("highlightPlayer"); // Spieler 2 nicht hervorgehoben
  } else {
    player2Element.classList.add("highlightPlayer"); // Spieler 2 hervorheben
    player1Element.classList.remove("highlightPlayer"); // Spieler 1 nicht hervorgehoben
  }
}

// Die Funktion zum Überprüfen, ob ein Spieler gewonnen hat
function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return combination; // Gibt die Indizes der gewonnenen Felder zurück
    }
  }

  return null; // Kein Gewinner
}

// Diese Funktion zeichnet eine Linie zwischen den gewonnenen Feldern und fügt das SVG vor den <tr>-Elementen ein
function drawWinningLine(combination) {
  const [a, b, c] = combination;

  // Berechne die Positionen der Felder
  const positions = [
    getCellPosition(a),
    getCellPosition(b),
    getCellPosition(c),
  ];

  // Erstelle das SVG-Element für die Linie
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("class", "winning-line");

  // Erstelle das Path-Element für die Linie
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    `M ${positions[0].x} ${positions[0].y} L ${positions[2].x} ${positions[2].y}`
  );
  path.setAttribute("stroke", "white");
  path.setAttribute("stroke-width", "5");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-dasharray", "1000");
  path.setAttribute("stroke-dashoffset", "1000");

  // Animation der Linie
  path.innerHTML = `<animate 
    attributeName="stroke-dashoffset" 
    from="1000" 
    to="0" 
    dur="0.4s" 
    fill="freeze" 
  />`;

  svg.appendChild(path);

  // Finde das <tbody>-Element, um die Linie davor hinzuzufügen
  const tbody = document.querySelector("tbody");
  if (tbody) {
    tbody.insertBefore(svg, tbody.firstChild); // SVG vor den ersten <tr> einfügen
  } else {
    // Wenn kein tbody existiert, fügen wir es direkt in den Content-Div ein
    const contentDiv = document.getElementById("content");
    contentDiv.appendChild(svg);
  }
}

// Berechnet die Position der Zelle basierend auf dem Index (0 bis 8)
function getCellPosition(index) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const cellSize = 100; // Jede Zelle ist 100px groß

  return {
    x: col * cellSize + 50, // X-Position (Mitte der Zelle)
    y: row * cellSize + 50, // Y-Position (Mitte der Zelle)
  };
}
