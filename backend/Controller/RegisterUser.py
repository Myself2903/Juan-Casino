from fastapi import APIRouter, Depends
from Model.entity.User import User
from Model.Register import register

router = APIRouter() #fastAPI instance

@router.post("/register")
async def registerUser(user: User = Depends()):
    return await register(user)
