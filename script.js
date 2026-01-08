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