document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Navigation (Hamburger Menu)
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle the menu visibility
            navLinks.classList.toggle('show');
            
            // Toggle the icon between "Bars" and "X"
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // ==========================================
    // 2. Active Link Highlighter
    // ==========================================
    // Get the current file name (e.g., "HTML2About.html")
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove active class from all links first
        link.classList.remove('active');

        // Check if the link matches the current page
        if (linkPath === currentPage) {
            link.classList.add('active');
        }
        // Special case: If the URL is just "website/" (empty), highlight the home page
        else if (currentPage === '' && linkPath === 'HTML1.html') {
            link.classList.add('active');
        }
    });

    // ==========================================
    // 3. Typewriter Effect (Home Page Only)
    // ==========================================
    const textElement = document.querySelector('.typewriter-text');
    
    if (textElement) {
        const words = ["Front-end Developer", "UI Designer", "Creative Coder"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Erase character
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Erase faster
            } else {
                // Type character
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; // Type normal speed
            }

            // Logic to switch between typing and deleting
            if (!isDeleting && charIndex === currentWord.length) {
                // Finished typing word
                isDeleting = true;
                typeSpeed = 2000; // Wait 2 seconds before deleting
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Move to next word
                typeSpeed = 500; // Wait 0.5s before typing new word
            }

            setTimeout(type, typeSpeed);
        }

        // Start the loop
        type();
    }
});