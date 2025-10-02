from fastapi import APIRouter
from .endpoints import sarsVariantPrediction

router = APIRouter()

router.include_router(sarsVariantPrediction.router, prefix="/sars-variants", tags=["SARS-CoV2 Variants Classification and Mutation Analysis"])