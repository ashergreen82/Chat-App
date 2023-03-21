import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import messagesData from './messages.json';

function Chat({ username, handleLogout }) {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState(messagesData.messages);
    const chatBoxRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const messageInput = event.target.elements.message;
        const newMessageContent = messageInput.value;
        const newMessage = {
            message_id: messages.length + 1,
            user_name: username,
            message: newMessageContent,
        };
        setMessages([...messages, newMessage]);
        messageInput.value = '';
    };

    useEffect(() => {
        // Fetch the list of users from the server when the component mounts
        axios.get('/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (chatBoxRef && chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

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
                                    <li key={user.id}>{user.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row h-100">
                            <div className="col-md-12">
                                <div className="chat-box border-primary h-100 overflow-auto" style={{ minHeight: '400px', maxHeight: "400px", overflowY: 'auto' }} ref={chatBoxRef}>
                                    {messages.map((message) => (
                                        <div className="outgoing-message" key={message.message_id}>
                                            <span className="message-user pull-left">{message.user_name}:</span> {message.message}
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSubmit} className="mt-3">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="message" placeholder="Type your message" />
                                        <button type="submit" className="btn btn-primary">Send</button>
                                        <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;
