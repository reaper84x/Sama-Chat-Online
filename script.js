// script.js
document.getElementById('registerBtn').addEventListener('click', function() {
    document.getElementById('formContainer').classList.toggle('hidden');
    document.getElementById('loginContainer').classList.add('hidden');
});

document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginContainer').classList.toggle('hidden');
    document.getElementById('formContainer').classList.add('hidden');
});

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const response = await fetch('https://api.jsonbin.io/v3/b/67126120ad19ca34f8bab618', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$ZhyLvqnODp6F/m/31TwrJOhkAgF2YwNkVT4EwBlXEn.eJWdvTMnRC'
        },
        body: JSON.stringify({ name, username, password })
    });

    if (response.ok) {
        alert("Registration successful!");
        document.getElementById('formContainer').classList.add('hidden');
        document.getElementById('loginContainer').classList.remove('hidden');
    } else {
        alert("Registration failed!");
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.get Eleme ntById('loginPassword').value;

    const response = await fetch('https://api.jsonbin.io/v3/b/67126120ad19ca34f8bab618', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$ZhyLvqnODp6F/m/31TwrJOhkAgF2YwNkVT4EwBlXEn.eJWdvTMnRC'
        }
    });

    const data = await response.json();
    const user = data.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Login successful!");
        // Redirect to chat page
        window.location.href = 'chat.html';
    } else {
        alert("Login failed!");
    }
});