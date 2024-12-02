function generateCircleSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        stroke="#0DB1EE" 
        stroke-width="10" 
        fill="none" 
        stroke-dasharray="283" 
        stroke-dashoffset="283" 
      >
        <animate 
          attributeName="stroke-dashoffset" 
          from="283" 
          to="0" 
          dur="0.5s" 
          fill="freeze" 
        />
      </circle>
    </svg>
  `;
}

function generateXSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Erste Linie des X -->
      <line 
        x1="20" y1="20" 
        x2="80" y2="80" 
        stroke="#FCBE00" 
        stroke-width="10" 
        stroke-linecap="round"
        stroke-dasharray="85" 
        stroke-dashoffset="85">
        <animate 
          attributeName="stroke-dashoffset" 
          from="85" 
          to="0" 
          dur="0.75s" 
          fill="freeze" 
        />
      </line>
      <!-- Zweite Linie des X -->
      <line 
        x1="80" y1="20" 
        x2="20" y2="80" 
        stroke="#FCBE00" 
        stroke-width="10" 
        stroke-linecap="round"
        stroke-dasharray="85" 
        stroke-dashoffset="85">
        <animate 
          attributeName="stroke-dashoffset" 
          from="85" 
          to="0" 
          begin="0.3s" 
          dur="0.3s" 
          fill="freeze" 
        />
      </line>
    </svg>
  `;
}
