const { createClient } = supabase;
const supabaseUrl = 'https://szagifqmwaedmyixkyby.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YWdpZnFtd2FlZG15aXhreWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzNjg5MzIsImV4cCI6MjA0NDk0NDkzMn0.eYdFojROC5K5SDks2gzLQrsYez8CbeuFXgqOlGT2pnM';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

async function renderLoginForm() {
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

async function renderRegisterForm() {
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

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await supabaseClient.auth.signIn({ email, password });
    if (error) {
        alert('Login failed');
    } else {
        renderProfilePage();
    }
}

async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await supabaseClient.auth.signUp({ email, password });
    if (error) {
        alert('Registration failed');
    } else {
        renderProfilePage();
    }
}

async function renderProfilePage() {
    document.getElementById('root').innerHTML = `
        <div class="container">
            <h2>Update Profile</h2>
            <input type="text" id="name" placeholder="Name">
            <input type="text" id="location" placeholder="Location">
            <input type="text" id="sex" placeholder="Sex">
            <input type="text" id="education" placeholder="Education">
            <button onclick="saveProfile()">Save Profile</button>
        </div>
    `;
}

async function saveProfile() {
    const user = supabaseClient.auth.user();
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const sex = document.getElementById('sex').value;
    const education = document.getElementById('education').value;
    const { error } = await supabaseClient.from('users').update({
        name, location, sex, education
    }).eq('id', user.id);

    if (error) {
        alert('Profile update failed');
    } else {
        renderChatOptions();
    }
}

async function renderChatOptions() {
    document.getElementById('root').innerHTML = `
        <div class="container">
            <button onclick="createChatRoom()">Create Chat Room</button>
            <button onclick="joinChatRoom()">Join Chat Room</button>
        </div>
    `;
}

async function createChatRoom() {
    const { data, error } = await supabaseClient.from('messages').insert([{ user_id: supabaseClient.auth.user().id, message: 'Chat Room Created' }]);
    if (error) {
        alert('Error creating chat room');
    } else {
        alert('Chat room created with code: ' + data[0].id);
    }
}

async function joinChatRoom() {
    const chatRoomCode = prompt('Enter Chat Room Code');
    const { data, error } = await supabaseClient.from('messages').select('*').eq('id', chatRoomCode);
    if (error || data.length === 0) {
        alert('Invalid chat room code');
    } else {
        alert('Joined chat room: ' + chatRoomCode);
    }
}

renderLoginForm();
