from fastapi import HTTPException, status
from Model.dao.FriendsDAO import FriendsDAO
from Model.dao.UserDAO import UserDAO
from Model.entity.User import User


async def getFriends(iduser: int):
    conn = FriendsDAO()
    userConn = UserDAO()

    #check user exist
    if userConn.getUserShow(iduser) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="usuario no registrado")

    return conn.getFriends(iduser)



async def addFriend(iduserRequest: int, iduserRequested: int):
    conn = FriendsDAO()
    userConn = UserDAO()

    #no need to check userRequest since user is authenticated
    #check that not trying to add yourself
    if iduserRequest == iduserRequested:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="usuario trata de agregarse a si mismo")
    
    #check if user requested exist
    elif userConn.getUserShow(iduserRequested) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="usuario no registrado")

    #check if are friends
    elif conn.areFriends(iduserRequest, iduserRequested):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="amistad o solicitud existente")
    
    #add friend
    else:
        conn.addFriend(iduserRequest, iduserRequested)
        raise HTTPException(status_code=status.HTTP_200_OK, detail = "solicitud enviada")

async def deleteFriend(iduser1: int, iduser2: int):
    conn = FriendsDAO()

    #check if are friends
    if conn.areFriends(iduser1, iduser2):
        conn.deleteFriend(iduser1, iduser2)
        raise HTTPException(status_code=status.HTTP_200_OK, detail= "eliminado")
  
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="los usuarios no son amigos")

async def acceptFrienship(iduser1: int, iduser2: int):
    conn = FriendsDAO()
    #check if are friends
    if(conn.areFriends(iduser1, iduser2)):
        conn.acceptFriend(iduser1,iduser2)
        raise HTTPException(status_code=status.HTTP_202_ACCEPTED, detail= "aceptado")
  
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="los usuarios no son amigos")