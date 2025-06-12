import express from 'express';
import {Ollama} from 'ollama';
import cors from 'cors';

const app = express();
const port = 3000;

// Configure Ollama client
const ollama = new Ollama({host: 'http://ollama:11434'});

app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const {prompt, model} = req.body;
        const stream = await ollama.chat({
            model: model,
            messages: [{role: 'user', content: prompt}],
            stream: true,
        });
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        for await (const part of stream) {
            res.write(part.message.content);
        }
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to get response from Ollama'});
    }
});

app.get('/api/models', async (req, res) => {
    try {
        const response = await fetch('http://ollama:11434/api/tags');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Ollama models:', error);
        res.status(500).json({error: 'Failed to fetch Ollama models'});
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});