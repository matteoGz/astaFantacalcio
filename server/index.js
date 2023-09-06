const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

const cors = require('cors');
const http = require('http').Server(app);

const playerList = require('./model/playerList.json');
const userList = require('./model/nomiUtenti');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

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

app.get("/api/listone", (req, res) => {
    res.json({
        lista: playerList
    })
})

app.post("/api/login", (req, res) => {
    const requestData = req.body
    console.log(requestData)
    if(userList.includes(requestData?.nomeUtente)){
        res.json({ message: 'Login successfull'})
    } else{
        res.json({ message: 'User not registred'})
    }
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