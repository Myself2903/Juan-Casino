from datetime import datetime
from Model.UserDB import UserDB 
from Model.UserConnection import UserConnection
from Model.User import User


def getUsers():
    users = []
    conn = UserConnection()
    for data in conn.getUsers():
        users.append(
            User(
                id= data[0],
                name= data[1],
                surname= data[2],
                username= data[3],
                email= data[4],
                birth_date = datetime.strptime(str(data[5]), '%Y-%m-%d'), 
                coins= data[6],
                img= data[7]
            )
        )
    return users

#test case
users_test = getUsers()
""" users_test = [

    UserDB(
        username="JuanTheFox",
        name="Juan",
        surname="Quintero",
        email="juanlazorra69@gmail.com",
        birth_date=datetime(year=2002, month=9, day=23), 
        coins=int(69),
        password="$2a$12$EQ16dkf4gW59qC5Cx35jyeI3R/5Z0hc/jRmnOvELju9tEvBtWP9BK") ,
        
    UserDB(username="abuelo",
           name="Daniel",
           surname="Rodriguez",
           email="abuelo11@gmail.com",
           birth_date=datetime(year=2003, month=1, day=11),
           coins=13,
           password="$2a$12$PUaivrGMmSMPPzAE3sABcOgAPcikheRkemxWYZH94W3j2iNxDxUS."),

    UserDB(
        username="Hotkins",
        name="Gohan",
        surname="Hotkins",
        email="gohanHotkins@gmail.com",
        birth_date=datetime(year=2003, month=10, day=20),
        coins=0,
        password="$2a$12$9MT2pFxiG2Rf2Z5ftDjGZuJ9ISIFrYonB6q5bF/XR/.2rcXZD6Nii"        
    )
] """
