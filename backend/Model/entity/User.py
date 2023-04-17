from pydantic import BaseModel
from datetime import date
from typing import Optional

class User(BaseModel): #user to show
    id: Optional[int]
    username: str
    name: str
    surname: str
    email: str
    birth_date: date
    coins: int
    img: Optional[str]
    password: str

