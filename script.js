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