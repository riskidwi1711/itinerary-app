FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json for root and server
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies for both
RUN npm install --prefix ./server && npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5173
EXPOSE 3000

CMD ["npm", "run", "start"]