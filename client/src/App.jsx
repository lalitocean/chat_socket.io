import React, { useState } from 'react'
import { io } from 'socket.io-client'
import Chat from './chat'
import "./App.css";
const socket = io.connect("http://localhost:8080/")

const App = () => {
  const [user, setUser] = useState("")
  const [room, setRoom] = useState("")
  const [show, setShow] = useState(false)

  const joincaht = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room)
      setShow(true)
    }
  }
  return (
    <div className='App'>
      {!show ? (<div className='joinChatContainer'>
        <h3>Live chat</h3>
        <input type="text" placeholder='username'
          onChange={(e) => { setUser(e.target.value) }} />
        <input type="text" placeholder='room id '
          onChange={(e) => { setRoom(e.target.value) }} />
        <button onClick={joincaht}>join chat</button>

        {/* import chat component  */}
      </div>) : (
        <Chat socket={socket} user={user} room={room} />
      )}



    </div>

  )
}

export default App