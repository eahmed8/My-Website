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
        } else if ((currentPage === '' || currentPage === '/') && linkPath === 'index.html') {
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

    // 4. Scroll Reveal
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

    // 5. PROJECT MODAL LOGIC (With Video Embed Support)
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImage');
    const modalVideoContainer = document.getElementById('modalVideoContainer'); // New container
    const modalVideo = document.getElementById('modalVideo'); // The iframe
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
    const closeBtn = document.querySelector('.close-modal');
    const projectItems = document.querySelectorAll('.portfolio-item');

    if (modal) {
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const title = item.getAttribute('data-title');
                const desc = item.getAttribute('data-description');
                const image = item.getAttribute('data-image');
                const link = item.getAttribute('data-link');
                const videoId = item.getAttribute('data-video-id'); // Get Video ID

                modalTitle.textContent = title;
                modalDesc.innerHTML = desc;

                // --- VIDEO vs IMAGE LOGIC ---
                if (videoId) {
                    // It's a video project
                    modalImg.style.display = 'none'; // Hide Image
                    modalVideoContainer.style.display = 'block'; // Show Video
                    modalVideo.src = `https://www.youtube.com/embed/${videoId}`; // Set Video
                } else {
                    // It's a web project
                    modalVideoContainer.style.display = 'none'; // Hide Video
                    modalVideo.src = ''; // Stop any previous video
                    modalImg.style.display = 'block'; // Show Image
                    modalImg.src = image; // Set Image
                }

                // Button Logic
                if(link && link !== "#") {
                    modalLink.href = link;
                    modalLink.style.display = "inline-block";
                    // If we have a video embedded, we can hide the external button OR keep it as "Watch on YouTube"
                    // Let's keep it but specific
                    if (videoId) {
                        modalLink.innerHTML = '<i class="fab fa-youtube"></i> Watch on YouTube';
                    } else {
                        modalLink.textContent = "Visit Website";
                    }
                } else {
                    modalLink.style.display = "none";
                }

                modal.classList.add('show');
            });
        });

        // Function to close modal and stop video
        const closeModal = () => {
            modal.classList.remove('show');
            modalVideo.src = ''; // Clear source to stop audio playing
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});