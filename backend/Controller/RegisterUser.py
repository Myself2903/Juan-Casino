from fastapi import APIRouter, Body
from Model.entity.User import UserDB
from Model.UserOperation import register

router = APIRouter() #fastAPI instance

@router.post("/register")
async def registerUser(user: UserDB = Body(...)):
    return await register(user)
