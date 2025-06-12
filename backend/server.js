import express from 'express';
import {Ollama} from 'ollama';

const app = express();
const port = 3000;

// Configure Ollama client
const ollama = new Ollama({host: 'http://ollama:11434'});

// Middleware to parse JSON request bodies
app.use(express.json());

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const {prompt} = req.body;
        console.log(`making request: ${prompt}`);
        const response = await ollama.chat({
            model: 'gemma3:4b', // Or any model you're using
            messages: [{role: 'user', content: prompt}],
            stream: true,
        });
        for await (const chunk of response) {
            //console.log(chunk.response);
            res.json({response: chunk.response});
        }
        //console.log(response.message.content);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to get response from Ollama'});
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});