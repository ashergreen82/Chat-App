import './App.css';
import Chat from "./Chat";
import Login from './Login';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const handleLogin = (event) => {
    // event.preventDefault();
    const storedUser = localStorage.getItem(username);
    if (storedUser && storedUser.password === password) {
      handleLogin(username);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleRegister = (event) => {
    // event.preventDefault();
    if (password === confirmPassword) {
      localStorage.setItem(username, JSON.stringify({ password }));
      handleRegister({ username, password });
    } else {
      alert('Passwords do not match');
    }
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
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
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
