from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from Model.dao.UserDAO import UserDAO
import secrets

SECRET_KEY  = '40sasldkjwd2123bvquweo0pimsañpoqweim' 
ALGORITHM = "HS256"
ACCES_TOKEN_DURATION = 10
VERIFY_TOKEN_DURATION = 30

oauth2 = OAuth2PasswordBearer(tokenUrl="login") #OAuth protocol instance
crypt = CryptContext(schemes=["bcrypt"])
        
async def auth_user(token: str = Depends(oauth2)): #check token auth
    exception = HTTPException(
                    status_code = status.HTTP_401_UNAUTHORIZED, 
                    detail="Credenciales de autenticación inválidas", 
                    headers={"WWW-Authenticate": "Bearer"}
                )
    try:
        id = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]).get("id")
        if id is None:
            raise exception
        
    except JWTError:
        raise exception

    conn = UserDAO()
    return conn.getUserShow(id)


async def verifyLogin(form: OAuth2PasswordRequestForm = Depends()):
        conn = UserDAO()
        user = conn.getUserAuth(form.username) #search email in data base. username is convention from OAuth library

        #User not found
        if not user or user[2] == 1:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
        
        #check password
        if not crypt.verify(form.password, user[1]):   #query return two values touple. [1] is the password 
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Contraseña incorrecta")
            
        #acces token sent when login
        access_token = {
            "id": user[0],
            "password": user[1],
            "exp": datetime.utcnow() + timedelta(days=ACCES_TOKEN_DURATION)
        }

        return {"access_token": jwt.encode(access_token, SECRET_KEY , algorithm=ALGORITHM), "token_type": "bearer"} #acces token encryption


async def verifyUser(token: dict = Depends()):
    exception = HTTPException(
                    status_code = status.HTTP_401_UNAUTHORIZED, 
                    detail="Credenciales de autenticación inválidas", 
                    headers={"WWW-Authenticate": "Bearer"}
                )
    
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        if data is None:
            raise exception
       
    except JWTError:
        raise exception

    conn = UserDAO()
    conn.activateUser(data["id"])
    raise HTTPException(status_code=status.HTTP_202_ACCEPTED, detail="usuario validado")

def genVerifyToken(iduser:int ):
     token = {
          "id": iduser,
          "verifyToken": secrets.token_hex(16),
          "exp": datetime.utcnow()+ timedelta(minutes=VERIFY_TOKEN_DURATION)
     }

     return jwt.encode(token, SECRET_KEY , algorithm=ALGORITHM)