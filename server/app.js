import express from "express";
import { Server } from "socket.io";
import { createServer } from 'http'
import cors from 'cors'
const PORT = 8080

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        "origin": "http://localhost:5173",
        "methods": ["GET", "POST"],
        "credentials": true
    }
})

app.use(cors({
    "origin": "http://localhost:5173/",
    "methods": ["GET", "POST"],
    "credentials": true
}))

app.get('/', (req, res) => {
    res.send("this is the heading")
})

io.on("connection", (socket) => {
    console.log("user connected")
    console.log("id", socket.id)

    socket.on('join_room', (data) => {
        socket.join(data)
        console.log(`user connected with id ${socket.id} and room is ${data}`)
    })
    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)
    })
    socket.on("disconnect", (socket) => {
        console.log(`user is disconnected ${socket.id}`)
    })
})

server.listen(PORT, () => {
    console.log("server is running on the port ", PORT)
})