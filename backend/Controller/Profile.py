from fastapi import APIRouter, Depends
from Model.entity.User import User
from Model.Auth import auth_user
from Model.dao.FriendsDAO import FriendsDAO
import Model.FriendOperation as fo

router = APIRouter() #fastAPI instance

@router.get("/profile")
async def profile(user: User = Depends(auth_user)): #return profile info. It requires the user to be authorized (logged)
    return user


@router.get("/profile/friends")
async def getFriends(iduser: int):
    return await fo.getFriends(iduser)


@router.post("/profile/friends/new")
async def newFriend(iduserRequested: int, userRequest: User = Depends(auth_user)): #first arg usr to add as friend, second the one who sent it
    print("eche")
    return await fo.addFriend(userRequest['iduser'], iduserRequested)
