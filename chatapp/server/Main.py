import psycopg2
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from datetime import datetime, timedelta
from flask_socketio import SocketIO, emit
from dotenv import load_dotenv, dotenv_values
import os
import jwt
from functools import wraps
from flask import make_response
import json

config = dotenv_values(".env")

def open_database_connection():
    try:
        # conn = psycopg2.connect(
        #     host="127.0.0.1",
        #     port=5432,
        #     dbname="ChatApp",
        #     user="postgres",
        #     password="Andy"
        # )
        conn = psycopg2.connect(
            host="otto.db.elephantsql.com",
            port=5432,
            dbname="dqbrbpdn",
            user="dqbrbpdn",
            password=config["CHAT_APP_PASSWORD"]
        )
        print("Database connected successfully!")

        # Execute a dummy query to test the connection
        cur = conn.cursor()
        cur.execute("SELECT version();")
        db_version = cur.fetchone()
        print(f"PostgreSQL database version: {db_version[0]}")
        return conn, cur

    except Exception as e:
        print(f"Error connecting to database: {e}")


def close_database_connection(conn, cur):
    cur.close()
    conn.close()
    print("Database connection closed.")

# Initialize Flask
app = Flask(__name__)
api = Api(app)
CORS(app)

# Initialize socket IO connection
socketio = SocketIO(app, cors_allowed_origins="*")
connected_users=[]

# Event handlers for connection disoconnection
@socketio.on('connect')
def handle_connect():
    print('Client connected:', request.sid)

