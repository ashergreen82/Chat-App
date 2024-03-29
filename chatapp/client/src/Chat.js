import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io();

function Chat({ username, handleLogout }) {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const chatBoxRef = useRef(null);
    const messageInputRef = useRef(null);


    // Updates any new users who have logged in
    useEffect(() => {
        if (!socket) return;

        // Listen for new messages
        socket.on('new_message', (message) => {
            console.log("New message received: ", message);
            setMessages((prevMessages) => [...prevMessages, message]);
            if (messageInputRef.current) {
                messageInputRef.current.value = '';
            }
        });

        // Listen for user updates (existing code)
        socket.on('user_update', (updatedUsers) => {
            console.log("This is the updated users: ", updatedUsers);
            setUsers(updatedUsers);
            console.log("This is the raw user file after setUsers did it's thing: ", users)
        });

        return () => {
            socket.off('new_message');
            socket.off('user_update');
        };
    }, [users]);

    // Handles messages entered by the user
    const handleSubmit = async (event) => {
        event.preventDefault();
        const messageInput = event.target.elements.message;
        const newMessageContent = messageInput.value;
        const token = localStorage.getItem('token');
        const config = { headers: { 'Authorization': `${token}` } };

        try {
            const response = await axios.post('messages', {
                user_name: username,
                message: newMessageContent,
            }, config);
            const newMessage = response.data;
            socket.emit('sendMessage', newMessage);
            if (newMessage) {
                messageInput.value = '';
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Gets list of current logged in users and displayes them in the user box on startup
    useEffect(() => {
        console.log("useEffect function to list users has ran")
        // Fetch the list of users from the server when the component mounts
        const token = localStorage.getItem('token');
        const config = { headers: { 'Authorization': `${token}` } };
        axios.get('users', config)
            .then(response => setUsers(response.data.users))
            .catch(error => console.error(error));
    }, []);

    // Gets the messasges from the server on startup
    useEffect(() => {
        console.log("useEffect function to display messages has ran")
        const fetchMessages = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { 'Authorization': `${token}` } };
            try {
                const response = await axios.get('messages', config);
                setMessages(response.data.messages);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMessages();
    }, []);

    // Scroll to the bottom of the message container when a new message is received
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
                                <li className="user-list-item ps-1">{username}</li>
                                {users.map((user) => {
                                    if (user.username !== username) {
                                        return <li key={user.id} className="user-list-item ps-1">{user.username}</li>;
                                    } else {
                                        return null;
                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row h-100">
                            <div className="col-md-12">
                                <div className="chat-box border-primary h-100 overflow-auto" style={{ minHeight: '400px', maxHeight: "400px", overflowY: 'auto' }} ref={chatBoxRef}>
                                    {messages.map((message) => (
                                        <div className="outgoing-message" key={message.message_id}>
                                            <span className="message-user pull-left ps-1">{message.username}:</span> {message.message}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <form
                                    className="d-flex flex-row justify-content-between align-items-center m-0 p-0 mt-4"
                                    onSubmit={handleSubmit}>
                                    <input
                                        className="form-control w-100 border-primary message-input"
                                        type="text"
                                        placeholder="Enter your message here"
                                        aria-label="Search"
                                        name="message"
                                        ref={messageInputRef}
                                        disabled={username === "Guest"}
                                    />
                                    <button className="btn btn-outline-success border-primary" type="submit">Send</button>
                                </form>
                                <div className="d-flex justify-content-center mt-2">
                                    <button className="btn btn-outline-success border-primary" type="button" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat