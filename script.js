const jsonbinId = "67126120ad19ca34f8bab618";
const masterKey = "$2a$10$ZhyLvqnODp6F/m/31TwrJOhkAgF2YwNkVT4EwBlXEn.eJWdvTMnRC";

let currentRoomCode = null;

// Function to fetch room data from JSONBin
async function fetchRoomData(roomCode) {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${jsonbinId}/latest`, {
        headers: {
            'X-Master-Key': masterKey
        }
    });
    const data = await response.json();
    if (data.record.roomCode === roomCode) {
        return data.record;
    } else {
        throw new Error('Room not found');
    }
}

// Function to save room data to JSONBin
async function saveRoomData(roomData) {
    await fetch(`https://api.jsonbin.io/v3/b/${jsonbinId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': masterKey
        },
        body: JSON.stringify(roomData)
    });
}

// Function to display messages in the chatbox
function displayMessages(messages) {
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML = ''; // Clear chatbox

    messages.forEach(message => {
        const messageBubble = document.createElement('div');
        messageBubble.textContent = message.text;
        messageBubble.classList.add('chat-bubble', message.sender === 'self' ? 'self' : 'other');
        chatbox.appendChild(messageBubble);
    });
}

// Handle room creation
document.getElementById('createRoom').addEventListener('click', async () => {
    const roomCode = Math.random().toString(36).substr(2, 8); // Generate a random room code
    currentRoomCode = roomCode;

    const newRoomData = {
        roomCode: roomCode,
        messages: []
    };

    // Save the new room to JSONBin
    await saveRoomData(newRoomData);

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

    try {
        const roomData = await fetchRoomData(inputCode);
        currentRoomCode = inputCode;

        // Display the room and its messages
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('chatroom').style.display = 'block';
        document.getElementById('roomCode').textContent = currentRoomCode;

        // Display the chat history
        displayMessages(roomData.messages);
    } catch (error) {
        alert('Invalid room code');
    }
});

// Handle message sending
document.getElementById('sendMessage').addEventListener('click', async () => {
    const message = document.getElementById('messageInput').value;
    if (!message.trim()) return; // Don't send empty messages
    document.getElementById('messageInput').value = '';

    // Fetch the latest room data to ensure the message history is updated
    const roomData = await fetchRoomData(currentRoomCode);

    // Add the new message to the room's message list
    const newMessage = { text: message, sender: 'self' };
    roomData.messages.push(newMessage);

    // Save the updated room data to JSONBin
    await saveRoomData(roomData);

    // Display the updated messages in the chatbox
    displayMessages(roomData.messages);
});
