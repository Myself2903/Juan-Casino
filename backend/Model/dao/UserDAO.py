from Model.entity.User import UserDB
from Model.dao.DataSource import DataSource

class UserDAO():
    conn = DataSource().conn


    #get all users. (Not include password)
    def getUsers(self):
        with self.conn.cursor() as cur:
            data = cur.execute("""
                SELECT           
                    iduser,
                    username,
                    birthdate,
                    idimage
                FROM "user";
            """)
            
            columns = [desc[0] for desc in cur.description]  # obtiene los nombres de las columnas
            return [dict(zip(columns, row)) for row in cur.fetchall()]  # convierte las tuplas en diccionarios
           

    #info to show query. Return all info but password    
    def getUserShow(self, id:int):
        with self.conn.cursor() as cur:
            cur.execute("""
                SELECT 
                    iduser,
                    name,
                    surname,
                    username,
                    email,
                    birthdate,
                    coins,
                    idimage
                
                FROM "user"
                WHERE iduser=%s;
            """, (id,))

            data = cur.fetchone()
            
            if data:
                columns = [desc[0] for desc in cur.description]
                return dict(zip(columns, data))
            else:
                return None
    
    #validation query, return only id and password
    def getUserAuth(self, email: str):
        with self.conn.cursor() as cur:
            cur.execute("""
                SELECT 
                    idUser,
                    password
                
                FROM "user"
                WHERE email=%s;
            """, (email,))

            data = cur.fetchone()

            if data is not None:
                data = {
                    'iduser': data[0],
                    'password': data[1]
                }
            return data

    def addUser(self, data: UserDB):
        print(data.password)
        with self.conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "user" (name, surname, username, email, password, birthdate, coins, idImage) 
                VALUES (%(name)s, %(surname)s, %(username)s, %(email)s, %(password)s, %(birth_date)s, %(coins)s, %(img)s);
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


    def updateUser(self, iduser: int, data: UserDB):
        with self.conn.cursor() as cur:
            cur.execute("""
                UPDATE "user" SET 
                    name=%(name)s, 
                    surname=%(surname)s, 
                    username=%(username)s, 
                    email=%(email)s, 
                    birthdate=%(birthdate)s, 
                    idImage=%(img)s

                WHERE idUser=%(id)s
            """, {
                'name': data.name,
                'surname': data.surname,
                'username': data.username,
                'email': data.email,
                'birthdate': data.birthdate,
                'img': data.idimage,
                'id': iduser,
            })

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

