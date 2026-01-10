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
    const time = now.toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' });

    messageEl.innerHTML = `
        <div class="message-avatar">${user.emoji}</div>
        <div class="message-content">
            <div class="message-user">${user.name}</div>
            <div class="message-bubble">${escapeHtml(text)}</div>
            <div class="message-time">${time}</div>
        </div>
    `;

    messagesContainer.appendChild(messageEl);
    scrollToBottom();
}


function showTypingIndicator(user) {
    if (typingUsers.has(user.id)) return;

    typingUsers.add(user.id);

    const typingEl = document.createElement('div');
    typingEl.className = 'message-group received';
    typingEl.id = `typing-${user.id}`;
    typingEl.innerHTML = `
    <div class="message-avatar">${user.emoji}</div>
    <div class="message-content">
        <div class="message-user">${user.name}</div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
             <div class="typing-dot"></div>
              <div class="typing-dot"></div>
        </div>
    </div>
    `;

    messagesContainer.appendChild(typingEl);
    scrollToBottom();
}


function removeTypingIndicator(userId) {
    typingUsers.delete(userId);
    const typingEl = document.getElementById(`typing-${userId}`);
    if (typingEl) typingEl.remove();
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    displayMessage(text, currentUser, true);
    allMessages.push({ text, user: currentUser, time: Date.now() });
    messageInput.value = '';

    setTimeout(() => {
        const randomUser = users[Math.floor(Math.random() * users.length - 1)];
        showTypingIndicator(randomUser);

        setTimeout(() => {
            
        })
    })
}

