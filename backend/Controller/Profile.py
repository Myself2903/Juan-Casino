from fastapi import APIRouter, Depends, Body
from Model.entity.User import User
from Model.Auth import auth_user
import Model.UserOperation as usrOp
import Model.FriendOperation as fo
from datetime import datetime

router = APIRouter() #fastAPI instance

@router.get("/profile")
async def profile(user: User = Depends(auth_user)): #return profile info. It requires the user to be authorized (logged)
    return user

@router.get("/users")
async def getUsers(user: User = Depends(auth_user)):
    return await usrOp.getUsers(user[0])

@router.get("/profile/getImage")
async def getUserImage(user: User = Depends(auth_user)):
    return await usrOp.getUserImage(user[0])

@router.post("/profile/uploadImage")
async def uploadImage(request_data: dict = Body(...),user: User = Depends(auth_user)):
    return await usrOp.uploadProfileImage(user[0], request_data.get("url"), user[-1])

@router.put("/profile/update")
async def updateProfile(request_data: dict = Body(...), user: User = Depends(auth_user)):
    birthdate = datetime.strptime(request_data.get("birthdate"), '%Y-%m-%d').date()
    return await usrOp.update(idUser=user[0] , username=request_data.get("username"), surname=request_data.get("surname"), name=request_data.get("name") , birthdate=birthdate, urlImage=request_data.get("picture"))

@router.put("/profile/updatepassword")
async def updatePassword(newPassword: str, user: User = Depends(auth_user)):
    return await usrOp.updatePassword(user[0] , newPassword)

@router.get("/profile/coins")
async def getCoins(user: User = Depends(auth_user)):
    return await usrOp.getCoins(user[0])
    
@router.put("/profile/updateCoins")
async def updateCoins(request_data: dict= Body(...), user: User = Depends(auth_user)):
    return await usrOp.updateCoins(request_data.get("bet"), request_data.get("reward"),user[6], user[0])

@router.delete("/profile/delete")
async def deleteProfile(user: User = Depends(auth_user)):
    return await usrOp.delete(user[0])

#friends router

@router.get("/profile/friends")
async def getFriends(iduser: int):
    return await fo.getFriends(iduser)

@router.get("/profile/pendingFriends/sent")
async def getPendingFriendsSent(user: User = Depends(auth_user)):
    return await fo.getPendingFriends(user[0], 1)

@router.get("/profile/pendingFriends/received")
async def getPendingFriendsReceived(user: User = Depends(auth_user)):
    return await fo.getPendingFriends(user[0], 2)

@router.get("/profile/areFriends")
async def areFriends(iduser: int, user: User = Depends(auth_user)):
    return await fo.areFriends(iduser, user[0])


@router.post("/profile/friends/new")
async def newFriend(request_data: dict= Body(...), userRequest: User = Depends(auth_user)): #first arg usr to add as friend, second the one who sent it
    return await fo.addFriend(userRequest[0], request_data.get('iduserRequested'))

@router.delete("/profile/friends/delete")
async def deleteFriend(idfriendDelete: int = Body(...), iduser1: User = Depends(auth_user)):
    return await fo.deleteFriend(iduser1[0], idfriendDelete)

@router.post("/profile/friends/accept")
async def acceptFriendship(request_data: dict = Body(...), iduser2: User = Depends(auth_user)):
    print(request_data.get("idfriendAccept"))
    return await fo.acceptFrienship(request_data.get("idfriendAccept"), iduser2[0])