import { useState } from 'react';
import usersData from './users.json';

function Chat({ username, handleLogout }) {
    const [messages, setMessages] = useState([])
    const users = usersData.users;

    const handleSubmit = (event) => {
        event.preventDefault();
        const messageInput = event.target.elements.message;
        const newMessage = messageInput.value;
        setMessages([...messages, newMessage]);
        messageInput.value = '';
    };

    return (
        <>
            <h1>SUPER SIMPLE CHAT</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <div className="user-list-box border border-primary border-2" style={{ minHeight: '475px', overflowY: 'auto' }}>
                            <h4 className="user-list-heading border border-primary border-2">Users</h4>
                            <ul className="list-unstyled">
                                <li>{username}</li>
                                {users.map((user) => (
                                    <li key={user.user_id}>{user.user_name}</li>
                                ))}
                                {/* <li>User 2</li>
                                <li>User 3</li>
                                <li>User 4</li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row h-100">
                            <div className="col-md-12">
                                <div className="chat-box border-primary h-100 overflow-auto" style={{ minHeight: '400px', maxHeight: "400px", overflowY: 'auto' }}>
                                    {messages.map((message, index) => {
                                        return (
                                            <div className="outgoing-message" key={index}>
                                                <span className="message-user pull-left">{username}:</span> {message}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <form
                                    className="d-flex flex-row justify-content-between align-items-center m-0 p-0 mt-4"
                                    onSubmit={handleSubmit}
                                >
                                    <input
                                        className="form-control w-100 border-primary"
                                        type="text"
                                        placeholder="Enter your message here"
                                        aria-label="Search"
                                        name="message"
                                    />
                                    <button className="btn btn-outline-success border-primary" type="submit">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat