# frontend.Dockerfile
FROM node:20

WORKDIR /app

# Accept build-time API URL
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

# Log injected value (for debug)
RUN echo "🔧 Injected VITE_API_URL=$VITE_API_URL"

# ✅ Inject the env into the build
RUN VITE_API_URL=$VITE_API_URL npm run build

# Serve static files
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "80"]
