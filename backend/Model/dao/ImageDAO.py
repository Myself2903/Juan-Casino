from Model.dao.DataSource import DataSource

class ImageDAO():
    conn = DataSource().conn

    def getImageSource(self, id:int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    SELECT 
                        src
                    FROM image
                    WHERE idimage=%s;
                """, (id,))
                return cur.fetchone()[0]
            
        except Exception as err:
            print(err)

    def uploadImage(self, iduser: int, url: str):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO image (src, description)
                    VALUES (%(src)s, %(description)s)
                    RETURNING idimage
                """, {"src": url, "description": f'imagen de perfil del usuario {iduser}'})
                
                image_id = cur.fetchone()
                self.conn.commit()                
                return image_id 

        except Exception as err:
            print(err)

    def updateImage(self, idimage, src):
        try:
            #update "user" set idimage = 1 where iduser = 3
            with self.conn.cursor() as cur:
                cur.execute("""
                    UPDATE image SET
                        src = %s
                    WHERE idimage = %s
                """, (src, idimage,))

                self.conn.commit()                
        except Exception as err:
            print(err)


    def deleteImage(self, idImage: int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    DELETE FROM image 
                    where idimage = %s
                """, (idImage,))
            
                self.conn.commit()                
            
        except Exception as err:
            print(err)