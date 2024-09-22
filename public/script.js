const API_URL = 'http://localhost:5000'; // Replace with your actual API URL

// Helper function to show/hide sections
function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Helper function to update navigation based on authentication status
function updateNavigation(isLoggedIn) {
    document.getElementById('loginNav').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('registerNav').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('dashboardNav').style.display = isLoggedIn ? 'block' : 'none';
}

// Check if user is logged in on page load
if (localStorage.getItem('token')) {
    updateNavigation(true);
} else {
    updateNavigation(false);
}

// Register form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (response.ok) {
            alert('Registration successful. Please log in.');
            showSection('login');
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData.entries());
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            updateNavigation(true);
            showSection('dashboard');
            loadServiceHistory();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Service request form submission
document.getElementById('serviceRequestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const serviceData = Object.fromEntries(formData.entries());
    try {
        const response = await fetch(`${API_URL}/service-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(serviceData)
        });
        if (response.ok) {
            alert('Service request submitted successfully.');
            e.target.reset();
            loadServiceHistory();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Load service history
async function loadServiceHistory() {
    try {
        const response = await fetch(`${API_URL}/service-history`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            const serviceRequests = await response.json();
            const historyHtml = serviceRequests.map(request => `
                <div>
                    <h4>${request.service}</h4>
                    <p>Description: ${request.description}</p>
                    <p>Status: ${request.status}</p>
                    <p>Submitted: ${new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
            `).join('');
            document.getElementById('serviceHistory').innerHTML = historyHtml;
        } else {
            const error = await response.json();
            console.error('Error loading service history:', error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Navigation event listeners
document.getElementById('loginNav').addEventListener('click', () => showSection('login'));
document.getElementById('registerNav').addEventListener('click', () => showSection('register'));
document.getElementById('dashboardNav').addEventListener('click', () => {
    if (localStorage.getItem('token')) {
        showSection('dashboard');
        loadServiceHistory();
    } else {
        alert('Please log in to access the dashboard.');
        showSection('login');
    }
});