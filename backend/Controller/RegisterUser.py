from fastapi import APIRouter, Depends
from Model.entity.User import UserDB
from Model.UserOperation import register

router = APIRouter() #fastAPI instance

@router.post("/register")
async def registerUser(user: UserDB = Depends()):
    return await register(user)
