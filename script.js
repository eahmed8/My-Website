document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MOBILE NAVIGATION
    // ==========================================
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

    // ==========================================
    // 2. ACTIVE LINK HIGHLIGHTER
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        link.classList.remove('active');

        if (linkPath === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });

    // ==========================================
    // 3. TYPEWRITER EFFECT (Home Page)
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

    // ==========================================
    // 4. SCROLL REVEAL ANIMATION
    // ==========================================
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; 

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ==========================================
    // 5. PROJECT MODAL (POPUP) LOGIC - *** THIS FIXES THE CLICK ***
    // ==========================================
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
    const closeBtn = document.querySelector('.close-modal');
    const projectItems = document.querySelectorAll('.portfolio-item');

    // Only run this code if the modal exists on the page
    if (modal) {
        // Add click event to each project card
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                // 1. Get data from the clicked item
                const title = item.getAttribute('data-title');
                const desc = item.getAttribute('data-description');
                const image = item.getAttribute('data-image');
                const link = item.getAttribute('data-link');

                // 2. Put that data into the modal
                modalTitle.textContent = title;
                modalDesc.textContent = desc;
                modalImg.src = image;
                
                // 3. Handle the "Visit Website" button
                if(link && link !== "#") {
                    modalLink.href = link;
                    modalLink.style.display = "inline-block"; // Show button
                    modalLink.textContent = "Visit Website";
                } else {
                    modalLink.style.display = "none"; // Hide button for placeholders
                }

                // 4. Show the modal
                modal.classList.add('show');
            });
        });

        // Close when clicking the 'X'
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        // Close when clicking outside the box
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
});