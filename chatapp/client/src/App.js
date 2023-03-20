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

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/login', {
      username: username,
      password: password
    })
      .then(response => {
        if (response.data.message == "login successful") {
          setUsername(username);
          setIsLoggedIn(true);
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
    // fetch('http://localhost:5000/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   mode: 'no-cors',
    //   body: JSON.stringify({ username, password })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.success) {
    //       setUsername(username);
    //       setIsLoggedIn(true);
    //       console.log("username value in App.js is: ", username)
    //       console.log("Congratulations!!!  You remembered your username and password!!!!")
    //     } else {
    //       console.log("username value in App.js (else statement) is: ", username)
    //       alert('Invalid username or password');
    //     }
    //   });
    // let storedUser;
    // try {
    //   const storedUser = JSON.parse(localStorage.getItem(username));
    // storedUser = JSON.parse(localStorage.getItem(username));
    //   console.log("App.js: storedUser item is ", storedUser);
    //   console.log("App.js: password value in handleLogin function is ", password);
    //   console.log("username value in App.js (before IF statements) is: ", username);
    //   console.log("storedUser.password value in App.js (before IF statements) is: ", storedUser.password);
    //   if (storedUser && storedUser.password === password) {
    //     setUsername(username);
    //     setIsLoggedIn(true);
    //     console.log("username value in App.js is: ", username)
    //     console.log("Congratulations!!!  You remembered your username and password!!!!")
    //   } else {
    //     console.log("username value in App.js (else statement) is: ", username)
    //     console.log("storedUser value in App.js (else statement) is: ", storedUser)
    //     console.log("storedUser.password value in App.js (else statement) is: ", storedUser.password)
    //     alert('Invalid username or password');
    //   }
    // } catch (event) {
    //   alert("Invalid username or password App.js:handleLogin");
    //   return;
    // }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      axios.post('http://localhost:5000/register', {
        username: username,
        password: password
      })
        .then(response => {
          localStorage.setItem(username, JSON.stringify({ password }));
          handleLogin(event);
        })
        .catch(error => {
          console.log(error);
          alert('Error registering user');
        });
    } else {
      alert('Passwords do not match');
    }

    // if (password === confirmPassword) {
    //   localStorage.setItem(username, JSON.stringify({ password }));
    //   registerUser({ username, password });
    // } else {
    //   alert('Passwords do not match');
    // }
  };

  const registerUser = ({ username, password }) => {
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUsername(username);
          setIsLoggedIn(true);
          console.log("username value in App.js is: ", username)
          console.log("Congratulations!!!  You have successfully registered and logged in!!!!")
        } else {
          alert('Registration failed');
        }
      });
  };
  // const handleLogin = (username) => {
  //   setUsername(username);
  //   setIsLoggedIn(true);
  // };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="App">
      <div className="container">
        {!isLoggedIn ? (
          <Login
            handleLogin={handleLogin}
            handleRegister={handleRegister}
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

// import './App.css';
// import Chat from "./Chat";
// import Login from './Login';

// function App() {
//   return (
//     <div className="App">
//       <div className="container">
//         <Login />
//       </div>
//     </div>
//   );
// }

// export default App;
