// Set the base URL for your API
const API_URL = 'http://localhost:5000'; // Replace with your actual API URL

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    var form = this; // Reference to the form element

    // Submit the form data using fetch
    fetch(form.action, {
        method: form.method, // Use the form's method (e.g., POST)
        body: new FormData(form), // Serialize the form data for submission
        headers: {
            'Accept': 'application/json' // Specify that we expect JSON in response
        }
    }).then(response => response.json()) // Parse the JSON response
    .then(data => {
        if (data.success) { // Check if the form submission was successful
            alert("Thanks for your submission!"); // Display a success message
            form.reset(); // Reset the form fields
        } else {
            alert("Oops! There was a problem submitting your form"); // Display an error message
        }
    }).catch(error => {
        alert("Oops! There was a problem submitting your form"); // Handle any errors that occur during submission
    });
});

// Show/hide "Other Service" input based on service selection
document.getElementById('service').addEventListener('change', function() {
    var otherServiceInput = document.getElementById('otherService'); // Reference to the "Other Service" input field
    if (this.value === 'other') { // Check if the selected service is "Other"
        otherServiceInput.style.display = 'block'; // Show the "Other Service" input field
        otherServiceInput.setAttribute('required', ''); // Make the "Other Service" input field required
    } else {
        otherServiceInput.style.display = 'none'; // Hide the "Other Service" input field
        otherServiceInput.removeAttribute('required'); // Remove the "required" attribute from the "Other Service" input field
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

// Scroll to the top when "Back to Top" button is clicked
document.getElementById("back-to-top").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent the default anchor click behavior
    document.body.scrollTop = 0; // For Safari - scroll to the top of the document
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera - scroll to the top of the document
});

// Initialize service carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const serviceGrid = document.querySelector('.service-grid'); // Reference to the service grid container
    const prevBtn = document.querySelector('.prev-btn'); // Reference to the previous button
    const nextBtn = document.querySelector('.next-btn'); // Reference to the next button
    const serviceItems = document.querySelectorAll('.service-item'); // Reference to all service items
    let currentIndex = 0; // Initialize current index to 0

    // Function to update the position of the carousel
    function updateCarousel() {
        const itemWidth = serviceItems[0].offsetWidth; // Get the width of one service item
        const maxIndex = serviceItems.length - Math.floor(serviceGrid.offsetWidth / itemWidth); // Calculate the maximum index
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex)); // Ensure the current index is within bounds
        serviceGrid.style.transform = `translateX(-${currentIndex * itemWidth}px)`; // Move the carousel

        // Show or hide navigation buttons based on the current index
        prevBtn.style.display = currentIndex > 0 ? 'block' : 'none'; 
        nextBtn.style.display = currentIndex < maxIndex ? 'block' : 'none';
    }

    // Navigate to the previous set of service items
    prevBtn.addEventListener('click', () => {
        currentIndex--; // Decrease the current index
        updateCarousel(); // Update the carousel
    });

    // Navigate to the next set of service items
    nextBtn.addEventListener('click', () => {
        currentIndex++; // Increase the current index
        updateCarousel(); // Update the carousel
    });

    // Update the carousel when the window is resized
    window.addEventListener('resize', updateCarousel);
    updateCarousel(); // Initial update of the carousel
});
