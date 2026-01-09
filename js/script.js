document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const quickLinks = document.querySelectorAll('.quick-links ul li a');
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('close-popup');

    // 1. Search functionality (Filters Quick Links)
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            quickLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                // Filters the list item based on search match
                link.parentElement.style.display = text.includes(query) ? 'block' : 'none';
            });
        });
    }

    // 2. Mobile menu toggle with "Click Outside" to close
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents immediate closing
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active'); // For animated bars
        });

        // Close menu when clicking a link (Important for mobile UX)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });

        // Close menu if clicking anywhere else on the page
        document.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('is-active');
        });
    }

    // 3. Smart Popup (Shows only ONCE using LocalStorage)
    if (popup) {
        const hasSeenPopup = localStorage.getItem('mechHub_popup_seen');

        if (!hasSeenPopup) {
            setTimeout(() => {
                popup.classList.add('show');
            }, 3000); // 3-second delay
        }

        // Close popup and save preference
        if (closePopup) {
            closePopup.addEventListener('click', () => {
                popup.classList.remove('show');
                localStorage.setItem('mechHub_popup_seen', 'true');
            });
        }
    }
    
    // 4. Smooth Scroll (Bonus: For a better professional feel)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});