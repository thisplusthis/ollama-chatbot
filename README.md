# Containerized Ollama Node.js Chatbot

### Start the server/containers:
`docker-compose up --build`

### Chatbot front-end location:

`http://localhost:8080`

### Loading Different Ollama Models:

Get into ollama container:

`docker -it ollama sh`

Pull the LLM with ollama:

`ollama pull <your-model>`

- New LLM models will be auto populated in the dropdown when loading the front-end