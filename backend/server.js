const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { Server } = require("socket.io");
const http = require("http");
const { playGame, getQuestion } = require("./game_manager");
const { set } = require("mongoose");
const session = require("express-session");

const port = process.env.PORT;

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const socketManager = require("./socket_manager");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("*", require("./routes/updateconnection.routes"));

app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/pending_routes.routes"));

app.use("/profile", require("./routes/profile.routes"));

app.use("/requests", require("./routes/client_requests.routes"));

app.use("/game", require("./routes/game.routes"));

app.use("/register", require("./routes/register.routes"));

app.use("/login", require("./routes/login.routes"));

app.use("/questions", require("./routes/questions.routes"));

app.use("/accounts", require("./routes/accounts.routes"));





socketManager(io);


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

const gracefulShutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

// Capture plusieurs événements
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('exit', gracefulShutdown);
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  gracefulShutdown();
});