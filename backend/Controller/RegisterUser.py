from fastapi import APIRouter, Depends
from Model.UserDB import UserDB
from Model.Register import register

router = APIRouter() #fastAPI instance

@router.post("/register")
async def registerUser(user: UserDB = Depends()):
    return await register(user)
