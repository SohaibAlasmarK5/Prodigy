document.addEventListener('DOMContentLoaded', () => {

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const langToggle = document.getElementById('language-toggle');
    const allTranslatableElements = document.querySelectorAll('[data-en], [data-ar], [data-en-alt], [data-ar-alt], [data-en-title], [data-ar-title], [data-en-placeholder], [data-ar-placeholder]');

    function setLanguage(lang) {
        const isArabic = (lang === 'ar');
        document.body.dir = isArabic ? 'rtl' : 'ltr';

        const langDataAttr = isArabic ? 'data-ar' : 'data-en';

        allTranslatableElements.forEach(element => {
            const textTranslation = element.getAttribute(langDataAttr);
            if (textTranslation) {
                element.textContent = textTranslation;
            }

            const attributesToTranslate = ['alt', 'title', 'placeholder'];
            attributesToTranslate.forEach(attr => {
                const attrTranslation = element.getAttribute(langDataAttr + '-' + attr);
                if (attrTranslation) {
                    element.setAttribute(attr, attrTranslation);
                }
            });
        });

        if (langToggle) {
            langToggle.textContent = isArabic ? 'EN' : 'AR';
            langToggle.setAttribute('data-lang', isArabic ? 'en' : 'ar');
        }

        localStorage.setItem('prodigyLang', lang);
    }

    let currentLang = localStorage.getItem('prodigyLang') || 'en';
    setLanguage(currentLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = langToggle.getAttribute('data-lang');
            setLanguage(newLang);
        });
    }

});
