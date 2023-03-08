function Chat() {
    return (
        <>
            {/* <h1>SUPER SIMPLE CHAT</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="user-list-box border">
                                    <h4 className="user-list-heading border">Users</h4>
                                    <ul>
                                        <li>User 1</li>
                                        <li>User 2</li>
                                        <li>User 3</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="chat-box border">
                                            <div className="incoming-message">
                                                <span className="message-user">User 1:</span> Hello!
                                            </div>
                                            <div className="outgoing-message">
                                                <span className="message-user">You:</span> Hi there!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form className="d-flex flex-row justify-content-evenly m-0 p-0">
                    <input className="form-control w-75" type="search" placeholder="Enter your message here" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div> */}
            <h1>SUPER SIMPLE CHAT</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="user-list-box border">
                            <h4 className="user-list-heading border">Users</h4>
                            <ul className="list-unstyled">
                                <li>User 1</li>
                                <li>User 2</li>
                                <li>User 3</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="chat-box border">
                                    <div className="incoming-message">
                                        <span className="message-user">User 1:</span> Hello!
                                    </div>
                                    <div className="outgoing-message">
                                        <span className="message-user">You:</span> Hi there!
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <form className="d-flex flex-row justify-content-between align-items-center m-0 p-0 mt-4">
                                    <input className="form-control w-100" type="search" placeholder="Enter your message here" aria-label="Search" />
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