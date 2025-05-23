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

