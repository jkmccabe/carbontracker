from fastapi import APIRouter

router = APIRouter(prefix="/emissions", tags=["Emissions"])

@router.get("/")
def estimate_emissions():
    return {"message": "Estimated emissions"}