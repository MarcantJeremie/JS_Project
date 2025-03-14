const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
//Ajout
const { Server } = require("socket.io");
const http = require("http");

const port = process.env.PORT;

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/pending_routes.routes"));

app.use("/profile", require("./routes/profile.routes"));

app.use('/requests', require('./routes/client_requests.routes'))

app.use('/game', require('./routes/game.routes'));

app.use("/register", require("./routes/register.routes"));

app.use("/login", require("./routes/login.routes"));

//Timer part
let timer = 30;
let interval = null;

function startTimer() {
  if (!interval) {
    interval = setInterval(() => {
      if (timer > 0) {
        timer--;
        io.emit("timerUpdate", timer); // Envoie la mise à jour à tous les clients
      } else {
        clearInterval(interval);
        interval = null;
      }
    }, 1000);
  }
}

io.on("connection", (socket) => {
  // Envoie le temps actuel au nouveau client
  socket.emit("timerUpdate", timer);

  // Réception de la commande pour démarrer le timer
  socket.on("startTimer", () => {
    if (!interval) {
      console.log("Le timer démarre !");
      startTimer();
      io.emit("timerStarted"); // Notifie tous les clients que le timer démarre
    }
  });

  socket.on("join", (userId) => {
    console.log("User joined with id:", userId);
  });

  socket.on("disconnect", () => {
    console.log("Un client s'est déconnecté :", socket.id);
  });
});

// à mettre dans le html à mettre pour connecter les joueurs :
// let userId = localStorage.getItem('userId');

// if (!userId) {
//     userId = Date.now();  // Utilisation de l'horodatage comme ID unique (ou tu peux utiliser un autre générateur d'ID)
//     localStorage.setItem('userId', userId); // Sauvegarder dans le localStorage
// }
// const socket = io();
// socket.on("connect", () => {
//     socket.emit("join", userId);
// });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
