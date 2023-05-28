from fastapi import Depends, HTTPException, status
from Model.entity.User import UserDB
from Model.dao.UserDAO import UserDAO
from Model.dao.ImageDAO import ImageDAO
from datetime import date
from dateutil.relativedelta import relativedelta
import bcrypt

def encryptPassword(password: str):
    hashPassword = password.encode()
    sal = bcrypt.gensalt()
    password = bcrypt.hashpw(hashPassword, sal).decode('utf-8') #decode to convert the encrypted password into a str
    return password

async def register(newUser: UserDB = Depends()):
    conn = UserDAO()
    if conn.getUserAuth(newUser.email) is None:
        edad = relativedelta(date.today(), newUser.birthdate).years
        if edad >= 10 and edad <= 80:
            newUser.password = encryptPassword(newUser.password)
            newUser.idimage = 1
            conn.addUser(newUser)
            raise HTTPException(status_code=status.HTTP_201_CREATED, detail="Usuario creado")
        else:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="no cumple los requisitos minimos de edad")
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="cuenta ya existente")


async def getUsers(iduserSearching: int):
    conn = UserDAO()
    return conn.getUsers(iduserSearching)

async def getUserImage(iduser: int):
    conn = UserDAO()
    return conn.getUserShow(iduser)[-1]

   

async def update(idUser: int, username: str, surname: str, name: str, birthdate: date, urlImage: str):
    imageConn = ImageDAO()
    userConn = UserDAO()
    edad = relativedelta(date.today(), birthdate).years

    if edad >= 10 and edad <= 80:
        id_image = await uploadProfileImage(idUser, urlImage)
        print(id_image)
        id_oldImage = userConn.getUserImageId(idUser)
        print(id_oldImage)
        userConn.updateUser(idUser,username, surname, name ,birthdate, id_image)
        if(id_oldImage != 1):
            imageConn.removeImage(id_oldImage)
        raise HTTPException(status_code=status.HTTP_200_OK, detail="cuenta actualizada")
    
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="no cumple los requisitos minimos de edad")

async def uploadProfileImage(iduser:int, url: str):
    imageConn = ImageDAO()
    userConn = UserDAO()

    if(url != ""):
        id_image = imageConn.uploadImage(iduser, url)
        return id_image

    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="url vacía")     

async def delete(idUser: int):
    conn = UserDAO()
    if(conn.getUserShow(idUser) is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="usuario inexistente")
    else:
        conn.deleteUser(idUser)
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="usuario eliminado")

    
async def updatePassword(idUser: int, newPassword: str):
    conn = UserDAO()
    password = encryptPassword(newPassword)
    conn.updatePassword(idUser, password)
    raise HTTPException(status_code=status.HTTP_200_OK, detail="contraseña actualizada")

async def getCoins(idUser:int):
    conn = UserDAO()
    coins = conn.getCoins(idUser)
    if not coins:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="usuario no encontrado")
        return -1
    return coins

async def updateCoins(amount:int, currentCoins:int, iduser: int):
    conn = UserDAO()
    if(type(amount) == int):
        totalCoins = currentCoins+amount
        if(totalCoins < 0):
            conn.updateCoins(0, iduser)
        else:
            conn.updateCoins(totalCoins, iduser)
        raise HTTPException(status_code=status.HTTP_200_OK, detail="monedas actualizadas")
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail= "monto invalido")