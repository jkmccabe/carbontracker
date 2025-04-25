from fastapi import APIRouter

router = APIRouter(prefix="/offsets", tags=["Offsets"])

@router.get("/")
def list_offsets():
    return [{"offset_id": 1, "project": "Rainforest Brazil"}]