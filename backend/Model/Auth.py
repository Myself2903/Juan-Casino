from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from Model.dao.UserDAO import UserDAO
from Model.dao.ImageDAO import ImageDAO

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
        id = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]).get("id")
        if id is None:
            raise exception
        
    except JWTError:
        raise exception

    conn = UserDAO()
    data = conn.getUserShow(id)
    data['idimage'] = ImageDAO().getImageSource(data['idimage'])
    return data


async def verifyLogin(form: OAuth2PasswordRequestForm = Depends()):
        conn = UserDAO()
        user = conn.getUserAuth(form.username) #search email in data base. username is convention from OAuth library

        #User not found
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
        
        #check password
        if not crypt.verify(form.password, user['password']):   #query return two values touple. [1] is the password 
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Contraseña incorrecta")
            
        #acces token sent when login
        access_token = {
            "id": user['iduser'],
            "email": user['password'],
            "exp": datetime.utcnow() + timedelta(minutes=ACCES_TOKEN_DURATION)
        }

        return {"access_token": jwt.encode(access_token, SECRET_KEY , algorithm=ALGORITHM), "token_type": "bearer"} #acces token encryption

