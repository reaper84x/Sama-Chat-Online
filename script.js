document.addEventListener("DOMContentLoaded", function() {
    const { createClient } = supabase;
    const supabaseUrl = 'https://szagifqmwaedmyixkyby.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YWdpZnFtd2FlZG15aXhreWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzNjg5MzIsImV4cCI6MjA0NDk0NDkzMn0.eYdFojROC5K5SDks2gzLQrsYez8CbeuFXgqOlGT2pnM';
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Render login form
    function renderLoginForm() {
        document.getElementById('root').innerHTML = `
            <div class="container">
                <h2>Login</h2>
                <input type="email" id="email" placeholder="Email">
                <input type="password" id="password" placeholder="Password">
                <button onclick="login()">Login</button>
                <p>Don't have an account? <a href="#" onclick="renderRegisterForm()">Register</a></p>
            </div>
        `;
    }

    // Login function
    async function login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const { error } = await supabaseClient.auth.signIn({ email, password });
        if (error) {
            alert('Login failed');
        } else {
            alert('Logged in successfully');
            // Proceed to next steps
        }
    }

    // Render registration form
    function renderRegisterForm() {
        document.getElementById('root').innerHTML = `
            <div class="container">
                <h2>Register</h2>
                <input type="email" id="email" placeholder="Email">
                <input type="password" id="password" placeholder="Password">
                <button onclick="register()">Register</button>
                <p>Already have an account? <a href="#" onclick="renderLoginForm()">Login</a></p>
            </div>
        `;
    }

    // Register function
    async function register() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const { error } = await supabaseClient.auth.signUp({ email, password });
        if (error) {
            alert('Registration failed');
        } else {
            alert('Registration successful');
            // Proceed to next steps
        }
    }

    // Initialize by rendering the login form
    renderLoginForm();
});