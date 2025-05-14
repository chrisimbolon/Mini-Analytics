from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Float, DateTime
from backend.database import Base
from datetime import datetime

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String)
    session_id = Column(String)
    page = Column(String)
    timestamp = Column(DateTime)
    session_duration = Column(Float, nullable=True)
    user_id = Column(String)  

# Pydantic schema for request validation
class EventIn(BaseModel):
    session_id: str
    page: str
    timestamp: datetime
    session_duration: float
    user_id: str 
