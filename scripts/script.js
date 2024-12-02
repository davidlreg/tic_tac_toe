let fields = [null, null, null, null, null, null, null, null, null];

let currentPlayer = "circle"; // Startspieler ist "circle"

function init() {
  render(); // Tabelle rendern
  updateCurrentPlayerDisplay(); // Anzeige des aktuellen Spielers aktualisieren
}

// Die Funktion, die die gesamte Tabelle einmal rendert
function render() {
  let contentDiv = document.getElementById("content");
  let html = "<table>";

  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      let fieldIndex = i * 3 + j;
      let field = fields[fieldIndex];

      let symbol = "";
      if (field === "circle") {
        symbol = generateCircleSVG(); // Kreis
      } else if (field === "cross") {
        symbol = generateXSVG(); // Kreuz
      }

      // Erstelle die Tabelle mit onclick-Event für jedes td
      html += `<td onclick="handleClick(${fieldIndex})">${symbol}</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  contentDiv.innerHTML = html;
}

// Die Funktion, die nur das angeklickte Feld aktualisiert
function handleClick(index) {
  if (!fields[index]) {
    // Wenn das Feld frei ist
    fields[index] = currentPlayer; // Setze das Symbol für den aktuellen Spieler
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle"; // Spieler wechseln

    // Finde das td-Element, das dem angeklickten Index entspricht
    let cell = document.querySelectorAll("td")[index];

    // Generiere das SVG für das aktuelle Symbol
    let symbol = "";
    if (fields[index] === "circle") {
      symbol = generateCircleSVG(); // Kreis
    } else if (fields[index] === "cross") {
      symbol = generateXSVG(); // Kreuz
    }

    // Setze das SVG in das entsprechende Feld
    cell.innerHTML = symbol;
  }

  updateCurrentPlayerDisplay();
}

// Die Funktion zum Aktualisieren der Anzeige des aktuellen Spielers
function updateCurrentPlayerDisplay() {
  // HTML-Elemente für die Spieler
  const player1Element = document.getElementById("player1");
  const player2Element = document.getElementById("player2");

  if (currentPlayer === "circle") {
    player1Element.classList.add("highlightPlayer"); // Player 1 hervorheben
    player2Element.classList.remove("highlightPlayer"); // Player 2 nicht hervorgehoben
  } else {
    player2Element.classList.add("highlightPlayer"); // Player 2 hervorheben
    player1Element.classList.remove("highlightPlayer"); // Player 1 nicht hervorgehoben
  }
}
