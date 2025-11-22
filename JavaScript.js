document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
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

    // 2. Active Link Highlighter
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        link.classList.remove('active');

        if (linkPath === currentPage) {
            link.classList.add('active');
        }
        else if (currentPage === '' && linkPath === 'HTML1.html') {
            link.classList.add('active');
        }
    });

    // 3. Typewriter Effect
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
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; 
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; 
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; 
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; 
                typeSpeed = 500; 
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }
});