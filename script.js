const jsonBinUrl = 'https://api.jsonbin.io/b/67126120ad19ca34f8bab618'; // Replace with your JSONBin.io bin URL
const apiKey = '$2a$10$ZhyLvqnODp6F/m/31TwrJOhkAgF2YwNkVT4EwBlXEn.eJWdvTMnRC'; // Replace with your JSONBin.io API key

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('registrationForm').querySelector('input[type="text"]').value;
    const password = document.getElementById('registrationForm').querySelector('input[type="password"]').value;

    const userData = { username, password };

    try {
        const response = await fetch(jsonBinUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': apiKey,
                'X-Bin-Versioning': 'false'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            console.log('Registration data sent to JSONBin.io successfully!');
        } else {
            console.error('Error sending registration data to JSONBin.io:', response.status);
        }
    } catch (error) {
        console.error('Error sending registration data to JSONBin.io:', error);
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('loginForm').querySelector('input[type="text"]').value;
    const password = document.getElementById('loginForm').querySelector('input[type="password"]').value;

    try {
        const response = await fetch(jsonBinUrl, {
            method: 'GET',
            headers: {
                'X-Master-Key': apiKey
            }
        });

        const storedData = await response.json();

        if (storedData.username === username && storedData.password === password) {
            console.log('Login successful!');
        } else {
            console.error('Invalid username or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
});

document.getElementById('registerBtn').addEventListener('click', function() {
    document.getElementById('formContainer').classList.toggle('hidden');
    document.getElementById('loginContainer').classList.add('hidden');
});

document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginContainer').classList.toggle('hidden');
    document.getElementById('formContainer ').classList.add('hidden');
});
