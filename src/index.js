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

const users = [
  {
    id: 1,
    nome: "davi1",
    senha: "aaaa",
  },
  {
    id: 2,
    nome: "davi2",
    senha: "bbbb",
  },
  {
    id: 3,
    nome: "davi3",
    senha: "cccc",
  },
  {
    id: 4,
    nome: "davi4",
    senha: "dddd",
  },
];

server.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(users);
});

server.get("/users", (req, res) => {
  res.json(users);
});

server.get("/users/login", (req, res) => {
  let nome = req.query.nome;
  let senha = req.query.senha;
  // const { senha } = req.query.senha;

  // let all = playlists.reduce((prev, next) => prev.concat(next.musicas), []);
  let results = users.filter((obj) => obj.nome === nome);

  if (nome == results[0].nome) {
    if (senha == results[0].senha) {
      res.json(results);
    } else {
      let error = {
        message: "Senha ou usário invalidos",
      };
      res.json(error);
    }
  }
});

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
  res.json(playlists);
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

  play = playlists.filter((p) => p.id == id);

  play.nome = body.nome;

  for (var z = 0; z < body[0].musicas.length; z++) {
    if (play[0].musicas[z] == null) {
      play[0].musicas.push(body[0].musicas[z]);
    } else if (play[0].musicas[z].id == body[0].musicas[z].id) {
      play[0].musicas[z].nome = body[0].musicas[z].nome;
      play[0].musicas[z].src = body[0].musicas[z].src;
    }
  }

  // console.log("PLAY" + JSON.stringify(play ))
  for (var z = 0; z < playlists.length; z++) {
    if (playlists[z].id == play[0].id) {
      if (playlists[z].musicas[z] == null) {
        playlists[z].musicas[z].push(play[0].musicas[z]);
      }
      playlists[z].musicas[z].nome = play[0].musicas[z].nome;
      playlists[z].musicas[z].src = play[0].musicas[z].src;
    }
  }
  res.json(play);
});

server.listen(3002);
