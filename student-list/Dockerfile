# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies separately to cache effectively
COPY package.json package-lock.json* ./

# Install only production dependencies (nếu không cần devDependencies)
RUN npm install --production && npm cache clean --force

# Copy application code
COPY . .

# Build the application (nếu cần, bỏ qua nếu không cần build)
# RUN npm run build

# Stage 2: Runtime stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies and build artifact from builder stage
COPY --from=builder /app .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
