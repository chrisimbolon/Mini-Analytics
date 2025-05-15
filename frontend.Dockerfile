# frontend.Dockerfile
FROM node:20

WORKDIR /app

# Accept VITE_API_URL as build argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

# Build with injected VITE_API_URL
RUN npm run build

RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "80"]
