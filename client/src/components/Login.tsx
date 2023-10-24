import { useState } from "react"
import io from 'socket.io-client'

const socket = io("http://localhost:5305")

type LoginTypes = {
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    setChatroom: React.Dispatch<React.SetStateAction<string>>,
}

type UserType = {
    username: string,
    chatroom:string,
}

export default function Login({ setUsername, setIsLoggedIn, setChatroom }: LoginTypes) {
    const [usernameSelector, setUsernameSelector] = useState<string>("")
    const [chatroomSelector, setChatroomSelector] = useState<string>("anime")
    function handleChatroomSelector(event: any) {
        setChatroomSelector(event.target.value)
    }

    function handleSubmit(event: any) {
        event.preventDefault()
        setUsername(usernameSelector)
        setChatroom(chatroomSelector)

        // Ping server to join a specific room
        const user: UserType = { username: usernameSelector, chatroom: chatroomSelector }
        console.log(user)
        socket.emit("JoinRoom", user)


        // Should happen last so everything runs before component is dismounted
        setIsLoggedIn(true)

    }


    return (
        <div>
            <h3>

                Login screen
            </h3>
            <form onSubmit={handleSubmit}>
                <div>

                    <label>Select username</label>
                    <input type="text" placeholder="Username here" value={usernameSelector} onChange={(e) => { setUsernameSelector(e.target.value) }} />
                </div>
                <div>


                    <label>Select Chatroom</label>
                    <select value={chatroomSelector} onChange={handleChatroomSelector}>
                        <option value="anime">anime</option>
                        <option value="manga">manga</option>
                        <option value="music">music</option>
                    </select>


                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}