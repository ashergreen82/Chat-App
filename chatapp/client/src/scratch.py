from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
import os
import json

app = Flask(__name__)
api = Api(app)
CORS(app)

# Get the current directory of the Main.py file
dir_path = os.path.dirname(os.path.realpath(__file__))

# Specify the relative path to the users.json file
users_json_file_path = os.path.join(
    dir_path, '..', 'client', 'src', 'users.json')

# load the user information from the users JSON file
with open(users_json_file_path, 'r') as f:
    user_data = json.load(f)

# Specify the relative path to the userlogin.json file
userlogin_json_file_path = os.path.join(
    dir_path, '..', 'client', 'src', 'userlogin.json')

# load the userlogin information from the userlogin JSON file
with open(userlogin_json_file_path, 'r') as f:
    userlogin_data = json.load(f)


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

    # find the user with the matching username and password
    for user in user_data['users']:
        if user['name'] == username and user['password'] == password:
            # add the user to the userlogin file to mark them as logged in
            with open(userlogin_json_file_path, 'r') as f:
                userlogin_data = json.load(f)

            userlogin_data['users'].append({'name': username})
            with open(userlogin_json_file_path, 'w') as f:
                json.dump(userlogin_data, f)

            return jsonify({'message': 'login successful'})

    # if no user was found, return an error message
    return jsonify({'message': 'invalid username or password'})


@app.route('/logout', methods=['POST'])
def logout():
    # get the username from the request
    data = request.json
    username = data.get('username')

    # remove the user from the userlogin file to mark them as logged out
    with open(userlogin_json_file_path, 'r') as f:
        userlogin_data = json.load(f)

    userlogin_data['users'] = [
        user for user in userlogin_data['users'] if user['name'] != username]
    with open(userlogin_json_file_path, 'w') as f:
        json.dump(userlogin_data, f)

    return jsonify({'message': 'logout successful'})


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
        'password': password
    }
    user_data['users'].append(new_user)

    # save the updated user data to the userlogin.json file
    with open(userlogin_file_path, 'w') as f:
        json.dump(user_login_data, f)

    return jsonify({'message': 'login successful'})


@app.route('/logout', methods=['POST'])
def logout():
    # get the username from the request
    data = request.json
    username = data.get('username')

    # remove the user from the user_login_data if they exist
    if username in user_login_data:
        user_login_data.remove(username)

        # save the updated user data to the userlogin.json file
        with open(userlogin_file_path, 'w') as f:
            json.dump(user_login_data, f)

        return jsonify({'message': 'logout successful'})

    # if the user doesn't exist in the user_login_data, return an error message
    return jsonify({'message': 'user is not currently logged in'})
