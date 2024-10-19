const jsonbinId = "67126120ad19ca34f8bab618";
const masterKey = "$2a$10$ZhyLvqnODp6F/m/31TwrJOhkAgF2YwNkVT4EwBlXEn.eJWdvTMnRC";

let currentRoomCode = null;

// Handle room creation
document.getElementById('createRoom').addEventListener('click', async () => {
    const roomCode = Math.random().toString(36).substr(2, 8); // Generate a random room code
    currentRoomCode = roomCode;

    // Save room to JSONBin
    await fetch(`https://api.jsonbin.io/v3/b/${jsonbinId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': masterKey
        },
        body: JSON.stringify({
            roomCode: roomCode,
            messages: []
        })
    });

    document.getElementById('roomCodeDisplay').style.display = 'block';
    document.getElementById('roomCode').textContent = roomCode;
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('chatroom').style.display = 'block';
});

// Handle room joining
document.getElementById('joinRoom').addEventListener('click', () => {
    document.getElementById('joinBox').style.display = 'block';
});

document.getElementById('joinRoomBtn').addEventListener('click', async () => {
    const inputCode = document.getElementById('roomCodeInput').value;

    // Fetch room data from JSONBin
    const response = await fetch(`https://api.jsonbin.io/v3/b/${jsonbinId}/latest`, {
        headers: {
            'X-Master-Key': masterKey
        }
    });
    const data = await response.json();

    if (data.record.roomCode === inputCode) {
        currentRoomCode = inputCode;
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('chatroom').style.display = 'block';
    } else {
        alert('Invalid room code');
    }
});

// Handle message sending
document.getElementById('sendMessage').addEventListener('click', async () => {
    const message = document.getElementById('messageInput').value;
    document.getElementById('messageInput').value = '';

    // Add message to chatbox
    const chatbox = document.getElementById('chatbox');
    const messageBubble = document.createElement('div');
    messageBubble.textContent = message;
    messageBubble.classList.add('chat-bubble', 'self');
    chatbox.appendChild(messageBubble);

    // Save message to JSONBin
    const response = await fetch(`https://api.jsonbin.io/v3/b/${jsonbinId}/latest`, {
        headers: {
            'X-Master-Key': masterKey
        }
    });
    const data = await response.json();
    data.record.messages.push({ text: message });

    await fetch(`https://api.jsonbin.io/v3/b/${jsonbinId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': masterKey
        },
        body: JSON.stringify(data.record)
    });
});
