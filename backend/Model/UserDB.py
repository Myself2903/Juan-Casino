from Model.User import User
from datetime import datetime

class UserDB(User): #user to search in db
    password: str

    # def __init__(self, username: str, name: str, surname: str, email: str, birth_date: datetime, coins: int, password: str):
    #     super().__init__(username=username, name=name, surname=surname, email=email, birth_date=birth_date, coins=coins)
    #     self.password = password