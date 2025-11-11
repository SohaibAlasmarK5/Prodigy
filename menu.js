// Menu template
const menuHTML = `
<header class="navbar">
  <div class="logo">
    <img src="logo.jpg" alt="Prodigy Logo">
  </div>
  <nav>
    <ul class="menu">
      <li><a href="main.html" data-lang-en="Home" data-lang-ar="الرئيسية">Home</a></li>
      <li class="dropdown">
        <button class="dropbtn" data-lang-en="Tools" data-lang-ar="الأدوات">Tools ▾</button>
        <div class="dropdown-content">
          <a href="#">Analyzer</a>
          <a href="#">Converter</a>
          <a href="#">Optimizer</a>
        </div>
      </li>
      <li><a href="about.html" data-lang-en="About" data-lang-ar="من نحن">About</a></li>
      <li class="language-switch">
        <button id="langToggle">AR</button>
      </li>
    </ul>
  </nav>
</header>
`;

const footerHTML = `
<footer class="footer">
  <p data-lang-en="© 2025 Prodigy. All rights reserved." data-lang-ar="© ٢٠٢٥ بروجي. جميع الحقوق محفوظة.">
    © 2025 Prodigy. All rights reserved.
  </p>
</footer>
`;

// Insert menu & footer
document.getElementById("menu").innerHTML = menuHTML;
document.getElementById("footer").innerHTML = footerHTML;

// Language switch
const langBtn = document.getElementById("langToggle");
let currentLang = "en";

langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-lang-en]").forEach(el => {
        el.textContent = el.getAttribute(`data-lang-${currentLang}`);
    });
    langBtn.textContent = currentLang === "en" ? "AR" : "EN";
});

// Dropdown hover
const dropbtn = document.querySelector(".dropbtn");
const dropdown = document.querySelector(".dropdown-content");

dropbtn.addEventListener("mouseover", () => {
    dropdown.style.display = "block";
    dropbtn.style.color = "black";
});

dropdown.addEventListener("mouseleave", () => {
    dropdown.style.display = "none";
    dropbtn.style.color = "white";
});
