const express = require("express");
var { MongoClient, ObjectId } = require("mongodb");
var url =
  "mongodb+srv://davicamara:123@devplatmobile.baylr.mongodb.net/?retryWrites=true&w=majority";
const server = express();

server.use(express.json());

exports.findAll = (req, res) => {
  MongoClient.connect(url, function (err, con) {
    if (err) throw err;
    con
      .db("WaveFlow")
      .collection("Playlist")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;

        

        //db.close(); //armazenar a conexão do db em variavel antes de fechar o db.
        return res.json(result);
      });
  });
};

/* const playlists = [
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

*/

/* const users = [
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
]; */

server.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(users);
});

server.get("/users", (req, res) => {
  res.json(users);
});

server.get("/playlists", (req, res) => {
  MongoClient.connect(url, function (err, con) {
    if (err) throw err;
    con
      .db("WaveFlow")
      .collection("Playlist")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;

        

        //db.close(); //armazenar a conexão do db em variavel antes de fechar o db.
        return res.json(result);
      });
  });
  //res.json(playlists);
});

server.get("/users/login", (req, res) => {
  let nome = req.query.nome;
  let senha = req.query.senha;

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

server.put("/users/login", (req, res) => {
  let nome = req.query.nome;

  let body = req.body;

  userFilter = users.filter((p) => p.nome == nome);
  console.log(userFilter);

  console.log(body);

  for (var z = 0; z < users.length; z++) {
    if (users[z].nome == userFilter[0].nome) {
      users[z].nome = body.nome;
    }
  }

  res.json(users);
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

  play = playlists.find((p) => p.id == id);

  console.log(body);
  console.log(play);
  play.nome = body.nome;

  for (var z = 0; z < body.musicas.length; z++) {
    if (play.musicas[z] == null) {
      play.musicas.push(body.musicas[z]);
    } else if (play.musicas[z].id == body.musicas[z].id) {
      play.musicas[z].nome = body.musicas[z].nome;
      play.musicas[z].src = body.musicas[z].src;
    }
  }

  for (var z = 0; z < playlists.length; z++) {
    if (playlists[z].id == play.id) {
      for (var x = 0; x < playlists[z].musicas.length; x++) {
        if (playlists[z].musicas[x] == null) {
          playlists[z].musicas[x].push(play.musicas[z]);
        }
        playlists[z].musicas[x].nome = play.musicas[x].nome;
        playlists[z].musicas[x].src = play.musicas[x].src;
      }
    }
  }
  res.json(play);
});

server.listen(3002);
