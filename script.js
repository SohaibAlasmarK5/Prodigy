document.addEventListener('DOMContentLoaded', () => {

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

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

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Close mobile menu if open
            navLinks.classList.remove('active');

            // Close any open mobile dropdowns
            document.querySelectorAll('.dropdown-menu.open, .product-dropdown.open')
                .forEach(submenu => submenu.classList.remove('open'));
        }
    });


    // --- Slider Code ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentIndex = 0;
    let isSliding = false;

    function showSlide(index) {
        if (isSliding) return;
        isSliding = true;

        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.style.opacity = '1';
                slide.style.position = 'relative';
                slide.style.pointerEvents = 'auto'; // allow hover
            } else {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.position = 'absolute';
                slide.style.pointerEvents = 'none'; // block hover
            }
        });

        // Wait for CSS transition to finish
        setTimeout(() => {
            isSliding = false;
        }, 1200);
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    // Auto-slide
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 5000);

    showSlide(currentIndex);
});
