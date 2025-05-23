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


function handleVote() {
  const choices = {
    "Julian Alps": Math.floor(Math.random() * 40) + 30,  // 30–70%
    "Karst Plateau": Math.floor(Math.random() * 30) + 10, // 10–40%
    "Pannonian Hills": Math.floor(Math.random() * 30) + 10
  };

  const selected = document.querySelector('input[name="region"]:checked').value;
  const total = choices["Julian Alps"] + choices["Karst Plateau"] + choices["Pannonian Hills"];
  
  // Normalize percentages to 100
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

  document.getElementById("poll-results").innerHTML = html;
  document.getElementById("poll-results").style.display = "block";
  document.getElementById("poll-form").style.display = "none";

  return false; // prevent form submit
}

