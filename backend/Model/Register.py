from fastapi import Depends, HTTPException, status
from Model.UserDB import UserDB
from Model.UserConnection import UserConnection
import bcrypt


async def register(newUser: UserDB = Depends()):
    conn = UserConnection()

    if conn.getUserAuth(newUser.email) is None:
        hashPassword = newUser.password.encode()
        sal = bcrypt.gensalt()
        newUser.password = bcrypt.hashpw(hashPassword, sal).decode('utf-8') #.decode to convert the encrypted password into a str
        conn.addUser(newUser)
        raise HTTPException(status_code=status.HTTP_201_CREATED, detail="Usuario creado")
    
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="cuenta ya existente")

