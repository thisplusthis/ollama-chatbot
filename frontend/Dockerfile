# Stage 1: Build the Node.js application
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
COPY src/ ./
RUN npm install

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

WORKDIR /app
COPY --from=builder /app ./
COPY nginx.conf /etc/nginx/conf.d/default.conf