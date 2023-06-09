from Model.dao.DataSource import DataSource

class FriendsDAO():
    conn = DataSource().conn

    def getFriends(self, iduser: int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    select 
                        "user".iduser,
                        "user".username,
                        "user".birthdate,
                        image.src
                    from "user"
                    join (	select 
                                case
                                    when iduser1 = %(id)s
                                        then iduser2
                                    when iduser2 = %(id)s
                                        then iduser1
                                end as iduser
                            from friends
                            where (iduser1 = %(id)s or iduser2 =%(id)s)
                            and accepted
                        ) as friends on "user".iduser = friends.iduser
                    join image on "user".idimage = image.idimage
                """, {'id': iduser})
                
                return cur.fetchall()
        except Exception as err:
            print(err)
    
    def getPendingFriends(self, iduser:int, userPerspective: int):
        try:
            with self.conn.cursor() as cur:
                returnedUser = 2 if userPerspective == 1 else 1
                
                cur.execute("""
                    select 
                        "user".iduser,
                        "user".username,
                        "user".birthdate,
                        image.src
                    from "user"
                    join (	select 
                                iduser%(returnedUser)s as iduser
                                
                            from friends
                            where iduser%(userPerspective)s = %(id)s
                            and not accepted
                        ) as friends on "user".iduser = friends.iduser
                    join image on "user".idimage = image.idimage
                """, {'id': iduser, "userPerspective": userPerspective, "returnedUser": returnedUser})
                
                return cur.fetchall()
        except Exception as err:
            print(err)
        
    def addFriend(self, iduserRequest: int, iduserRequested):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    insert into friends (iduser1, iduser2, accepted)
                    values(%(iduser1)s, %(iduser2)s, false)
                    """, {
                    'iduser1': iduserRequest,
                    'iduser2': iduserRequested
                })
                self.conn.commit()
        except Exception as err:
            print(err)

    def areFriends(self, iduser1: int, iduser2: int):
        try:
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

        except Exception as err:
            print(err)

    def deleteFriend(self, iduser1: int, iduser2: int):
        try:
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
        
        except Exception as err:
            print(err)

    def deleteFriends(self, iduser):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    delete from friends
                    where iduser1 = %(iduser)s or iduser2 = %(iduser)s
                """,{
                    'iduser': iduser,
                })
                self.conn.commit()


        except Exception as err:
            print(err)

    def acceptFriend(self, iduser1: int, iduser2: int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    update friends set
                        accepted = true
                    where iduser1 = %(iduser1)s and iduser2 = %(iduser2)s  
                """,{
                    'iduser1': iduser1,
                    'iduser2': iduser2
                })
                
                self.conn.commit()
                
        except Exception as err:
            print(err)