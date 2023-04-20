from Model.dao.DataSource import DataSource
from Model.dao.UserDAO import UserDAO


class FriendsDAO():
    conn = DataSource().conn

    def getFriendsId(self, iduser: int):
        with self.conn.cursor() as cur:
            data = cur.execute("""
                select *
                from "friends"
                where iduser1 = %s or iduser2 = %s
            """, (iduser, iduser))
            
            friendList = []
           
            for i in cur.fetchall():
                print(i)
                if i[0] == iduser:
                    friendList.append((i[1], i[2]))
                else:
                    friendList.append((i[0], i[2]))
            
            return friendList
        

    def getFriends(self, iduser: int):
        userConn = UserDAO()
        friendList = self.getFriendsId(iduser)

        if len(friendList) == 0:
            print("niño, no tienes amigos")
            return None
            
        else:
            friends = []

            for i in friendList:
                friendData = userConn.getUserShow(i[0])
                friendData = {
                    'iduser': friendData['iduser'],
                    'username': friendData['username'],
                    'idimage': friendData['idimage'],
                    'accepted': i[1]
                }
                friends.append(friendData)
                
            return friends
        
    def addFriend(self, iduserRequest: int, iduserRequested):
        with self.conn.cursor() as cur:
            cur.execute("""
                insert into friends (iduser1, iduser2, accepted)
                values(%(iduser1)s, %(iduser2)s, false)
                """, {
                'iduser1': iduserRequest,
                'iduser2': iduserRequested
            })
            self.conn.commit()

    def areFriends(self, iduser1: int, iduser2: int):
        with self.conn.cursor() as cur:
            cur.execute("""
                select 
                    iduser1,
                    iduser2
                from "friends"
                where (iduser1 = %(iduser1)s and iduser2 = %(iduser2)s)  
                        or (iduser2= %(iduser1)s and iduser1 = %(iduser2)s)
                """, {
                'iduser1': iduser1,
                'iduser2': iduser2
            })

            if cur.fetchone() is None:
                return False
            else: return True

    def deleteFriend(self, iduser1: int, iduser2: int):
        with self.conn.cursor() as cur:
            cur.execute("""
                delete from friends
                where (iduser1 = %(iduser1)s and iduser2 = %(iduser2)s)  
                        or (iduser2= %(iduser1)s and iduser1 = %(iduser2)s)
            """,{
                'iduser1': iduser1,
                'iduser2': iduser2
            })
            self.conn.commit()

    def acceptFriend(self, iduser1: int, iduser2: int):
        with self.conn.cursor() as cur:
            cur.execute("""
                update friends set
                    accepted = true
                where (iduser1 = %(iduser1)s and iduser2 = %(iduser2)s)  
                        or (iduser2= %(iduser1)s and iduser1 = %(iduser2)s)
            """,{
                'iduser1': iduser1,
                'iduser2': iduser2
            })
            
            self.conn.commit()

            