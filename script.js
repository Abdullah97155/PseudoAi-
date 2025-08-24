document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    
    // Focus input on load
    userInput.focus();
    
    // Send message when clicking the send button
    sendButton.addEventListener('click', sendMessage);
    
    // Send message when pressing Enter
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        userInput.value = '';
        
        // Simulate AI thinking
        setTimeout(generateAIResponse, 1000);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        avatar.textContent = sender === 'user' ? 'You' : 'AI';
        
        const content = document.createElement('div');
        content.classList.add('content');
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        
        content.appendChild(paragraph);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function generateAIResponse() {
        const userMessage = chatContainer.lastElementChild.querySelector('p').textContent.toLowerCase();
        
        let response;
        
        // Simple response logic
        if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
            response = "Hello there! How can I assist you today?";
        } else if (userMessage.includes('how are you')) {
            response = "I'm just a program, but I'm functioning well! How can I help you?";
        } else if (userMessage.includes('thank')) {
            response = "You're welcome! Is there anything else you'd like to know?";
        } else if (userMessage.includes('bye') || userMessage.includes('goodbye')) {
            response = "Goodbye! Feel free to come back if you have more questions.";
        } else if (userMessage.includes('weather')) {
            response = "I don't have access to real-time weather data, but I can help you find a weather service if you'd like!";
        } else if (userMessage.includes('time')) {
            const now = new Date();
            response = `The current time is ${now.toLocaleTimeString()}.`;
        } else if (userMessage.includes('joke')) {
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything!",
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "What do you call a fake noodle? An impasta!",
                "How does a penguin build its house? Igloos it together!"
            ];
            response = jokes[Math.floor(Math.random() * jokes.length)];
        } else {
            response = "That's an interesting question. I'm still learning, but I'll do my best to help you with that.";
        }
        
        addMessage(response, 'ai');
    }
    
    // Add initial messages to demonstrate the chat
    setTimeout(() => {
        addMessage("Try asking me about the weather, time, or even tell me a joke!", 'ai');
    }, 1500);
});
