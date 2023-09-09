const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

const cors = require('cors');
const https = require('https').Server(app);

const playerList = require('./model/playerList.json');
const userList = require('./model/nomiUtenti');

app.use(cors({
    origin: 'https://asta-fantacalcio2023.vercel.app',
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const socketIO = require('socket.io')(https, {
    cors: {
        origin: '*'
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
    let currentValoreAsta = 0;
    let userWinner = '';
    // let timer = 15;
    // let timerInterval;

    // const decrementTimer = () => {
    //     if(timer > 0){
    //         timer--;
    //         socket.emit('timerUpdate', timer);
    //     } else{
    //         clearInterval(timerInterval);
    //     }
    // }

    // timerInterval = setInterval(decrementTimer, 1000);
    

    socket.on('join', (room) => {
        socket.join(room);
        socket.emit('asta', currentValoreAsta, userWinner); //send current highest valore asta
    })

    socket.on('asta', (room, newValue, newUser) => {
        console.log(room, newValue, newUser)
        if(!isNaN(newValue) && newValue > currentValoreAsta){
            currentValoreAsta = newValue;
            userWinner = newUser;
            socket.to(room).emit('asta', newValue, newUser); //send new highest value to users
            //clearInterval(timerInterval);
        }
    })

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});

https.listen(port, () => {
    console.log("Server started on "+port);
})

module.exports = app;