SECRET_KEY = config["SECRET_KEY"]
def create_jwt_token(username):
    payload = {
        "username": username,
        "exp": datetime.utcnow() + timedelta(minutes=30),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return make_response(jsonify({"message": "Token is missing!"}), 403)
            print("Token Missing")
        try:
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            print("Token Processed")
        except Exception as e:
            return make_response(jsonify({"message": "Token is invalid!"}), 403)
            print("Token is invalid")
        return f(*args, **kwargs)

    return decorated

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected:', request.sid)

# Fetch active user routine
def fetch_active_users():
    # Open a connection to the database
    conn, cur = open_database_connection()

    # Execute a SELECT statement to retrieve active users from the database
    cur.execute(
        "SELECT * FROM users WHERE last_active_at > NOW() - INTERVAL '1 hour'")
    active_users = cur.fetchall()

    # Close the database connection
    close_database_connection(conn, cur)

    # Convert the results to a list of dictionaries
    active_users_list = []
    for user in active_users:
        user_dict = {
            'id': user[0],
            'username': user[1],
            'password': user[2],
            'created_on': user[3].strftime('%Y-%m-%d %H:%M:%S'),
            'last_active_at': user[4].strftime('%Y-%m-%d %H:%M:%S')
        }
        active_users_list.append(user_dict)

    return active_users_list

# User login process
@app.route('/login', methods=['POST'])
def login():
    # get the username and password from the request
    user = None
    data = request.json
    username = data.get('username')
    password = data.get('password')
    user_verified = False
    if username != "Guest":
        # find the user with the matching username and password
        # Open a connection to the database
        conn, cur = open_database_connection()

        # Execute a SELECT statement to retrieve the user with the matching username and password
        cur.execute(
            "SELECT * FROM users WHERE username = %s AND password = %s", (username, password))

        # Fetch the results and store them in a variable
        user = cur.fetchone()

        # Close the database connection
        close_database_connection(conn, cur)

    # Check if a user was found with the matching username and password
    if user is not None and username != "Guest":
        # Update the last_active_at value for the user in the database
        conn, cur = open_database_connection()
        cur.execute(
            "UPDATE users SET last_active_at = NOW() WHERE id = %s", (user[0],))
        conn.commit()
        close_database_connection(conn, cur)
        user_name = user[1]
        user_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Get list of updated users currently logged in
        active_users_list = fetch_active_users()

        # Emit the entire list of connected users to the clients
        socketio.emit('user_update', active_users_list)
        token = create_jwt_token(user_name)

        return jsonify({'token': token})
    elif username == "Guest":
        token = create_jwt_token(username)
        return jsonify({'token': token})
    # if no user was found, return an error message
    else:
        return jsonify({'message': 'Invalid username or password'})

# Creates a new user
@app.route('/register', methods=['POST'])
def register():
    # get the new user information from the request
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Open a connection to the database
    conn, cur = open_database_connection()

    # check if the username is already taken
    cur.execute("SELECT * FROM Users WHERE username = %s", (username,))
    existing_user = cur.fetchone()
    if existing_user is not None:
        # Close the database connection
        close_database_connection(conn, cur)
        return jsonify({'message': 'username already taken'})

    new_user = {
        'name': username,
        'password': password
    }
    # Insert the new user into the Users table
    cur.execute("INSERT INTO Users (username, password, date_created, last_active_at) VALUES (%s, %s, NOW(), NOW())",
                (new_user['name'], new_user['password']))
    conn.commit()
    username = new_user['name']

    # Close the database connection
    close_database_connection(conn, cur)

    # Emit the entire list of connected users to the clients
    active_users_list = fetch_active_users()
    socketio.emit('user_update', active_users_list)
    return jsonify({'message': 'registration successful'})

# Sends the list of users to the client
@app.route('/users', methods=['GET'])
@token_required
def get_users():
    # Fetch the list of current active users
    active_users_list = fetch_active_users()

    # Sends the list of active users to the client
    response = jsonify({'users': active_users_list})
    return response

@app.route('/logout', methods=['POST'])
def logout():
    # get the username from the request
    data = request.json
    username = data.get('username')

    # Update last_active_at column in database to hour ago
    conn, cur = open_database_connection()
    cur.execute("UPDATE users SET last_active_at = NOW() - INTERVAL '1 hour' WHERE username = %s", (username,))
    conn.commit()
    close_database_connection(conn, cur)

    # Announce the updated list of currently active users
    active_users_list = fetch_active_users()
    socketio.emit('user_update', active_users_list)

    return jsonify({'message': 'logout successful'})

@app.route('/messages', methods=['GET', 'POST'])
@token_required
def messages():
    # Add a new message
    if request.method == 'POST':
        data = request.json
        user_name = data.get('user_name')
        message = data.get('message')

        # Open a connection to the database
        conn, cur = open_database_connection()

        # Get the user ID for the given username
        cur.execute("SELECT id FROM Users WHERE username = %s", (user_name,))
        user = cur.fetchone()
        if user is None:
            # Close the database connection
            close_database_connection(conn, cur)
            return jsonify({'message': 'User not found'})

        # Insert the new message into the Messages table
        cur.execute(
            "INSERT INTO Messages (user_id, message, timestamp) VALUES (%s, %s, NOW())", (user[0], message))
        cur.execute("UPDATE users SET last_active_at = NOW() WHERE username = %s", (user_name,))
        conn.commit()
        # Close the database connection
        close_database_connection(conn, cur)

        # After successfully adding the message to the database, emit the 'new_message' event
        socketio.emit('new_message', {
            'username': user_name,
            'message': message,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
        return jsonify({'status': 'success', 'message': 'Message posted successfully'})
    else:
        # Retrieve all messages
        # Open a connection to the database
        conn, cur = open_database_connection()

        # Select all messages from the Messages table
        cur.execute(
            "SELECT Messages.id, Users.username, Messages.message, Messages.timestamp FROM Messages JOIN Users ON Messages.user_id = Users.id")
        messages_input = cur.fetchall()
        messages = []
        for row in messages_input:
            messages.append({
                'message_id': row[0],
                'message': row[2],
                'username': row[1],
                'timestamp': row[3].strftime('%Y-%m-%d %H:%M:%S')
            })

        # Close the database connection
        close_database_connection(conn, cur)

        return jsonify({'messages': messages})


if __name__ == '__main__':
    # app.run(debug=True)
    socketio.run(app, allow_unsafe_werkzeug=True, debug=config["DEBUG"])
