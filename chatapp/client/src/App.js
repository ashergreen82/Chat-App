import './App.css';
import Chat from "./Chat";
import Login from './Login';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  // User login
  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('login', {
      username: username,
      password: password
    })
      .then(response => {
        if (response.data.token) {
          setUsername(username);
          setIsLoggedIn(true);
          localStorage.setItem('token', response.data.token); // Token recieved here
          console.log("username value in App.js is: ", username)
          console.log("Congratulations!!!  You remembered your username and password!!!!")
        } else {
          console.log("username value in App.js (else statement) is: ", username)
          alert('Invalid username or password');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Invalid username or password');
      });
  };

  // Guest login
  const handleGuestLogin = (event) => {
    event.preventDefault();
    axios.post('login', {
      username: "Guest",
      password: ""
    })
      .then(response => {
        if (response.data.token) {
          setUsername("Guest");
          setIsLoggedIn(true);
          localStorage.setItem('token', response.data.token); // Token recieved here
          console.log("User logged in as Guest")
        } else {
          alert('Invalid token');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Error Generated');
      });
  };


  // Registering a new user
  const registerUser = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      axios.post('register', {
        username: username,
        password: password
      })
        .then(response => {
          if (response.data.message === "username already taken") {
            alert("That Username is already taken, please select another Username")
          } else {
            console.log("User login successful")
            alert("WELCOME TO THE CHAT LAIR!!!!")
            handleLogin(event);
          }
        })
        .catch(error => {
          console.log(error);
          alert('Error registering user');
        });
    } else {
      alert('Passwords do not match');
    }
  };

  const handleLogout = () => {
    axios.post('logout', {
      username: username
    })
      .then(response => {
        if (response.data.message === "logout successful") {
          console.log("User", username, "has logged out")
          setIsLoggedIn(false);
          setUsername('');
          setPassword('');
          setConfirmPassword('');
        } else {
          console.log("User", username, "could not be logged out");
          alert("You could not be logged out, please notify Tech Support")
        }
      })
      .catch(error => {
        console.log(error);
        alert('Error logging out the user');
      });
  };

  return (
    <div className="App">
      <div className="container">
        {!isLoggedIn ? (
          <Login
            handleLogin={handleLogin}
            handleGuestLogin={handleGuestLogin}
            registerUser={registerUser}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isNewUser={isNewUser}
            setIsNewUser={setIsNewUser}
          />
        ) : (
          <Chat
            username={username}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}

export default App;