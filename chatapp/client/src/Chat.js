function Chat() {
    return (
        <>
            <h1>SUPER SIMPLE CHAT</h1>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <form className="d-flex flex-row justify-content-evenly m-0 p-0">
                <input className="form-control w-75" type="search" placeholder="Enter your message here" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </>
    )
}

export default Chat