# Stage 1: Build the React frontend
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Setup Node.js server and Nginx
FROM node:18-alpine

WORKDIR /app

# Install Nginx
RUN apk add --no-cache nginx

# Copy server files
COPY package.json ./
RUN npm install

COPY server/ ./

# Copy frontend build from the build stage
COPY --from=build /app/dist /app/dist

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 8031 8032

# Start Nginx and the Node.js server
CMD ["sh", "-c", "nginx && node index.js"]