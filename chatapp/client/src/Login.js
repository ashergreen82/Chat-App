import { useState } from 'react';

function Login({ handleLogin, handleRegister, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, isNewUser, setIsNewUser }) {

    // Determins if there is new user or not.
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
