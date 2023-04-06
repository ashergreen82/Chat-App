
# This code can be used to check for inactive users after an hour and log them out.
# pip install flask-socketio python-socketio[client]
from flask_socketio import SocketIO, emit, background_tasks


def check_inactive_users():
    while True:
        print("Checking for inactive users...")

        # Open a connection to the database
        conn, cur = open_database_connection()

        # Select all users whose last_active_at value is more than an hour ago
        cur.execute(
            "SELECT id, username FROM users WHERE last_active_at < NOW() - INTERVAL '1 hour'")
        inactive_users = cur.fetchall()

        # Close the database connection
        close_database_connection(conn, cur)

        for user in inactive_users:
            user_id, username = user
            print(f"Logging out inactive user: {username}")

            # Log out the user by setting their last_active_at value to null
            conn, cur = open_database_connection()
            cur.execute(
                "UPDATE users SET last_active_at = null WHERE id = %s", (user_id,))
            conn.commit()
            close_database_connection(conn, cur)

        # Wait for an hour before running the check again
        socketio.sleep(3600)


if __name__ == '__main__':
    socketio.start_background_task(check_inactive_users)
    socketio.run(app, allow_unsafe_werkzeug=True, debug=True)
