import psycopg2

class DataSource:
    conn = None

    #connection setting
    def __init__ (self):
        try:
            #on line
            self.conn = psycopg2.connect("postgres://nico:pvhiEeWAfPnjoGPhTIpCSyC3VT8cABxE@dpg-cgu1vdiut4mcfrg9vg2g-a/juancasinodb")
            #on test
            # self.conn = psycopg2.connect("postgres://nico:pvhiEeWAfPnjoGPhTIpCSyC3VT8cABxE@dpg-cgu1vdiut4mcfrg9vg2g-a.oregon-postgres.render.com/juancasinodb") 

        except psycopg2.OperationalError as error:
            print(err)
            self.conn.close()
    

    #close connection
    def __def__(self):
        if self.conn is not None:
            self.conn.close()