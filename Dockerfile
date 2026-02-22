# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# (Optional) Build step if user has one
# RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app

# Copy from build stage
COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "start"]