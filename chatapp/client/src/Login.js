import { useState } from 'react';

function Login({ handleLogin, handleRegister, isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, isNewUser, setIsNewUser }) {
    //     const [username, setUsername] = useState('');
    //     const [password, setPassword] = useState('');
    //     const [confirmPassword, setConfirmPassword] = useState('');
    // const [isNewUser, setIsNewUser] = useState(false);

    // const handleLogin = (event) => {
    //     event.preventDefault();
    //     const storedUser = localStorage.getItem(username);
    //     if (storedUser && storedUser.password === password) {
    //         props.handleLogin(username);
    //     } else {
    //         alert('Invalid username or password');
    //     }
    // };

    // const handleRegister = (event) => {
    //     event.preventDefault();
    //     if (password === confirmPassword) {
    //         localStorage.setItem(username, JSON.stringify({ password }));
    //         props.handleRegister({ username, password });
    //     } else {
    //         alert('Passwords do not match');
    //     }
    // };

    const toggleNewUser = () => {
        setIsNewUser(!isNewUser);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div>
            {isNewUser ? (
                <form onSubmit={handleRegister}>
                    <div>
                        <label>New Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>New Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit">Register</button>
                </form>
            ) : (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            )}
            <button onClick={toggleNewUser}>
                {isNewUser ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
        </div>
    );
}

export default Login;
