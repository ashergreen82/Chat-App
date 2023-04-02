import psycopg2
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from datetime import datetime, timedelta
import os
import json

def open_database_connection():
    try:
        conn = psycopg2.connect(
            host="127.0.0.1",
            port=5432,
            dbname="ChatApp",
            user="postgres",
            password="Andy"
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

app = Flask(__name__)
api = Api(app)
CORS(app)

conn, cur = open_database_connection()
cur.execute("SELECT * FROM users")
results1 = cur.fetchall()
cur.execute("SELECT * FROM messages")
results = cur.fetchall()
close_database_connection(conn, cur)

# print(results1)
# print(results)

# Get the current directory of the Main.py file
dir_path = os.path.dirname(os.path.realpath(__file__))

# Specify the relative path to the user.json file
users_file_path = os.path.join(dir_path, '..', 'client', 'src', 'users.json')

# load the user information from the JSON file
# with open('users.json') as f:
#     user_data = json.load(f)
with open(users_file_path, 'r') as f:
    user_data = json.load(f)
    # user_data_to_be_converted = user_data["users"]

# Specify path to the userlogin.json file which holds the informatoin on who is logged in.
userlogin_file_path = os.path.join(os.path.dirname(__file__), 'userlogin.json')

# load the userlogin information from the userlogin JSON file
if os.path.exists(userlogin_file_path) and os.path.getsize(userlogin_file_path) > 0:
    with open(userlogin_file_path, 'r') as f:
        userlogin_data = json.load(f)
else:
    userlogin_data = {}

# def insert_users(user_data):
#     # Connect to the PostgreSQL database
#     conn, cur = open_database_connection()
#
#     try:
#         for user in user_data:
#             cur.execute("""
#                 INSERT INTO users (username, password, last_active_at)
#                 VALUES (%s, %s, %s)
#                 ON CONFLICT (username) DO NOTHING
#             """, (user['name'], user['password'], user['last_active_at']))
#
#         # Commit the changes to the database
#         conn.commit()
#         print("User data inserted successfully!")
#     except Exception as e:
#         print(f"Error inserting user data: {e}")
#
#     # Close the PostgreSQL database connection
#     close_database_connection(conn, cur)

# insert_users(user_data_to_be_converted)

# def insert_messages(message_data):
#     # Assuming you have a connection to the database and a valid cursor object
#     conn, cur = open_database_connection()
#
#     # Iterate through the messages and insert them into the database
#     for message in message_data:
#         user_name = message["user_name"]
#         message_text = message["message"]
#         timestamp = message["timestamp"]
#
#         # Get the user ID associated with the user_name
#         cur.execute("SELECT id FROM users WHERE username = %s;", (user_name,))
#         user_id_result = cur.fetchone()
#
#         # If a user with the given user_name exists, insert the message
#         if user_id_result:
#             user_id = user_id_result[0]
#
#             # Prepare the INSERT statement
#             insert_query = """
#             INSERT INTO messages (user_id, message, timestamp)
#             VALUES (%s, %s, %s);
#             """
#
#             # Execute the INSERT statement
#             cur.execute(insert_query, (user_id, message_text, timestamp))
#         else:
#             print(f"No user found with the name: {user_name}")
#
#     # Commit the changes to the database
#     conn.commit()
#
#     # Close the database connection
#     close_database_connection(conn, cur)
#
# messages_file_path = os.path.join(dir_path, 'messages.json')
# with open(messages_file_path, 'r') as f:
#     messages_data = json.load(f)
#     messages_data = messages_data["messages"]
# insert_messages(messages_data)

@app.route('/login', methods=['POST'])
def login():
    # get the username and password from the request
    data = request.json
    username = data.get('username')
    password = data.get('password')
    print(f"data from request.json: {data}")
    print(f"Username recieved: {username}")
    print(f"Password recieved: {password}")
    print(f"user_data: {user_data}")
    user_verified = False
    # find the user with the matching username and password
    for user in user_data['users']:
        if user['name'] == username and user['password'] == password:
            # with open(userlogin_file_path, 'r') as f:
            #     userlogin_data = json.load(f)
            user['last_active_at'] = datetime.now().strftime(
                '%Y-%m-%d %H:%M:%S')
            # if 'users' not in userlogin_data:
            #     userlogin_data['users'] = []
            user_name = user["name"]
            user_date = user["last_active_at"]
            # userlogin_data['users'].append({'name': username})
            print(f"{user_name} logged in at {user_date}.")
            user_verified = True
            break

    if user_verified:
        with open(users_file_path, 'w') as f:
            json.dump(user_data, f)
        return jsonify({'message': 'login successful'})

    # if no user was found, return an error message
    else:
        return jsonify({'message': 'invalid username or password'})


@app.route('/register', methods=['POST'])
def register():
    # get the new user information from the request
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # check if the username is already taken
    for user in user_data['users']:
        if user['name'] == username:
            return jsonify({'message': 'username already taken'})

    # create a new user with a unique ID
    new_user = {
        'id': len(user_data['users']) + 1,
        'name': username,
        'password': password,
        'last_active_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    user_data['users'].append(new_user)

    # save the updated user data to the JSON file
    with open(users_file_path, 'w') as f:
        json.dump(user_data, f)

    return jsonify({'message': 'registration successful'})


@app.route('/users', methods=['GET'])
def get_users():
    # Sends the list of users to the client
    one_hour_ago = datetime.now() - timedelta(hours=1)

    active_users = []
    for user in user_data['users']:
        # Convert the last_active_at value to a datetime object
        last_active_at = datetime.strptime(
            user['last_active_at'], '%Y-%m-%d %H:%M:%S')

        # Compare the last_active_at value with the time one hour ago
        if last_active_at > one_hour_ago:
            active_users.append(user)

    # Sends the list of active users to the client
    response = jsonify({'users': active_users})
    print(f"List of users to be printed in user box: {active_users}")
    return response


@app.route('/logout', methods=['POST'])
def logout():
    # get the username from the request
    data = request.json
    username = data.get('username')

    # remove the user from the userlogin file to mark them as logged out
    with open(userlogin_file_path, 'r') as f:
        userlogin_data = json.load(f)

    userlogin_data['users'] = [
        user for user in userlogin_data['users'] if user['name'] != username]
    with open(userlogin_file_path, 'w') as f:
        json.dump(userlogin_data, f)

    return jsonify({'message': 'logout successful'})


@app.route('/messages', methods=['GET', 'POST'])
def messages():
    messages_file_path = os.path.join(dir_path, 'messages.json')
    if request.method == 'POST':
        # Add a new message
        data = request.json
        user_name = data.get('user_name')
        message = data.get('message')
        message_id = len(messages_file_path) + 1
        message_timestamp = datetime.now().strftime(
            '%Y-%m-%d %H:%M:%S')

        # Append the new message to the messages JSON file
        with open(messages_file_path, 'r') as f:
            messages_data = json.load(f)
        messages_data['messages'].append(
            # {'user_name': user_name, 'message': message, 'message_id': message_id}
            {'message_id': message_id, 'user_name': user_name, 'message': message, 'timestamp': message_timestamp})
        with open(messages_file_path, 'w') as f:
            json.dump(messages_data, f)
        print(f"{user_name}'s message was added successfully")
        print(f"Message added was: {message}")

        return jsonify({
            'username': user_name,
            'message_content': message
        })
    else:
        # Retrieve all messages
        # messages_file_path = os.path.join(dir_path, 'messages.json')
        # messages_file_path = os.path.join('client', 'src', 'messages.json')
        with open(messages_file_path, 'r') as f:
            messages_data = json.load(f)

        return jsonify({'messages': messages_data['messages']})

if __name__ == '__main__':
    app.run(debug=True)
