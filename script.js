const langBtn = document.getElementById("lang-btn");
const html = document.documentElement;
let currentLang = "en";

langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    html.lang = currentLang;
    html.dir = currentLang === "ar" ? "rtl" : "ltr";
    langBtn.textContent = currentLang === "en" ? "العربية" : "English";

    document.querySelectorAll("[data-en]").forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });
});
