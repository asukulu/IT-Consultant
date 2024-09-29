
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    console.log('Mobile menu toggle:', mobileMenuToggle);
    console.log('Nav menu:', navMenu);

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Mobile menu clicked');
            navMenu.classList.toggle('active');
            console.log('Nav menu classes:', navMenu.classList);
        });
    } else {
        console.error('Mobile menu elements not found');
    }

    // Service carousel functionality
    const serviceCarousel = document.querySelector('.service-carousel');
    if (serviceCarousel) {
        const serviceGrid = serviceCarousel.querySelector('.service-grid');
        const prevBtn = serviceCarousel.querySelector('.prev-btn');
        const nextBtn = serviceCarousel.querySelector('.next-btn');
        const serviceItems = serviceCarousel.querySelectorAll('.service-item');
        let currentIndex = 0;

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

            if (prevBtn) prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
            if (nextBtn) nextBtn.style.display = currentIndex < maxIndex ? 'block' : 'none';
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = Math.max(0, currentIndex - 1);
                updateCarousel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex++;
                updateCarousel();
            });
        }

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    } else {
        console.error('Service carousel not found');
    }
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
