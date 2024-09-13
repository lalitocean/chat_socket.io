import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
const Chat = ({ socket, user, room }) => {
    const [message, setMessage] = useState("")
    const [list, setList] = useState([])

    const sendmessage = async () => {
        if (message !== '') {
            const messageData = {
                room: room,
                author: user,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData)
            setList((list) => [...list, messageData])
            setMessage("")

        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setList((list) => [...list, data])
        })
    }, [])
    return (
        <div className='chat-window'>
            <div className='chat-header'><p>Live Chat</p></div>
            <div className='chat-body'>

                {list && list.map((messageDataitem, i) => (
                    <ScrollToBottom className='message-container'>
                        <div key={i} className='message' id={user === messageDataitem.author ? "you" : "other"}>
                            <div>
                                <div className='message-content'>
                                    <p>{messageDataitem.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id='time'>{messageDataitem.time}</p>
                                    <p id='author'>{messageDataitem.author}</p>

                                </div>
                            </div>
                        </div>
                    </ScrollToBottom>
                ))}
            </div>
            <div className='chat-footer'>
                <input type="text" placeholder='Hey...'
                    value={message}
                    onChange={(e) => { setMessage(e.target.value) }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            sendmessage()
                        }
                    }}
                />
                <button onClick={sendmessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat