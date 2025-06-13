# Containerized Node and Ollama Chatbot

### Start the server / containers:
`docker-compose up --build`

### Chatbot front-end location:

`http://localhost:8080`

### Loading Different Ollama Models:

1. Get into the ollama container: `docker exec -it ollama sh`

2. Pull the LLM with ollama: `ollama pull <your-model>`

- All "new" LLM models will be populated in the dropdown dynamically when loading the front-end.