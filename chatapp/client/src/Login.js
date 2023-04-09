import './Login.css'
function Login({ handleLogin, handleGuestLogin, registerUser, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, isNewUser, setIsNewUser }) {

    // Determins if there is new user or not.
    const toggleNewUser = () => {
        setIsNewUser(!isNewUser);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <>
            <div className='container main-container'>
                <h1>WELCOME TO THE SUPER SIMPLE CHAT!</h1>
                <h2>Please login here:</h2>
                <div className="container login-container">

                    <div className="row">
                        <div className="col">
                            <div className="form-container">
                                {isNewUser ? (
                                    <form onSubmit={registerUser}>
                                        <div className="form-group">
                                            <label className='labels'>New Username:</label>
                                            <input className="form-control w-100 border-primary" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className='labels'>New Password:</label>
                                            <input className="form-control w-100 border-primary" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className='labels'>Confirm Password:</label>
                                            <input className="form-control w-100 border-primary" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>
                                        <div className="login-button">
                                            <button className="btn btn-outline-success border-primary" type="submit">Register</button>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <label className='labels'>Username:</label>
                                            <input className="form-control w-100 border-primary" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className='labels'>Password:</label>
                                            <input className="form-control w-100 border-primary" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="login-button">
                                            <button className="btn btn-outline-success border-primary" type="submit">Login</button>
                                        </div>
                                    </form>
                                )}
                                <button className="btn btn-outline-success border-primary button-register" onClick={toggleNewUser}>
                                    {isNewUser ? 'Already have an account? Login' : "Don't have an account? Register"}
                                </button>
                                <button className="btn btn-outline-success border-primary button-guest" onClick={handleGuestLogin}>Guest Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
