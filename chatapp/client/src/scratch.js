import psycopg2

try:
conn = psycopg2.connect(
    host = "127.0.0.1",
    port = 5432,
    dbname = "ChatApp",
    user = "postgres",
    password = "Andy"
)
print("Database connected successfully!")

    # Execute a dummy query to test the connection
cur = conn.cursor()
cur.execute("SELECT version();")
db_version = cur.fetchone()
print(f"PostgreSQL database version: {db_version[0]}")

except Exception as e:
print(f"Error connecting to database: {e}")
finally:
    # Close the connection
if conn:
    conn.close()
print("Database connection closed.")