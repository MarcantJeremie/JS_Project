const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { Server } = require("socket.io");
const http = require("http");
const { playGame, getQuestion } = require("./game_manager");
const { set } = require("mongoose");

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

app.use("/requests", require("./routes/client_requests.routes"));

app.use("/game", require("./routes/game.routes"));

app.use("/register", require("./routes/register.routes"));

app.use("/login", require("./routes/login.routes"));

app.use("/questions", require("./routes/questions.routes"));

app.use("/delete", require("./routes/delete_account.routes"));


var answermap = new Map();
var currentQuestion = 0;
var timer = 30;

const startGame = setInterval(() => {
  timer--;
  io.emit("timer", timer);
  if (timer == 0) {
    io.emit("need_response", currentQuestion);
    currentQuestion++;
    timer = 30;
    io.emit("newQuestion", getQuestion(currentQuestion));
  }}, 1000);

  
var params = [5, ["TEST", "OUPI"], 2, 2, 1, 0];
io.on("connection", (socket) => {
  
  socket.on("start_lobby", (params) => {
    playGame(params);
    console.log("Game started");
    startGame;

  });
  
  socket.on("response", (userId, response, question) => {
    answermap.get(userId)[question] = response;
    console.log(answermap);
    console.log("got the response")
  });

  // Réception de la commande pour démarrer le timer
  socket.emit("newQuestion", getQuestion(currentQuestion));

  socket.on("join", (userId, displayName) => {
    console.log("User joined with id:", userId, " his name is ", displayName);
    answermap.set(userId, []);
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

// import { getQuestion } from "./game_manager";


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
