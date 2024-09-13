import React, { useState, useEffect } from 'react'

const Chat = ({ socket, user, room }) => {
    const [message, setMessage] = useState("")

    const sendmessage = async () => {
        if (message !== '') {
            const messageData = {
                room: room,
                author: user,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData)
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
        })
    }, [])
    return (
        <div className='chat-window'>
            <div className='chat-header'><p>Live Chat</p></div>
            <div className='chat-body'>the chat body </div>
            <div className='chat-footer'>
                <input type="text" placeholder='Hey...'
                    onChange={(e) => { setMessage(e.target.value) }} />
                <button onClick={sendmessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat