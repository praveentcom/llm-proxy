# Dockerfile
FROM node:22-slim

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install ALL dependencies (including devDeps for TypeScript)
RUN npm install

# Copy all source code
COPY . .

# Compile TypeScript inside container
RUN npx tsc

ENV PORT=8080
EXPOSE 8080

# Run the compiled JS file
CMD ["node", "dist/proxy.js"]
