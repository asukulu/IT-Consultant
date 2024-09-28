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