let chatData = {
    users: [],
    messages: [],
    responses: [],
    incomingMessages: []
};

async function loadChatData() {
    try {
        const response = await fetch('data.json');
        chatData = await response.json();
        console.log('Chat data loaded successfully', chatData);
        init();
    } catch (error) {
        console.error('Error loading chat data:', error);
        initWithDefaults();
    }
}

const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const usersList = document.getElementById('usersList');
const onlineCount = document.getElementById('onlineCount');
const roomStatus = document.getElementById('roomStatus');

let users = [];
let currentUser = null;
let allMessages = [];
let typingUsers = new Set();

function renderUsers() {
    usersList.innerHTML = users.map(user => `
        <div class="user-item" ${user.id === currentUser.id ? 'active' : ''}>
        <div class="user-avatar">${user.emoji}</div>
        <div class="user-name">${user.name}</div>
        <div class="user-status ${user.status}"></div>
        </div>
        `).join('');
        onlineCount.textContent = `${users.length} online`;
}


function displayMessage(text, user, isOwn = false) {
    const messageEl = document.createElement('div');
    messageEl.className = `message-group ${isOwn ? 'sent' : 'received'}`;

    const now = new Date();
    
}

