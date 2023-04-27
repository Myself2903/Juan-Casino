from fastapi import Depends, HTTPException, status
from Model.entity.User import UserDB
from Model.entity.User import User
from Model.dao.UserDAO import UserDAO
import bcrypt

def encryptPassword(password: str):
    hashPassword = password.encode()
    sal = bcrypt.gensalt()
    password = bcrypt.hashpw(hashPassword, sal).decode('utf-8') #decode to convert the encrypted password into a str
    return password

async def register(newUser: UserDB = Depends()):
    conn = UserDAO()
    if conn.getUserAuth(newUser.email) is None:
        newUser.password = encryptPassword(newUser.password)
        conn.addUser(newUser)
        raise HTTPException(status_code=status.HTTP_201_CREATED, detail="Usuario creado")
    
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="cuenta ya existente")


async def update(idUser: int, updatedUser: User = Depends()):
    conn = UserDAO()
    if(conn.getUserAuth(updatedUser.email) is None):
        conn.updateUser(idUser, updatedUser)
        raise HTTPException(status_code=status.HTTP_200_OK, detail="cuenta actualizada")
    else:
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="email ya existente")

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