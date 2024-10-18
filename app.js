// Firebase configuration from your SDK
const firebaseConfig = {
  apiKey: "AIzaSyAcpGRwt...",
  authDomain: "sama-chat-bd4e1.firebaseapp.com",
  projectId: "sama-chat-bd4e1",
  storageBucket: "sama-chat-bd4e1.appspot.com",
  messagingSenderId: "775627963670",
  appId: "1:775627963670:web:035bca94e6c61ae2eee437",
  measurementId: "G-W2MJFN957Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Handle registration
document.getElementById('register-btn').addEventListener('click', function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log('Registration successful');
      switchToChat();
    })
    .catch((error) => console.error('Error:', error));
});

// Handle login
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log('Login successful');
      switchToChat();
    })
    .catch((error) => console.error('Error:', error));
});

// Switch to chat view
function switchToChat() {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('chat-section').style.display = 'block';
  
  loadMessages();
}

// Handle sending messages
document.getElementById('message-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const message = document.getElementById('message').value;
  
  if (message.trim()) {
    db.collection('messages').add({
      text: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: auth.currentUser.uid
    });
    
    document.getElementById('message').value = '';
  }
});

// Load messages in real-time
function loadMessages() {
  db.collection('messages').orderBy('timestamp')
    .onSnapshot((snapshot) => {
      document.getElementById('chat-box').innerHTML = ''; // Clear previous messages
      snapshot.forEach((doc) => {
        const msg = doc.data().text;
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble');
        bubble.innerText = msg;
        document.getElementById('chat-box').appendChild(bubble);
      });
    });
}