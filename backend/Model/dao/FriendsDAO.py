from Model.dao.DataSource import DataSource
from Model.dao.UserDAO import UserDAO


class FriendsDAO():
    conn = DataSource().conn

    def getFriendsId(self, iduser: int):
        with self.conn.cursor() as cur:
            data = cur.execute("""
                select 
                    iduser1,
                    iduser2
                from "friends"
                where iduser1 = %s or iduser2 = %s
            """, (iduser, iduser))
            
            friendList = []
           
            for i in cur.fetchall():
                if i[0] == iduser:
                    friendList.append(i[1])
                else:
                    friendList.append(i[0])
            
            return friendList
        
    def getFriends(self, iduser: int):
        userConn = UserDAO()
        friendList = self.getFriendsId(iduser)

        if len(friendList) == 0:
            print("niño, no tienes amigos")
            return None
            
        else:
            friends = []
            friendData = {}
            for i in friendList:
                friendData = userConn.getUserShow(i)
                friendData = {
                    'iduser': friendData['iduser'],
                    'username': friendData['username'],
                    'idimage': friendData['idimage']
                }
                friends.append(friendData)
                
            return friendData
        
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



            