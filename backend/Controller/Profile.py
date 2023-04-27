from fastapi import APIRouter, Depends
from Model.entity.User import User
from Model.entity.User import UserDB
from Model.Auth import auth_user
from Model.UserOperation import update as updateUser, updatePassword as updPass, delete 
import Model.FriendOperation as fo


router = APIRouter() #fastAPI instance

@router.get("/profile")
async def profile(user: User = Depends(auth_user)): #return profile info. It requires the user to be authorized (logged)
    return user

@router.put("/profile/update")
async def updateProfile(updatedUser: User, user: User = Depends(auth_user)):
    return await updateUser(user['iduser'] , updatedUser)

@router.put("/profile/updatepassword")
async def updatePassword(newPassword: str, user: User = Depends(auth_user)):
    return await updPass(user['iduser'] , newPassword)

@router.delete("/profile/delete")
async def deleteProfile(user: User = Depends(auth_user)):
    return await delete(user['iduser'])

#friends router

@router.get("/profile/friends")
async def getFriends(iduser: int):
    return await fo.getFriends(iduser)


@router.post("/profile/friends/new")
async def newFriend(iduserRequested: int, userRequest: User = Depends(auth_user)): #first arg usr to add as friend, second the one who sent it
    return await fo.addFriend(userRequest['iduser'], iduserRequested)

@router.delete("/profile/friends/delete")
async def deleteFriend(iduser2: int, iduser1: User = Depends(auth_user)):
    return await fo.deleteFriend(iduser1['iduser'], iduser2)

@router.post("/profile/friends/accept")
async def acceptFriendship(iduser2: int, iduser1: User = Depends(auth_user)):
    return await fo.acceptFrienship(iduser1['iduser'], iduser2)