const express = require("express");

const server = express();

server.use(express.json());

const playlists = [
  {
    id: 1,
    nome: "Play1",
    musicas: [
      {
        id: 1,
        nome: "musica01",
        src: "asd",
      },
    ],
  },
  {
    id: 2,
    nome: "Play2",
    musicas: [
      {
        id: 1,
        nome: "musica02",
        src: "asd",
      },
    ],
  },
  {
    id: 3,
    nome: "Play3",
    musicas: [
      {
        id: 1,
        nome: "musica03",
        src: "asd",
      },
    ],
  },
  {
    id: 4,
    nome: "Play4",
    musicas: [
      {
        id: 1,
        nome: "musica041",
        src: "aaa",
      },
      {
        id: 2,
        nome: "musica042",
        src: "bbb",
      },
    ],
  },
];

server.get("/playlists", (req, res) => {
  res.json(playlists);
});

server.get("/playlists/:id", (req, res) => {
  const { id } = req.params;
  res.json(playlists.find((p) => p.id == id));
});

server.post("/playlists", (req, res) => {
  const play = req.body;
  playlists.push(play);
  res.json(play);
});

server.get("/teste", (req, res) => {
  res.send("Hello!");
});

server.get("/playlists/musicas/:musica", (req, res) => {
  const { musica } = req.params;

  let all = playlists.reduce((prev, next) => prev.concat(next.musicas), []);
  let results = all.filter((obj) => obj.nome === musica);
  res.json(results);
});

server.put("/playlists/:id", (req, res) => {
  const { id } = req.params;

  let body = req.body;

  play = playlists.find((p) => p.id == id);

  play.nome = body.nome;

  for (var z = 0; z < body[0].musicas.length; z++) {
    
    if (play.musicas[z] == null) {
        play.musicas.push(body[0].musicas[z])

    }
    else if (play.musicas[z].id == body[0].musicas[z].id ) {
      play.musicas[z].nome = body[0].musicas[z].nome;
      play.musicas[z].src = body[0].musicas[z].src;
    } 
  }
  
  res.json(play);
});

server.listen(3002);
