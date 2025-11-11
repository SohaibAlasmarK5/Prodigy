document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMIC COPYRIGHT YEAR (from previous steps)
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

    // 3. LANGUAGE TRANSLATION LOGIC (The crucial part)
    const langToggle = document.getElementById('language-toggle');
    const allTranslatableElements = document.querySelectorAll('[data-en], [data-ar]');

    // Function to apply translation
    function setLanguage(lang) {
        const isArabic = (lang === 'ar');
        document.body.dir = isArabic ? 'rtl' : 'ltr'; // Set text direction

        allTranslatableElements.forEach(element => {
            // Check for data attribute and update content
            const translation = element.getAttribute(isArabic ? 'data-ar' : 'data-en');
            if (translation) {
                element.textContent = translation;
            }
        });

        // Handle the language toggle button text
        if (langToggle) {
            langToggle.textContent = isArabic ? 'English' : 'العربية';
            langToggle.setAttribute('data-lang', isArabic ? 'en' : 'ar');
        }
    }

    // Set initial language (Defaulting to English, unless saved preference exists)
    // You can change 'en' to 'ar' if you want Arabic to be the initial default.
    let currentLang = 'en';
    setLanguage(currentLang);


    // Add click listener for the language button
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = langToggle.getAttribute('data-lang'); // Gets 'ar' or 'en' from the attribute
            setLanguage(newLang);
        });
    }

});

// NOTE: This script assumes all translatable text blocks have both a 'data-en'
// and a 'data-ar' attribute in the HTML.