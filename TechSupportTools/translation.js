document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    const langToggle = document.getElementById('language-toggle');
    const allTranslatableElements = document.querySelectorAll('[data-en],[data-ar],[data-en-title],[data-ar-title]');

    function setLanguage(lang) {
        const isArabic = (lang === 'ar');
        document.body.dir = isArabic ? 'rtl' : 'ltr';
        allTranslatableElements.forEach(el => {
            const text = el.getAttribute(isArabic ? 'data-ar' : 'data-en');
            if (text) el.textContent = text;
            const title = el.getAttribute(isArabic ? 'data-ar-title' : 'data-en-title');
            if (title) el.setAttribute('title', title);
        });
        if (langToggle) {
            langToggle.textContent = isArabic ? 'EN' : 'AR';
            langToggle.setAttribute('data-lang', isArabic ? 'en' : 'ar');
        }
        localStorage.setItem('prodigyLang', lang);
    }

    let currentLang = localStorage.getItem('prodigyLang') || 'en';
    setLanguage(currentLang);

    if (langToggle) langToggle.addEventListener('click', () => {
        setLanguage(langToggle.getAttribute('data-lang'));
    });
});
