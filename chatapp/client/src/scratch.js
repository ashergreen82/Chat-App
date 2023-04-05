useEffect(() => {
    // If there's no socket, don't do anything
    if (!socket) return;

    // When the 'new_message' event is received from the server, this function is called
    // The 'message' parameter contains the new message data
    socket.on('new_message', (message) => {
        // Update the 'messages' state by creating a new array with the previous messages and the new message
        setMessages((prevMessages) => [...prevMessages, message]);
    });

    // When the 'new_user' event is received from the server, this function is called
    // The 'updatedUsers' parameter contains the updated list of users
    socket.on('new_user', (updatedUsers) => {
        // Update the 'users' state with the new list of users
        setUsers(updatedUsers);
    });

    // When the 'user_update' event is received from the server, this function is called
    // The 'updatedUsers' parameter contains the updated list of users
    socket.on('user_update', (updatedUsers) => {
        // Update the 'users' state with the new list of users
        setUsers(updatedUsers);
    });

    // This function is called when the component is unmounted or when the 'socket' dependency changes
    // It is used to clean up the event listeners
    return () => {
        // Remove the event listeners for the 'new_message', 'new_user', and 'user_update' events
        socket.off('new_message');
        socket.off('new_user');
        socket.off('user_update');
    };
}, [socket]); // The useEffect will run whenever the 'socket' dependency changes
