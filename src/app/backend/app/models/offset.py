from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base

class Offset(Base):
    __tablename__ = "offsets"
    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String)
    description = Column(String)
    tonnes = Column(Float)
    source_url = Column(String)