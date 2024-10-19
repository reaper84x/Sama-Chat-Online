document.getElementById('registerBtn').addEventListener('click', function() {
    console.log("Register button clicked");
    document.getElementById('formContainer').classList.toggle('hidden');
    document.getElementById('loginContainer').classList.add('hidden');
});

document.getElementById('loginBtn').addEventListener('click', function() {
    console.log("Login button clicked");
    document.getElementById('loginContainer').classList.toggle('hidden');
    document.getElementById('formContainer').classList.add('hidden');
});