from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from datetime import datetime
import os
import json

app = Flask(__name__)
api = Api(app)
CORS(app)

# Get the current directory of the Main.py file
dir_path = os.path.dirname(os.path.realpath(__file__))

# Specify the relative path to the user.json file
users_file_path = os.path.join(dir_path, '..', 'client', 'src', 'users.json')

# load the user information from the JSON file
# with open('users.json') as f:
#     user_data = json.load(f)
with open(users_file_path, 'r') as f:
    user_data = json.load(f)

# Specify path to the userlogin.json file which holds the informatoin on who is logged in.
userlogin_file_path = os.path.join(os.path.dirname(__file__), 'userlogin.json')

# load the userlogin information from the userlogin JSON file
if os.path.exists(userlogin_file_path) and os.path.getsize(userlogin_file_path) > 0:
    with open(userlogin_file_path, 'r') as f:
        userlogin_data = json.load(f)
else:
    userlogin_data = {}


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
        'last_active_at': datetime.now()
    }
    user_data['users'].append(new_user)

    # save the updated user data to the JSON file
    with open(users_file_path, 'w') as f:
        json.dump(user_data, f)

    return jsonify({'message': 'registration successful'})


@app.route('/users', methods=['GET'])
def get_users():
    # Sends the list of users to the client
    test = jsonify({'users': user_data['users']})
    print(f"List of users to be printed in user box {test}")
    return jsonify({'users': user_data['users']})


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
    if request.method == 'POST':
        # Add a new message
        data = request.json
        user_name = data.get('user_name')
        message = data.get('message')
        message_id = data.get('message_id')

        # Append the new message to the messages JSON file
        messages_file_path = os.path.join(dir_path, 'messages.json')
        with open(messages_file_path, 'r') as f:
            messages_data = json.load(f)

        messages_data['messages'].append(
            # {'user_name': user_name, 'message': message, 'message_id': message_id}
            {'message_id': message_id, 'user_name': user_name, 'message': message})
        with open(messages_file_path, 'w') as f:
            json.dump(messages_data, f)

        return jsonify({'message': 'message added successfully'})
    else:
        # Retrieve all messages
        messages_file_path = os.path.join(dir_path, 'messages.json')
        # messages_file_path = os.path.join('client', 'src', 'messages.json')
        with open(messages_file_path, 'r') as f:
            messages_data = json.load(f)

        return jsonify({'messages': messages_data['messages']})


if __name__ == '__main__':
    app.run(debug=True)
