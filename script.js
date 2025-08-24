document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const themeToggle = document.getElementById('themeToggle');
    
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
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        // Update button icon based on current mode
        if (document.body.classList.contains('light-mode')) {
            // Switch to moon icon (dark mode icon)
            themeToggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        } else {
            // Switch to sun icon (light mode icon)
            themeToggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 20V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.34 17.66L4.93 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.07 4.93L17.66 6.34" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
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
            response = jokes[Math.floor(MathRandom() * jokes.length)];
        } else if (userMessage.includes('dark mode') || userMessage.includes('dark theme')) {
            response = "I see you're enjoying the dark theme! It's easier on the eyes, especially at night.";
        } else if (userMessage.includes('light mode') || userMessage.includes('light theme')) {
            response = "Light mode is great for daytime use! You can switch between themes using the button in the header.";
        } else {
            response = "That's an interesting question. I'm still learning, but I'll do my best to help you with that.";
        }
        
        addMessage(response, 'ai');
    }
    
    // Add initial messages to demonstrate the chat
    setTimeout(() => {
        addMessage("Try asking me about the weather, time, or even tell me a joke! You can also toggle between light and dark mode using the button in the top right.", 'ai');
    }, 1500);
});
