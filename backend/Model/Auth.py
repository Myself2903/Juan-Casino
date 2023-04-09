from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from Model.searchUser import *

SECRET_KEY  = '40sasldkjwd2123bvquweo0pimsañpoqweim' 
ALGORITHM = "HS256"
ACCES_TOKEN_DURATION = 800

oauth2 = OAuth2PasswordBearer(tokenUrl="login") #OAuth protocol instance
crypt = CryptContext(schemes=["bcrypt"])
        
async def auth_user(token: str = Depends(oauth2)): #check token auth
    exception = HTTPException(
                    status_code = status.HTTP_401_UNAUTHORIZED, 
                    detail="Credenciales de autenticación inválidas", 
                    headers={"WWW-Authenticate": "Bearer"}
                )
    try:
        email = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]).get("email")
        if email is None:
            raise exception
        
    except JWTError:
        raise exception

    return search_user(email)


async def verifyLogin(form: OAuth2PasswordRequestForm = Depends()):
        user_db = search_user(form.username) #search user in public information
        if not user_db:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
            

        user = search_userDB(form.username)   #search user in db
        

        if not crypt.verify(form.password, user.password):  #check password
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Contraseña incorrecta")
            
        #acces token sent when login
        access_token = {
            "sub": user.username,
            "email": user.email,
            "exp": datetime.utcnow() + timedelta(minutes=ACCES_TOKEN_DURATION)
        }

        return {"access_token": jwt.encode(access_token, SECRET_KEY , algorithm=ALGORITHM), "token_type": "bearer"} #acces token encryption

