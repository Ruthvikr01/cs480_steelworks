FROM node:22-alpine

WORKDIR /app

# Copies package manifests for dependency installation cache efficiency.
COPY package*.json ./
RUN npm install

# Copies source files.
COPY . .

EXPOSE 5173

# Runs Vite development server for quick internal demo usage.
CMD ["npm", "run", "dev"]
