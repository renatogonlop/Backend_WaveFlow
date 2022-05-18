const express = require('express');

const server = express();

server.use(express.json);

const playlist = [
    {
        id: 1,
        nome: 'Play1'
    },
    {
        id: 2,
        nome: 'Play2'
    },
    {
        id: 3,
        nome: 'Play3'
    },
    {
        id: 4,
        nome: 'Play4'
    }
]



server.get('/playlist', (req, res) => {
    res.json(playlist);
})

server.get('/playlist/:id', (req, rs) => {
    const {id} = req.params;
    res.json(playlist.find( (p) => p.id == id ));
})



server.post('/playlist', (req, rs) => {
    const play = req.body;
    playlist.push(play);
    res.json(play);
})


server.get('/teste', (req, res) => {
    res.send("Hello!");
})

server.listen(3001);