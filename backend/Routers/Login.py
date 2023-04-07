from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta


SECRET_KEY  = '40sasldkjwd2123bvquweo0pimsañpoqweim' 
ALGORITHM = "HS256"
ACCES_TOKEN_DURATION = 800

router = APIRouter() #fastAPI instance

oauth2 = OAuth2PasswordBearer(tokenUrl="login") #OAuth protocol instance
crypt = CryptContext(schemes=["bcrypt"])



class User(BaseModel): #user to show
    username: str
    email: str

class UserDB(User): #user to search in db
    password: str

#test case
users_test = {
    "Juan":{
        "username": "Juan",
        "email": "juanlazorra69@gmail.com",
        "password": "$2a$12$EQ16dkf4gW59qC5Cx35jyeI3R/5Z0hc/jRmnOvELju9tEvBtWP9BK"
    },

    "Abuelo":{
        "username": "abuelo",
        "email": "abuelo11@gmail.com",
        "password": "$2a$12$PUaivrGMmSMPPzAE3sABcOgAPcikheRkemxWYZH94W3j2iNxDxUS."
    },

    "Hotkins": {
        "username": "Hotkins",
        "email": "gohanHotkins@gmail.com",
        "password": "$2a$12$9MT2pFxiG2Rf2Z5ftDjGZuJ9ISIFrYonB6q5bF/XR/.2rcXZD6Nii"
    }
}

def search_user(username: str): #search user in db
    if username in users_test:
        return User(**users_test[username]) #** para el numero de parametros variable

def search_userDB(username: str): #search user in db
    if username in users_test:
        return UserDB(**users_test[username]) #** para el numero de parametros variable

async def auth_user(token: str = Depends(oauth2)): #check token auth
    exception = HTTPException(
                    status_code = status.HTTP_401_UNAUTHORIZED, 
                    detail="Credenciales de autenticación inválidas", 
                    headers={"WWW-Authenticate": "Bearer"}
                )
    try:
        username = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]).get("sub")
        if username is None:
            raise exception
        
    except JWTError:
        raise exception

    return search_user(username)
    



@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()): 
    user_db = users_test.get(form.username) #search user in public information
    if not user_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Usuario no encontrado")
    
    user = search_userDB(form.username)   #search user in db
    

    if not crypt.verify(form.password, user.password):  #check password
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Contraseña incorrecta")

    #acces token sent when login
    access_token = {
        "sub": user.username,
        "exp": datetime.utcnow() + timedelta(minutes=ACCES_TOKEN_DURATION)
    }

    return {"access_token": jwt.encode(access_token, SECRET_KEY , algorithm=ALGORITHM), "token_type": "bearer"} #acces token encryption


@router.get("/profile")
async def Profile(user: User = Depends(auth_user)): #return profile info
    return user

