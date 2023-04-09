from datetime import datetime
from Model.UserDB import UserDB 


#test case
users_test = [

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
]

users = [
    {
        "username": "JuanTheFox",
        "name": "Juan",
        "surname": "Quintero",
        "email": "juanlazorra69@gmail.com",
        "birth_date": datetime(year=2002, month=9, day=23),
        "coins": 69,
        "password": "$2a$12$EQ16dkf4gW59qC5Cx35jyeI3R/5Z0hc/jRmnOvELju9tEvBtWP9BK"
    },

    {
        "username": "abuelo",
        "name": "Daniel",
        "surname": "Rodriguez",
        "email": "abuelo11@gmail.com",
        "birth_date": datetime(year=2003, month=1, day=11),
        "coins": 13,
        "password": "$2a$12$PUaivrGMmSMPPzAE3sABcOgAPcikheRkemxWYZH94W3j2iNxDxUS."
    },

    {
        "username": "Hotkins",
        "name": "Gohan",
        "surname": "Hotkins",
        "email": "gohanHotkins@gmail.com",
        "birth_date": datetime(year=2003, month=10, day=20),
        "coins": 0,
        "password": "$2a$12$9MT2pFxiG2Rf2Z5ftDjGZuJ9ISIFrYonB6q5bF/XR/.2rcXZD6Nii"
    }
]