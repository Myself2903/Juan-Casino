from fastapi import HTTPException, status
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi.templating import Jinja2Templates
from Model.entity.User import UserDB
from Model.dao.UserDAO import UserDAO
from Model.dao.ImageDAO import ImageDAO
from Model.dao.FriendsDAO import FriendsDAO
from dateutil.relativedelta import relativedelta
from datetime import date
from dotenv import load_dotenv
import os
from Model.Auth import genVerifyToken
import bcrypt


def encryptPassword(password: str):
    hashPassword = password.encode()
    sal = bcrypt.gensalt()
    password = bcrypt.hashpw(hashPassword, sal).decode('utf-8') #decode to convert the encrypted password into a str
    return password

async def register(newUser: UserDB):
    conn = UserDAO()
    if conn.getUserAuth(newUser.email) is None:
        edad = relativedelta(date.today(), newUser.birthdate).years
        if edad >= 10 and edad <= 80:
            newUser.password = encryptPassword(newUser.password)
            return conn.addUser(newUser)
            
        else:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="no cumple los requisitos minimos de edad")
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="cuenta ya existente")

async def send_email(request, user: UserDB):
    load_dotenv()
    templates = Jinja2Templates(directory="templates")
    token = genVerifyToken(user.iduser)
    conn = UserDAO()
    conn.updateVerifyToken(user.iduser, token)
    conf = ConnectionConfig(
        MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
        MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
        MAIL_FROM=os.getenv('MAIL_FROM'),
        MAIL_PORT=os.getenv('MAIL_PORT'),
        MAIL_SERVER=os.getenv('MAIL_SERVER'),
        MAIL_FROM_NAME=os.getenv('MAIL_FROM_NAME'),
        MAIL_STARTTLS=True,
        MAIL_SSL_TLS=False,
        USE_CREDENTIALS=True,
        VALIDATE_CERTS=True
    )

    URL = os.getenv('FRONTEND_URL')
    html = templates.TemplateResponse("verifyAccount.html" , 
        {
            "request": request,
            'title': 'Verifica tu cuenta',
            'name': user.name,
            "url": f'{URL}/register/verifyAccount?token={token}'
        }
    )

    message = MessageSchema(
        subject='Correo de verificación',
        recipients=[user.email],
        body=html.body,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)

    return token

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
        oldImage = userConn.getUserImage(idUser)
        id_image = oldImage[0]

        if oldImage[0] == 1:
            if urlImage != oldImage[1]:
                id_image = await uploadProfileImage(idUser, urlImage)
        else:
            imageConn.updateImage(oldImage[0], urlImage)
        
        userConn.updateUser(idUser,username, surname, name ,birthdate, id_image)
        raise HTTPException(status_code=status.HTTP_200_OK, detail="cuenta actualizada")
    
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="no cumple los requisitos minimos de edad")

async def uploadProfileImage(iduser:int, url: str):
    imageConn = ImageDAO()
    if(url != ""):
        id_image = imageConn.uploadImage(iduser, url)
        return id_image

    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="url vacía")     

async def delete(idUser: int):
    userConn = UserDAO()
    friendsConn = FriendsDAO()
    imageConn = ImageDAO()
    if(userConn.getUserShow(idUser) is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="usuario inexistente")
    else:
        user_image = userConn.getUserImage(idUser)
        friendsConn.deleteFriends(idUser)
        userConn.deleteUser(idUser)
        
        if(user_image[0] != 1):
            imageConn.deleteImage(user_image[0])

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

async def updateCoins(bet: int, reward:int, currentCoins:int, iduser: int):
    conn = UserDAO()
    if(type(bet) == int and type(reward) == int):
        coinsLeft = currentCoins-bet
        if(coinsLeft < 0):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= "monedas insuficiente")
        else:
            conn.updateCoins(coinsLeft+reward, iduser)
        raise HTTPException(status_code=status.HTTP_200_OK, detail="monedas actualizadas")
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail= "monto invalido")