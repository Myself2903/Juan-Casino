import psycopg2
import json

class DataSource:
    conn = None

    #connection setting
    def __init__ (self):
        try:
            self.conn = psycopg2.connect("postgres://nico:pvhiEeWAfPnjoGPhTIpCSyC3VT8cABxE@dpg-cgu1vdiut4mcfrg9vg2g-a.oregon-postgres.render.com/juancasinodb")

        except psycopg2.OperationalError as error:
            print(error)
            self.conn.close()
    

    #close connection
    def __def__(self):
        self.conn.close()