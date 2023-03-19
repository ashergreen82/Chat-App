from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import os
import json

app = Flask(__name__)
api = Api(app)

# Get the current directory of the Main.py file
dir_path = os.path.dirname(os.path.realpath(__file__))

# Specify the relative path to the user.json file
json_file_path = os.path.join(dir_path, '..', 'client', 'src', 'users.json')

# load the user information from the JSON file
# with open('users.json') as f:
#     user_data = json.load(f)
with open(json_file_path, 'r') as f:
    user_data = json.load(f)


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
            return jsonify({'message': 'login successful'})

    # if no user was found, return an error message
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
        'password': password
    }
    user_data['users'].append(new_user)

    # save the updated user data to the JSON file
    with open('user.json', 'w') as f:
        json.dump(user_data, f)

    return jsonify({'message': 'registration successful'})


if __name__ == '__main__':
    app.run(debug=True)
