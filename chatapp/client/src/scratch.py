import datetime


@app.route('/login', methods=['POST'])
def login():
    # get the username and password from the request
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # find the user with the matching username and password
    for user in user_data['users']:
        if user['name'] == username and user['password'] == password:
            # record the login time for the user
            user['login_time'] = datetime.datetime.now().strftime(
                '%Y-%m-%d %H:%M:%S')
            with open(json_file_path, 'w') as f:
                json.dump(user_data, f)
            return jsonify({'message': 'login successful'})

    # if no user was found, return an error message
    return jsonify({'message': 'invalid username or password'})


@app.route('/logout', methods=['POST'])
def logout():
    # get the username from the request
    data = request.json
    username = data.get('username')

    # find the user with the matching username
    for user in user_data['users']:
        if user['name'] == username:
            # record the logout time for the user
            user['logout_time'] = datetime.datetime.now().strftime(
                '%Y-%m-%d %H:%M:%S')
            with open(json_file_path, 'w') as f:
                json.dump(user_data, f)
            return jsonify({'message': 'logout successful'})

    # if no user was found, return an error message
    return jsonify({'message': 'invalid username'})
