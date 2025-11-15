document.addEventListener('DOMContentLoaded', () => {

    // 1. DYNAMIC COPYRIGHT YEAR
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. MOBILE MENU TOGGLE LOGIC
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. LANGUAGE TRANSLATION LOGIC
    const langToggle = document.getElementById('language-toggle');
    // Select all elements that have a translation data attribute
    const allTranslatableElements = document.querySelectorAll('[data-en], [data-ar], [data-en-alt], [data-ar-alt], [data-en-title], [data-ar-title], [data-en-placeholder], [data-ar-placeholder]');

    // Function to apply translation
    function setLanguage(lang) {
        const isArabic = (lang === 'ar');
        // Set text direction (RTL for Arabic, LTR for English)
        document.body.dir = isArabic ? 'rtl' : 'ltr';

        const langDataAttr = isArabic ? 'data-ar' : 'data-en';

        allTranslatableElements.forEach(element => {
            // 1. Handle text content translation
            const textTranslation = element.getAttribute(langDataAttr);
            if (textTranslation) {
                element.textContent = textTranslation;
            }

            // 2. Handle attribute translations (alt, title, placeholder)
            const attributesToTranslate = ['alt', 'title', 'placeholder'];
            attributesToTranslate.forEach(attr => {
                // Construct the full attribute name (e.g., 'data-ar-alt')
                const attrTranslation = element.getAttribute(langDataAttr + '-' + attr);
                if (attrTranslation) {
                    element.setAttribute(attr, attrTranslation);
                }
            });
        });

        // 3. Handle the language toggle button text (UPDATED)
        if (langToggle) {
            // Display 'EN' when current language is Arabic, and 'AR' when current language is English
            langToggle.textContent = isArabic ? 'EN' : 'AR';
            // Set the data-lang attribute to the language it will switch *to*
            langToggle.setAttribute('data-lang', isArabic ? 'en' : 'ar');
        }

        // Save language preference to local storage
        localStorage.setItem('prodigyLang', lang);
    }

    // Set initial language based on local storage or default to English
    let currentLang = localStorage.getItem('prodigyLang') || 'en';
    setLanguage(currentLang);


    // Add click listener for the language button
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            // Get the *new* language from the data-lang attribute
            const newLang = langToggle.getAttribute('data-lang');
            setLanguage(newLang);
        });
    }

});