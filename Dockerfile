# Use official Node.js image
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Production image
FROM node:20-slim

WORKDIR /app

# Copy built app and dependencies from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# COPY YOUR DATABASE FILE HERE 
# (Replace 'sqlite.db' with whatever your actual database filename is called!)
COPY --from=builder /app/sqlite.db ./sqlite.db 

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "build"]