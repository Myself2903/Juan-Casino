import psycopg2
from dotenv import dotenv_values

class DataSource:
    conn = None

    #connection setting
    def __init__ (self):
        try:
            env_vars = dotenv_values(".env")
            URL = env_vars.get('DB_CONNECTION')
            self.conn = psycopg2.connect(URL)
           
        except psycopg2.OperationalError as error:
            print(error)
            self.conn.close()
    

    #close connection
    def __def__(self):
        if self.conn is not None:
            self.conn.close()