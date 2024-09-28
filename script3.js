document.addEventListener('DOMContentLoaded', function() {
    const serviceCarousel = document.querySelector('.service-carousel');
    if (!serviceCarousel) {
        console.error('Service carousel not found');
        return;
    }

    const serviceGrid = serviceCarousel.querySelector('.service-grid');
    const serviceItems = serviceCarousel.querySelectorAll('.service-item');
    let currentIndex = 0;

    // Create navigation buttons if they don't exist
    if (!serviceCarousel.querySelector('.prev-btn')) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'prev-btn';
        prevBtn.innerHTML = '&#10094;';
        serviceCarousel.appendChild(prevBtn);
    }
    if (!serviceCarousel.querySelector('.next-btn')) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-btn';
        nextBtn.innerHTML = '&#10095;';
        serviceCarousel.appendChild(nextBtn);
    }

    function updateCarousel() {
        if (!serviceGrid || serviceItems.length === 0) {
            console.error('Service grid or items not found');
            return;
        }

        const itemWidth = serviceItems[0].offsetWidth;
        const visibleItems = Math.floor(serviceCarousel.offsetWidth / itemWidth);
        const maxIndex = Math.max(0, serviceItems.length - visibleItems);

        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        serviceGrid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        const prevBtn = serviceCarousel.querySelector('.prev-btn');
        const nextBtn = serviceCarousel.querySelector('.next-btn');
        if (prevBtn) prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
        if (nextBtn) nextBtn.style.display = currentIndex < maxIndex ? 'block' : 'none';
    }



    // Use event delegation for button clicks
    serviceCarousel.addEventListener('click', function(e) {
        if (e.target.classList.contains('prev-btn')) {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
        } else if (e.target.classList.contains('next-btn')) {
            currentIndex++;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});


// Back to Top button functionality
window.onscroll = function() {scrollFunction()}; // Attach scroll event listener

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) { // Check if user has scrolled down 20px from the top
        document.getElementById("back-to-top").style.display = "block"; // Show the "Back to Top" button
    } else {
        document.getElementById("back-to-top").style.display = "none"; // Hide the "Back to Top" button
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Existing service carousel code...

    // Add touch support for service carousel
    let touchStartX = 0;
    let touchEndX = 0;

    serviceCarousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    serviceCarousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left
            currentIndex++;
            updateCarousel();
        }
        if (touchEndX > touchStartX) {
            // Swipe right
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
        }
    }
});