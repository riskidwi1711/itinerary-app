FROM oven/bun:1.1.18-alpine

WORKDIR /app

# Install libstdc++ for sqlite3 compatibility
RUN apk add --no-cache libstdc++

COPY package*.json ./

# Use Bun to install dependencies
RUN bun install

COPY . .

EXPOSE 3002

# Use Bun to run the server
CMD ["bun", "run", "server"]