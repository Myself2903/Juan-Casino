from fastapi import Depends, HTTPException, status
from Model.UserDB import UserDB
from Model.searchUser import search_userDB
from Model.users_test import users_test
import bcrypt


async def register(newUser: UserDB = Depends()):
    print(search_userDB(newUser))
    if search_userDB(newUser.email) is None:
        hashPassword = newUser.password.encode()
        sal = bcrypt.gensalt()
        newUser.password = bcrypt.hashpw(hashPassword, sal)
        users_test.append(newUser)
        return(users_test)
    
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="cuenta ya existente")

