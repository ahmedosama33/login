document.addEventListener('DOMContentLoaded', function() {
    // Registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            // Validate input
            if (username && email && password) {
                // Check if user already exists
                if (localStorage.getItem(email)) {
                    alert('User already exists!');
                } else {
                    // Save user data to localStorage
                    const userData = {
                        username: username,
                        password: password
                    };
                    localStorage.setItem(email, JSON.stringify(userData));
                    alert('Registration successful!');
                    window.location.href = 'index.html';
                }
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Validate input
            if (email && password) {
                // Check if user exists
                const storedUser = localStorage.getItem(email);
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    if (userData.password === password) {
                        alert('Login successful!');
                        // Save logged-in user information to localStorage
                        localStorage.setItem('loggedInUser', JSON.stringify(userData));
                        window.location.href = 'home.html';
                    } else {
                        alert('Incorrect password.');
                    }
                } else {
                    alert('User not found.');
                }
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Logout button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            alert('Logged out successfully!');
            window.location.href = 'index.html';
        });
    }

    // Display welcome message on home page
    const welcomeMessageElement = document.getElementById('welcomeMessage');
    if (welcomeMessageElement) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            welcomeMessageElement.textContent = `Welcome, ${loggedInUser.username}`;
        } else {
            alert('Please log in first.');
            window.location.href = 'index.html';
        }
    }
});
