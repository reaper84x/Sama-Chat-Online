let currentRoomCode = "";
let chatHistory = {};
let username = "";
let avatarUrl = "";

// Your JSONBin details
const binId = '6716318bacd3cb34a89a9069';
const apiKey = '$2a$10$ZhyLvqnODp6F/m/31TwrJOhkAgF2YwNkVT4EwBlXEn.eJWdvTMnRC';

// Fetch chat history from JSONBin
const fetchChatHistory = async () => {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/bins/${binId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': apiKey,
            }
        });
        const data = await response.json();
        chatHistory = data.record.rooms || {}; // Initialize chatHistory with existing rooms
    } catch (error) {
        console.error('Error fetching chat history:', error);
    }
};

// Save chat history to JSONBin
const saveChatHistory = async () => {
    try {
        await fetch(`https://api.jsonbin.io/v3/bins/${binId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': apiKey,
            },
            body: JSON.stringify({ rooms: chatHistory }),
        });
    } catch (error) {
        console.error('Error saving chat history:', error);
    }
};

const toggleSettings = () => {
    const menu = document.getElementById('settings-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
};

const hostChat = () => {
    currentRoomCode = generateRoomCode();
    chatHistory[currentRoomCode] = [];
    alert(`Chat room created! Room code: ${currentRoomCode}`);
    saveChatHistory(); // Save new room to JSONBin
    enterChatRoom();
};

const joinChat = () => {
    document.getElementById('join-container').classList.remove('hidden');
};

const joinRoom = () => {
    const roomCode = document.getElementById('room-code').value.trim();
    if (chatHistory[roomCode]) {
        currentRoomCode = roomCode;
        enterChatRoom();
    } else {
        alert("Invalid room code. Please try again.");
    }
};

const enterChatRoom = () => {
    document.getElementById('chat-container').classList.remove('hidden');
    document.getElementById('join-container').classList.add('hidden');
    displayMessages();
};

const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const sendMessage = () => {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    if (messageText) {
        const message = { text: messageText, sender: username, avatar: avatarUrl };
        chatHistory[currentRoomCode].push(message);
        messageInput.value = "";
        displayMessages();
        saveChatHistory(); // Save message to JSONBin
    }
};

const displayMessages = () => {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = "";
    chatHistory[currentRoomCode].forEach((msg) => {
        const msgBubble = document.createElement('div');
        msgBubble.className = msg.sender === username ? 'message sender' : 'message recipient';
        msgBubble.innerHTML = `
            <img src="${msg.avatar}" alt="avatar" class="avatar">
            <strong>${msg.sender}</strong>: ${msg.text}
        `;
        messagesContainer.appendChild(msgBubble);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
};

// Initialize the app
const initApp = async () => {
    await fetchChatHistory(); // Load chat history when app initializes
};

document.getElementById('host-btn').onclick = hostChat;
document.getElementById('join-btn').onclick = joinChat;
document.getElementById('join-room-btn').onclick = joinRoom;
document.getElementById('send-btn').onclick = sendMessage;

// Save username and avatar when entered
document.getElementById('username').oninput = (e) => {
    username = e.target.value;
};
document.getElementById('avatar-url').oninput = (e) => {
    avatarUrl = e.target.value;
};

// Run the initialization
initApp();