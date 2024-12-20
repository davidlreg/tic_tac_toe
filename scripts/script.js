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
  }

  // Überprüfe, ob das Spiel vorbei ist (Gewinn oder alle Felder voll)
  checkGameOver();

  if (!gameOver) {
    // Spieler wechseln, wenn das Spiel nicht vorbei ist
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

  const positions = [
    getCellPosition(a),
    getCellPosition(b),
    getCellPosition(c),
  ];

  // SVG erstellen
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("class", "winning-line");

  // Linie (Path) erstellen
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

  // Animations-Tag hinzufügen
  path.innerHTML = `
    <animate 
      attributeName="stroke-dashoffset" 
      from="1000" 
      to="0" 
      dur="0.4s" 
      fill="freeze" 
    />
  `;

  svg.appendChild(path);

  // SVG an die richtige Position anhängen
  const content = document.getElementById("content");
  content.appendChild(svg);
}

// Berechnet die Position der Zelle basierend auf dem Index (0 bis 8)
function getCellPosition(index) {
  const cell = document.querySelectorAll("td")[index];
  const rect = cell.getBoundingClientRect();

  // Position der Zellenmitte relativ zum #content
  const contentRect = document
    .getElementById("content")
    .getBoundingClientRect();

  return {
    x: rect.left - contentRect.left + rect.width / 2,
    y: rect.top - contentRect.top + rect.height / 2,
  };
}

function checkGameOver() {
  // Prüfe, ob ein Spieler gewonnen hat
  const winnerCombination = checkWinner();
  const allFieldsFilled = fields.every((field) => field !== null);

  if (winnerCombination || allFieldsFilled) {
    // Aktivieren des Buttons
    const restartButton = document.querySelector(".restartGameButton");
    restartButton.disabled = false;
  }
}
