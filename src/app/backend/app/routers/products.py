from fastapi import APIRouter

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/")
def get_products():
    return [{"product_id": 1, "name": "Eco Bottle"}]