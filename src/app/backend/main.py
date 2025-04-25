from fastapi import FastAPI
from app.routers import products, emissions, offsets, users

app = FastAPI(title="CarbonTrack Platform API")

app.include_router(users.router)
app.include_router(products.router)
app.include_router(emissions.router)
app.include_router(offsets.router)

@app.get("/")
def root():
    return {"message": "CarbonTrack API is running"}