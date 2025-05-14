# backend/schemas.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EventCreate(BaseModel):
    event_type: str
    session_id: str
    page: str
    user_id: str
    timestamp: Optional[datetime] = None
    session_duration: Optional[float] = None
    
    class Config:
        orm_mode = True
