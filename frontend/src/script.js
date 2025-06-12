// import { Marked } from "marked";
// import { markedHighlight } from "marked-highlight";
// import hljs from 'highlight.js';

const { Marked } = globalThis.marked;
// const { markedHighlight } = globalThis.markedHighlight;

/*const marked = new Marked(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, {language}).value;
        }
    })
);*/
const prompt = document.getElementById('prompt-input');

async function populateModelDropdown() {
    const dropdown = document.getElementById('model-chooser'); // Replace 'modelSelect' with your dropdown's ID
    try {
        const response = await fetch('/api/models'); // Replace with your Ollama URL if needed
        const data = await response.json();
        if (data && data.models) {
            // Clear existing options
            dropdown.innerHTML = '';
            // Populate dropdown with models
            data.models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.name;
                option.textContent = model.name;
                dropdown.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error fetching models:', error);
        // Handle the error (e.g., display an error message)
    }
}

async function sendMessage() {
    const responseDiv = document.getElementById('chat-area');
    const model = document.getElementById('model-chooser');
    let msg = prompt.value;
    prompt.value = "";
    responseDiv.innerHTML = marked.parse('**Thinking...**'); // Clear previous response
    prompt.disabled = true;
    prompt.placeholder = 'Let the man finish!';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt: msg, model: model.value}),

        });

        if (!response.body) {
            throw new Error('ReadableStream not available');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const {done, value} = await reader.read();
            if (done) {
                prompt.disabled = false;
                prompt.placeholder = 'Enter your prompt';
                break;
            }
            buffer += decoder.decode(value, {stream: true});
            responseDiv.innerHTML = marked.parse(buffer);
            responseDiv.scrollTop = responseDiv.scrollHeight;
        }
    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerHTML = 'Error fetching response.';
    }
}

prompt.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents the default action of the enter key (like submitting a form)
        // Your code to execute when Enter key is pressed
        sendMessage();
    }
});

populateModelDropdown();