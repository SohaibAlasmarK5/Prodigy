document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('language-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // --- 1. Language Translation ---
    langToggle.addEventListener('click', () => {
        const currentLang = langToggle.getAttribute('data-lang');

        if (currentLang === 'en') {
            // Switch to Arabic
            body.setAttribute('dir', 'rtl');
            langToggle.setAttribute('data-lang', 'ar');
            langToggle.textContent = 'English';
            // Update Navigation Links
            navLinks.querySelectorAll('a').forEach(link => {
                link.textContent = link.getAttribute('data-ar');
            });
        } else {
            // Switch to English
            body.setAttribute('dir', 'ltr');
            langToggle.setAttribute('data-lang', 'en');
            langToggle.textContent = 'العربية';
            // Update Navigation Links
            navLinks.querySelectorAll('a').forEach(link => {
                link.textContent = link.getAttribute('data-en');
            });
        }
    });

    // --- 2. Mobile Menu Toggle ---
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times'); // Use X icon for close
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // --- New Code for Dynamic Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    // ------------------------------------------

    const langToggle = document.getElementById('language-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // ... (Rest of your existing JavaScript code follows) ...
});