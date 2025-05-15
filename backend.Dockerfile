FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# mount the source at runtime, by copying the backend/ code here
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "8000"]
