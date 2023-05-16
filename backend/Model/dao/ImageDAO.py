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