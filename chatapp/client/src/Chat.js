import { useState } from 'react';

function Chat() {
    const [messages, setMessages] = useState([])

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
                        <div className="user-list-box border">
                            <h4 className="user-list-heading border">Users</h4>
                            <ul className="list-unstyled">
                                <li>User 1</li>
                                <li>User 2</li>
                                <li>User 3</li>
                                <li>User 4</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row h-100">
                            <div className="col-md-12">
                                <div className="chat-box border-primary h-100 overflow-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {messages.map((message, index) => {
                                        return (
                                            <div className="outgoing-message" key={index}>
                                                <span className="message-user">You:</span> {message}
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
                                        className="form-control w-100"
                                        type="text"
                                        placeholder="Enter your message here"
                                        aria-label="Search"
                                        name="message"
                                    />
                                    <button className="btn btn-outline-success" type="submit">Send</button>
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