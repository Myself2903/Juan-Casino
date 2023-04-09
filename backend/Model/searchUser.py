from Model.users_test import users_test
from Model.User import User

def search_user(email: str): #search user
    for user in users_test:
        if email == user.email:
            return User(
                username= user.username,
                name= user.name,
                surname= user.surname,
                email= user.email,
                birth_date= user.birth_date,
                coins= user.coins                
            ) #** for variable params number

def search_userDB(email: str): #search user in db
    for user in users_test:
        if email == user.email:
            return user