let fields = [null, null, null, null, null, null, null, null, null];

function init() {
  render();
}

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

      html += `<td onclick="handleClick(${fieldIndex})">${symbol}</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  contentDiv.innerHTML = html;
}

let currentPlayer = "circle"; // Startspieler ist "circle"

function handleClick(index) {
  if (!fields[index]) {
    // Prüfen, ob das Feld frei ist
    fields[index] = currentPlayer; // Aktuellen Spieler setzen
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle"; // Spieler wechseln
    render(); // Tabelle neu rendern
  }
}
