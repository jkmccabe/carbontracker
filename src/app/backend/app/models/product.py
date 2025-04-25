from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database.database import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    estimated_emissions = Column(Float)