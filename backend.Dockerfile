FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# We mount the source at runtime, so don't copy the backend/ code here
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "8000"]
