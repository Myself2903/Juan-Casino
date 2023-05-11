from fastapi import APIRouter, Depends, Body
from Model.entity.User import User
from Model.Auth import auth_user
import Model.UserOperation as usrOp
import Model.FriendOperation as fo
from datetime import date

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

@router.put("/profile/update")
async def updateProfile(username: str = Body(...), surname: str = Body(...), name: str = Body(...), birthdate: date = Body(...), user: User = Depends(auth_user)):
    return await usrOp.update(user[0] , username, surname, name ,birthdate)

@router.put("/profile/updatepassword")
async def updatePassword(newPassword: str, user: User = Depends(auth_user)):
    return await usrOp.updatePassword(user['iduser'] , newPassword)

@router.put("/profile/coins")
async def updateCoins(amount: int, user: User = Depends(auth_user)):
    return await usrOp.updateCoins(amount,user['coins'], user['iduser'])

@router.delete("/profile/delete")
async def deleteProfile(user: User = Depends(auth_user)):
    return await usrOp.delete(user['iduser'])

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
async def deleteFriend(request_data: dict = Body(...), iduser1: User = Depends(auth_user)):
    return await fo.deleteFriend(iduser1[0], request_data.get("iduserDeleted"))

@router.post("/profile/friends/accept")
async def acceptFriendship(iduser1: int, iduser2: User = Depends(auth_user)):
    return await fo.acceptFrienship(iduser1, iduser2[0])