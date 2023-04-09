from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from Model.Auth import verifyLogin

router = APIRouter() #fastAPI instance

@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    response = await verifyLogin(form)
    return response




