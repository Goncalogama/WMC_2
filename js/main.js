console.log("Welcome to Hidden Slovenia!");

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

function createEmojiIcon(emoji) {
  return L.divIcon({
    html: `
      <div class="emoji-marker" style="
        font-size: 24px;
        cursor: pointer;
        transform-origin: center bottom;
        will-change: transform;
      ">${emoji}</div>`,
    className: '', // Prevent default Leaflet icon styling
    iconSize: [30, 30],
    iconAnchor: [15, 30] // Keeps it pinned to the bottom
  });
}


document.addEventListener("DOMContentLoaded", function () {
  // ==============================
  // POLL FUNCTIONALITY
  // ==============================
  const form = document.getElementById("poll-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      const choices = {
        "Julian Alps": Math.floor(Math.random() * 40) + 30,
        "Karst Plateau": Math.floor(Math.random() * 30) + 10,
        "Pannonian Hills": Math.floor(Math.random() * 30) + 10
      };

      const selected = document.querySelector('input[name="region"]:checked').value;
      const total = Object.values(choices).reduce((a, b) => a + b, 0);

      const normalized = Object.fromEntries(
        Object.entries(choices).map(([k, v]) => [k, Math.round((v / total) * 100)])
      );

      let html = `<h4>You chose: <strong>${selected}</strong></h4><ul style="list-style: none; padding: 0;">`;
      for (const [region, percent] of Object.entries(normalized)) {
        html += `
          <li style="margin-bottom: 10px;">
            <strong>${region}</strong>
            <div style="background: #555; height: 20px; border-radius: 4px; overflow: hidden;">
              <div style="width: ${percent}%; background: #47c; height: 100%; transition: width 0.5s;"></div>
            </div>
            <small>${percent}% of visitors</small>
          </li>`;
      }

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
        </div>`;

      document.getElementById("poll-results").innerHTML = html;
      document.getElementById("poll-results").style.display = "block";
      document.getElementById("poll-form").style.display = "none";
    });
  }

  // ==============================
  // LEAFLET MAP
  // ==============================
  const map = L.map('mapContainer').setView([46.1512, 14.9955], 8);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> contributors'
  }).addTo(map);

  const locations = [
    { name: "Jezersko", coords: [46.383, 14.497], icon: "🏡", fact: "A serene alpine village known for its cheese and hiking." },
    { name: "Luče", coords: [46.350, 14.750], icon: "🏡", fact: "Famous for traditional linen weaving and mountain festivals." },
    { name: "Drežnica", coords: [46.240, 13.567], icon: "🏡", fact: "A Karst village steeped in WWI history and folklore." },
    { name: "Logar Valley", coords: [46.370, 14.630], icon: "🏡", fact: "An iconic glacial valley with waterfalls and eco-tourism." },
    { name: "Soča Valley", coords: [46.250, 13.750], icon: "🏡", fact: "Home to emerald rivers, WWI trails, and adrenaline sports." },
    { name: "Julian Alps", coords: [46.35, 13.83], icon: "🏔️", fact: "Slovenia's alpine crown, with Mount Triglav at the center." },
    { name: "Karst Plateau", coords: [45.73, 13.90], icon: "🧀", fact: "Caves, dry stone walls, prosciutto, and Teran wine." },
    { name: "Pannonian Hills", coords: [46.55, 16.15], icon: "🍇", fact: "Rolling vineyards, thermal spas, and peaceful countryside." }
  ];

  locations.forEach(loc => {
    const icon = createEmojiIcon(loc.icon);
    const marker = L.marker(loc.coords, { icon }).addTo(map)
      .bindPopup(`<strong>${loc.name}</strong><br>${loc.fact}`);

    marker.on('mouseover', function () {
      this._icon.style.transition = "transform 0.2s ease";
      this._icon.style.transform = "scale(1.2)";
    });
    marker.on('mouseout', function () {
      this._icon.style.transform = "scale(1)";
    });
  });
});
