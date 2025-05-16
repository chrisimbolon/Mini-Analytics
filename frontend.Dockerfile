# frontend.Dockerfile
FROM node:20

WORKDIR /app

# Accept build-time API URL
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Install deps
COPY frontend/package*.json ./
RUN npm install

# Copy source
COPY frontend/ .

# Debug: print injected API URL
RUN echo "🔧 Injected VITE_API_URL=$VITE_API_URL"

# ✅ Force production mode build
RUN VITE_API_URL=$VITE_API_URL npm run build -- --mode production

# Serve the build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "80"]
