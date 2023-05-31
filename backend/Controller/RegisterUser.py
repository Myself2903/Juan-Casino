from fastapi import APIRouter, Body, Request, HTTPException, status
from Model.entity.User import UserDB
from Model.UserOperation import register,send_email
from Model.Auth import verifyUser

router = APIRouter()

@router.post("/register")
async def registerUser(request: Request,user: UserDB = Body(...)):
    user.idimage = 1
    user.state = 1
    user.iduser = await register(user)
    if user.iduser:
        user.verifyToken = await send_email(request, user)
        raise HTTPException(status_code=status.HTTP_201_CREATED, detail="Usuario creado")
    


@router.post("/register/verifyAccount")
async def verifyAccount(request_data : dict = Body(...)):
    return await verifyUser(request_data.get("token"))
