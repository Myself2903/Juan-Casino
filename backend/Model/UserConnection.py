import psycopg2
from Model.UserDB import UserDB

class UserConnection():
    conn = None

    #conection setting
    def __init__(self):
        try:
            self.conn = psycopg2.connect("dbname=Juan_Casino user=nico password=myself2903 host=localhost port=5432")

        except psycopg2.OperationalError as error:
            print(error)
            self.conn.close()
    

    #get all users. (Not include password)
    def getUsers(self):
        with self.conn.cursor() as cur:
            data = cur.execute("""
                SELECT           
                    idUser,
                    name,
                    surname,
                    username,
                    email,
                    birthdate,
                    coins,
                    idImage
                FROM "User";
            """)

            return cur.fetchall()
        

    #info to show query. Return all info but password    
    def getUserShow(self, id:int):
        with self.conn.cursor() as cur:
            data = cur.execute("""
                SELECT 
                    idUser,
                    name,
                    surname,
                    username,
                    birthdate,
                    coins,
                    idImage
                
                FROM "User"
                WHERE idUser=%s;
            """, (id,))
            return cur.fetchone()
    
    #validation query, return only id and password
    def getUserAuth(self, email: str):
        with self.conn.cursor() as cur:
            data = cur.execute("""
                SELECT 
                    idUser,
                    password
                
                FROM "User"
                WHERE email=%s;
            """, (email,))
            return cur.fetchone()

    def addUser(self, data: UserDB):
        print(data.password)
        with self.conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "User" (name, surname, username, email, password, birthdate, coins, idImage) 
                VALUES (%(name)s, %(surname)s, %(username)s, %(email)s, %(password)s, %(birth_date)s, %(coins)s, %(img)s);
            """, {
                'name': data.name,
                'surname': data.surname,
                'username': data.username,
                'email': data.email,
                'password': data.password,
                'birth_date': data.birth_date,
                'coins': data.coins,
                'img': data.img,
            })    
            self.conn.commit()

    def updateUser(self, data):
        with self.conn.cursor() as cur:
            cur.execute("""
                UPDATE "User" SET 
                    name=%(name)s, 
                    surname=%(surname)s, 
                    username=%(username)s, 
                    email=%(email)s, 
                    password=%(password)s, 
                    birthdate=%(birthdate)s, 
                    coins=%(coins)s,
                    idImage=%(img)s

                WHERE userId=%(id)s
            """, data)
            self.conn.commit()
    
    def deleteUser(self, id):
        with self.conn.cursor() as cur:
            cur.execute("""
                DELETE FROM "User" WHERE userId= %s
            """, (id,))
            self.conn.commit()

    def __def__(self):
        self.conn.close()