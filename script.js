document.addEventListener('DOMContentLoaded', () => {

    // Update year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Dropdown toggle on mobile
    const dropdownItems = document.querySelectorAll('.nav-dropdown-item > a');
    dropdownItems.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const submenu = dropdown.nextElementSibling;
                submenu.classList.toggle('open');
            }
        });
    });

    // Language toggle
    const langToggle = document.getElementById('language-toggle');
    const allTranslatableElements = document.querySelectorAll('[data-en], [data-ar], [data-en-alt], [data-ar-alt], [data-en-title], [data-ar-title], [data-en-placeholder], [data-ar-placeholder]');

    function setLanguage(lang) {
        const isArabic = (lang === 'ar');
        document.body.dir = isArabic ? 'rtl' : 'ltr';
        const langDataAttr = isArabic ? 'data-ar' : 'data-en';
        allTranslatableElements.forEach(element => {
            const textTranslation = element.getAttribute(langDataAttr);
            if (textTranslation) element.textContent = textTranslation;
            ['alt', 'title', 'placeholder'].forEach(attr => {
                const attrTranslation = element.getAttribute(langDataAttr + '-' + attr);
                if (attrTranslation) element.setAttribute(attr, attrTranslation);
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
            setLanguage(langToggle.getAttribute('data-lang'));
        });
    }
    // Reset mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Remove mobile menu active class
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            // Close any open dropdowns
            document.querySelectorAll('.dropdown-menu.open').forEach(submenu => {
                submenu.classList.remove('open');
            });
        }
    });

});
