// Basic script placeholder — expand with interactivity later

console.log("Welcome to Hidden Slovenia!");

// Future enhancement idea: Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


function handleVote(event) {
  event.preventDefault(); // ⛔️ Stop form from reloading the page

  const choices = {
    "Julian Alps": Math.floor(Math.random() * 40) + 30,
    "Karst Plateau": Math.floor(Math.random() * 30) + 10,
    "Pannonian Hills": Math.floor(Math.random() * 30) + 10
  };

  const selected = document.querySelector('input[name="region"]:checked').value;
  const total = choices["Julian Alps"] + choices["Karst Plateau"] + choices["Pannonian Hills"];

  const normalized = Object.fromEntries(
    Object.entries(choices).map(([k, v]) => [k, Math.round((v / total) * 100)])
  );

  let html = `<h4>You chose: <strong>${selected}</strong></h4><ul style="list-style: none; padding: 0;">`;
  for (const [region, percent] of Object.entries(normalized)) {
    html += `
      <li style="margin-bottom: 10px;">
        <strong>${region}</strong>
        <div style="background: #555; height: 20px; border-radius: 4px; overflow: hidden;">
          <div style="width: ${percent}%; background: #47c; height: 100%;"></div>
        </div>
        <small>${percent}% of visitors</small>
      </li>`;
  }
  html += `</ul>`;

  const facts = {
    "Julian Alps": {
      fact: "Home to Triglav National Park, Slovenia’s highest peak, and pristine alpine lakes.",
      url: "https://www.slovenia.info/en/places-to-go/the-julian-alps"
    },
    "Karst Plateau": {
      fact: "The Karst gave its name to karst geology — with caves, sinkholes, and local prosciutto.",
      url: "https://www.slovenia.info/en/places-to-go/regions/mediterranean-karst-slovenia/karst"
    },
    "Pannonian Hills": {
      fact: "A land of vineyards, thermal spas, and peaceful countryside.",
      url: "https://slovenia-outdoor.com/en/destinations/thermal-pannonian-slovenia/"
    }
  };
  
  const { fact, url } = facts[selected];
  
   html += `
    </ul>
    <div style="margin-top: 30px; padding: 15px; background-color: rgba(0,0,0,0.6); border-radius: 10px;">
      <p><strong>Did you know?</strong> ${fact}</p>
      <a href="${url}" target="_blank" style="color: #80c8ff; font-weight: bold;">Explore more about ${selected}</a>
    </div>
  `;


  document.getElementById("poll-results").innerHTML = html;
  document.getElementById("poll-results").style.display = "block";
  document.getElementById("poll-form").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("poll-form");
  if (form) {
    form.addEventListener("submit", handleVote);
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("poll-form");
  if (form) {
    form.addEventListener("submit", handleVote);
  }


  const map = L.map('mapContainer').setView([46.1512, 14.9955], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);


  const locations = [
    { name: "Jezersko", coords: [46.383, 14.497] },
    { name: "Luče", coords: [46.350, 14.750] },
    { name: "Drežnica", coords: [46.240, 13.567] },
    { name: "Logar Valley", coords: [46.370, 14.630] },
    { name: "Soča Valley", coords: [46.250, 13.750] },
    { name: "Julian Alps", coords: [46.35, 13.83] },
    { name: "Karst Plateau", coords: [45.73, 13.90] },
    { name: "Pannonian Hills", coords: [46.55, 16.15] }
  ];

  locations.forEach(loc => {
    L.marker(loc.coords).addTo(map).bindPopup(`<strong>${loc.name}</strong>`);
  });
});
