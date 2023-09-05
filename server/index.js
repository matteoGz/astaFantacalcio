const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
const http = require('http').Server(app);

const playerList = require('./model/playerList.json');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.get("/api", (req, res) => {
    res.json({
        message: "API"
    })
})

app.get("/listone", (req, res) => {
    res.json({
        lista: playerList
    })
})

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});

http.listen(port, () => {
    console.log("Server started on "+port);
})