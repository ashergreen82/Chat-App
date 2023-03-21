import { useState, useRef, useEffect } from 'react';
// import usersData from './users.json';
import axios from 'axios';
import messagesData from './messages.json';

function Chat({ username, handleLogout }) {
    // const [messages, setMessages] = useState([])
    const [messages, setMessages] = useState(messagesData.messages);
    const [users, setUsers] = useState([])
    // const users = usersData.users;
    const chatBoxRef = useRef(null);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const messageInput = event.target.elements.message;
    //     const newMessage = messageInput.value;
    //     setMessages([...messages, newMessage]);
    //     messageInput.value = '';
    // };

    // Handles messages entered by the user
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
                                    {/* {messages.map((message, index) => {
                                        return (
                                            <div className="outgoing-message" key={index}>
                                                <span className="message-user pull-left">{username}:</span> {message}
                                            </div>
                                        );
                                    })} */}
                                    {messages.map((message) => (
                                        <div className="outgoing-message" key={message.message_id}>
                                            <span className="message-user pull-left">{message.user_name}:</span> {message.message}
                                        </div>
                                    ))}
                                    {/* {messagesData.messages.map((message) => {
                                        return (
                                            <div className="outgoing-message" key={message.message_id}>
                                                <span className="message-user pull-left">{message.user_name}:</span> {message.message}
                                            </div>
                                        );
                                    })} */}
                                    {/* {messages.map((message) => {
                                        return (
                                            <div className="outgoing-message" key={message.message_id}>
                                                <span className="message-user pull-left">{username}:</span> {message}
                                            </div>
                                        );
                                    })} */}
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