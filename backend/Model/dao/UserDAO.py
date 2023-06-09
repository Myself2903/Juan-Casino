from Model.entity.User import UserDB
from Model.dao.DataSource import DataSource
from datetime import date

class UserDAO():
    conn = DataSource().conn

    #get all users. (Not include password)
    def getUsers(self, iduserSearching: int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    SELECT           
                        "user".iduser,
                        "user".username,
                        "user".birthdate,
                        image.src
                    FROM "user"
                    JOIN image ON "user".idimage = image.idimage
                    where iduser != %s and idstate != 1
                """, (iduserSearching,))
                
                return cur.fetchall()
            
        except Exception as err:
            print(err)
           

    #info to show query. Return all info but password    
    def getUserShow(self, id:int):
        try:
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
                    where iduser = %s and idstate != 1
                """, (id,))
                
                return cur.fetchone()
            
        except Exception as err:
            print(err)
    
    def getUserImage(self, iduser:int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    SELECT 
                        image.idimage,
                        image.src                
                    FROM "user"
                    JOIN image ON "user".idimage = image.idimage
                    WHERE iduser=%s
                """, (iduser,))
                
                return cur.fetchone()
            
        except Exception as err:
            print(err)

    #validation query, return only id and password
    def getUserAuth(self, email: str):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    SELECT 
                        idUser,
                        password,
                        idstate
                    FROM "user"
                    WHERE email=%s
                """, (email,))

                return cur.fetchone()
            
        except Exception as err:
            print(err)

    def addUser(self, data: UserDB):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO "user" (name, surname, username, email, password, birthdate, coins, idImage, verifyToken, idstate) 
                    VALUES (%(name)s, %(surname)s, %(username)s, %(email)s, %(password)s, %(birth_date)s, %(coins)s, %(img)s, %(verifyToken)s, %(state)s)
                    RETURNING iduser
                """, {
                    'name': data.name,
                    'surname': data.surname,
                    'username': data.username,
                    'email': data.email,
                    'password': data.password,
                    'birth_date': data.birthdate,
                    'coins': data.coins,
                    'verifyToken': data.verifyToken,
                    'state': data.state,
                    'img': data.idimage,
                })    

                user_id = cur.fetchone()
                self.conn.commit()
                return user_id[0]

        except Exception as err:
            print(err)

    def updateVerifyToken(self, iduser:int, token: str):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    UPDATE "user" SET
                        verifyToken=%s
                    where iduser=%s
                """,(token, iduser))

                self.conn.commit()

        except Exception as err:
            print(err)

    def updateUser(self, iduser: int,  username: str, surname: str, name: str, birthdate: date, idimage:int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    UPDATE "user" SET 
                        name=%s, 
                        surname=%s, 
                        username=%s,
                        birthdate=%s,
                        idimage = %s
                    WHERE idUser=%s
                """, (name, surname, username, birthdate, idimage,iduser))

                self.conn.commit()
        except Exception as err:
            print(err)
    
    def updatePassword(self,iduser: int, newPassword: str):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    UPDATE "user" SET 
                        password = %s
                    WHERE idUser=%s
                """, (newPassword,iduser,))

                self.conn.commit()
        except Exception as err:
            print(err)


    def getCoins(self, iduser:int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    Select coins
                    from "user"
                    where iduser = %s
                """, (iduser,))
                return cur.fetchone()
        except Exception as err:
            print(err)


    def updateCoins(self, updatedCoins:int, iduser: int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    UPDATE "user" SET 
                        coins = %s
                    WHERE idUser=%s
                """, (updatedCoins,iduser,))

                self.conn.commit()
        except Exception as err:
            print(err)

    def deleteUser(self, id: int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    DELETE FROM "user" WHERE iduser= %s
                """, (id,))
                self.conn.commit()
                
        except Exception as err:
            print(err)

    def activateUser(self, id:int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    UPDATE "user" SET idstate = 2
                    WHERE idUser = %s
                """, (id,))
                self.conn.commit()

        except Exception as err:
            print(err)