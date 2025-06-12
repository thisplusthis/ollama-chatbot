document.getElementById('send-btn').addEventListener('click', async () => {
    const promptInput = document.getElementById('prompt-input');
    const prompt = promptInput.value;
    promptInput.value = '';

    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML += `<p><strong>You:</strong> ${prompt}</p>`;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        chatArea.innerHTML += `<p><strong>Ollama:</strong> ${data.response}</p>`;
    } catch (error) {
        console.error('Error:', error);
        chatArea.innerHTML += `<p><strong>Error:</strong> ${error.message}</p>`;
    }
});