import { useState, useRef, useEffect } from 'react';
// import usersData from './users.json';
import axios from 'axios';
// import messagesData from './messages.json';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

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
            // socket.off('new_user');
            socket.off('user_update');
        };
    }, [socket]);

    // Handles messages entered by the user
    const handleSubmit = async (event) => {
        event.preventDefault();
        const messageInput = event.target.elements.message;
        const newMessageContent = messageInput.value;
        const token = localStorage.getItem('token');
        const config = { headers: { 'Authorization': `${token}` } };

        try {
            const response = await axios.post('http://localhost:5000/messages', {
                user_name: username,
                message: newMessageContent,
            }, config);
            const newMessage = response.data;
            // socket.emit('sendMessage', newMessage);
            if (newMessage) {
                messageInput.value = '';
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const messageInput = event.target.elements.message;
    //     const newMessageContent = messageInput.value;

    //     try {
    //         const response = await axios.post('http://localhost:5000/messages', {
    //             user_name: username,
    //             message: newMessageContent,
    //         });
    //         const newMessage = response.data;
    //         // setMessages([...messages, newMessage]);
    //         fetchUserMessage();
    //         messageInput.value = '';
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // Gets list of current logged in users and displayes them in the user box on startup
    useEffect(() => {
        console.log("useEffect function to list users has ran")
        // Fetch the list of users from the server when the component mounts
        const token = localStorage.getItem('token');
        const config = { headers: { 'Authorization': `${token}` } };
        axios.get('http://localhost:5000/users', config)
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
                const response = await axios.get('http://localhost:5000/messages', config);
                setMessages(response.data.messages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, []);

    // This function allows the user who just submitted a message to see their message they just typed in
    // Adding the variable "messages" to the useEffect only causes unnessary pings to the server every second.
    // async function fetchUserMessage() {
    //     try {
    //         const response = await axios.get('http://localhost:5000/messages');
    //         setMessages(response.data.messages);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

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
                                <li>{username}</li>
                                {users.map((user) => {
                                    if (user.username !== username) {
                                        return <li key={user.id}>{user.username}</li>;
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
                                            <span className="message-user pull-left">{message.username}:</span> {message.message}
                                        </div>
                                    ))}
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