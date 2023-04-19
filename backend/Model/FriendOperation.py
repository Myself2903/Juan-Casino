from fastapi import HTTPException, status
from Model.dao.FriendsDAO import FriendsDAO
from Model.dao.UserDAO import UserDAO
from Model.entity.User import User


async def getFriends(iduser: int):
    conn = FriendsDAO()
    userConn = UserDAO()

    #check user exist
    if userConn.getUserShow(iduser) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not registered")
    
    return conn.getFriends(iduser)



async def addFriend(iduserRequest: int, iduserRequested: int):
    conn = FriendsDAO()
    userConn = UserDAO()
    #no need to check userRequest since user is authenticated

    print('user request: '+ iduserRequest)
    print('user requested: '+ iduserRequested)
    #check userRequested
    if iduserRequest == iduserRequested:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="user trying to add himself")
    
    elif userConn.getUserShow(iduserRequested) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not registered")
    else:
        conn.addFriend(iduserRequest, iduserRequested)
        raise HTTPException(status_code=status.HTTP_200_OK, detail = "request sent")
    
