const API_URL = 'http://localhost:5000'; // Replace with your actual API URL

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var form = this;

    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Thanks for your submission!");
            form.reset();
        } else {
            alert("Oops! There was a problem submitting your form");
        }
    }).catch(error => {
        alert("Oops! There was a problem submitting your form");
    });
});

// Show/hide "Other Service" input based on service selection
document.getElementById('service').addEventListener('change', function() {
    var otherServiceInput = document.getElementById('otherService');
    if (this.value === 'other') {
        otherServiceInput.style.display = 'block';
        otherServiceInput.setAttribute('required', '');
    } else {
        otherServiceInput.style.display = 'none';
        otherServiceInput.removeAttribute('required');
    }
});

// Back to Top button functionality
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
}

document.getElementById("back-to-top").addEventListener("click", function(e) {
    e.preventDefault();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});