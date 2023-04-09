from pydantic import BaseModel
from datetime import datetime

class User(BaseModel): #user to show
    username: str
    name: str
    surname: str
    email: str
    birth_date: datetime
    coins: int

    # def __init__(self, username: str, name: str, surname: str, email: str, birth_date: datetime, coins: int):
    #     self.username = username
    #     self.name = name
    #     self.surname = surname
    #     self.email = email
    #     self.birth_date = birth_date
    #     self.coins = coins

