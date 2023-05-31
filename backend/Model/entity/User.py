from pydantic import BaseModel
from datetime import date
from typing import Optional

class User(BaseModel): #user to show
    iduser: Optional[int]
    username: str
    name: str
    surname: str
    email: str
    birthdate: date
    coins: Optional[int]
    verifyToken: Optional[str]
    state: Optional[int]
    idimage: Optional[str]

class UserDB(User):
    password: str

