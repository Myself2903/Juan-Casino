from fastapi import APIRouter, Depends
from Model.User import User
from Model.Auth import auth_user

router = APIRouter() #fastAPI instance

@router.get("/profile")
async def Profile(user: User = Depends(auth_user)): #return profile info. It requires the user to be authorized (logged)
    return user
    