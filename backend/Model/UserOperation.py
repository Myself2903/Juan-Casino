from fastapi import Depends, HTTPException, status
from Model.entity.User import UserDB
from Model.dao.UserDAO import UserDAO
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


async def getUsers():
    conn = UserDAO()
    return conn.getUsers()

async def update(idUser: int, username: str, surname: str, name: str, birthdate: date):
    conn = UserDAO()
    edad = relativedelta(date.today(), birthdate).years
    if edad >= 10 and edad <= 80:
        conn.updateUser(idUser,username, surname, name ,birthdate)
        raise HTTPException(status_code=status.HTTP_200_OK, detail="cuenta actualizada")
    
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="no cumple los requisitos minimos de edad")

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