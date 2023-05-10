from Model.entity.User import UserDB
from Model.dao.DataSource import DataSource
from datetime import date

class UserDAO():
    conn = DataSource().conn


    #get all users. (Not include password)
    def getUsers(self, iduserSearching: int):
        with self.conn.cursor() as cur:
            data = cur.execute("""
                SELECT           
                    "user".iduser,
                    "user".username,
                    "user".birthdate,
                    image.src
                FROM "user"
                JOIN image ON "user".idimage = image.idimage
                where iduser != %s
            """, (iduserSearching,))
            
            return cur.fetchall()
           

    #info to show query. Return all info but password    
    def getUserShow(self, id:int):
        with self.conn.cursor() as cur:
            cur.execute("""
                SELECT 
                    "user".iduser,
                    "user".name,
                    "user".surname,
                    "user".username,
                    "user".email,
                    "user".birthdate,
                    "user".coins,
                    image.src
                
                FROM "user"
                JOIN image ON "user".idimage = image.idimage
                WHERE iduser=%s
            """, (id,))
            
            return cur.fetchone()
    
    #validation query, return only id and password
    def getUserAuth(self, email: str):
        with self.conn.cursor() as cur:
            cur.execute("""
                SELECT 
                    idUser,
                    password
                
                FROM "user"
                WHERE email=%s
            """, (email,))

            return cur.fetchone()

    def addUser(self, data: UserDB):
        with self.conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "user" (name, surname, username, email, password, birthdate, coins, idImage) 
                VALUES (%(name)s, %(surname)s, %(username)s, %(email)s, %(password)s, %(birth_date)s, %(coins)s, %(img)s)
            """, {
                'name': data.name,
                'surname': data.surname,
                'username': data.username,
                'email': data.email,
                'password': data.password,
                'birth_date': data.birthdate,
                'coins': data.coins,
                'img': data.idimage,
            })    
            self.conn.commit()


    def updateUser(self, iduser: int,  username: str, surname: str, name: str, birthdate: date):
        with self.conn.cursor() as cur:
            cur.execute("""
                UPDATE "user" SET 
                    name=%s, 
                    surname=%s, 
                    username=%s,
                    birthdate=%s
                WHERE idUser=%s
            """, (name, surname, username, birthdate, iduser))

            self.conn.commit()
    
    def updatePassword(self,iduser: int, newPassword: str):
        with self.conn.cursor() as cur:
            cur.execute("""
                UPDATE "user" SET 
                    password = %s
                WHERE idUser=%s
            """, (newPassword,iduser,))

            self.conn.commit()

    def updateCoins(self, updatedCoins:int, iduser: int):
        with self.conn.cursor() as cur:
            cur.execute("""
                UPDATE "user" SET 
                    coins = %s
                WHERE idUser=%s
            """, (updatedCoins,iduser,))

            self.conn.commit()

    def deleteUser(self, id: int):
        with self.conn.cursor() as cur:
            cur.execute("""
                DELETE FROM "user" WHERE iduser= %s
            """, (id,))
            self.conn.commit()

