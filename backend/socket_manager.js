const { getQuestion } = require("./game_manager");

var rooms = new Map();

const startGame = (io, roomId, params)=> setInterval(() => {
  let room = rooms.get(roomId);
  room.timer = room.timer - 1;
  io.emit("timer", room.timer);
  if (room.timer == 0) {
    io.to(roomId).emit("need_response", room.currentQuestion);
    room.currentQuestion++;
    room.timer = params.timer_duration;
    io.to(roomId).emit("newQuestion", getQuestion(room.currentQuestion));
  }}, 1000);



module.exports = function(io){
    io.on("connection", (socket) => {
        console.log("New connection");
    
        socket.on("createRoom", ({playerName, UserLogin}, callback) =>{
            const roomId = Math.random().toString(36).substring(2, 7);
            rooms.set(roomId, {
                players: [{id: UserLogin, name: playerName, score: 0, host: true}],
                host: UserLogin
            });
            socket.join(roomId);
            io.in(roomId).fetchSockets().then((sockets) => {
                console.log("Sockets currently in room", roomId, ":", sockets.map(s => s.id));
            });
            callback({roomId, role: "Host"});
            console.log(rooms);
            console.log(rooms.get(roomId).players);
            io.to(roomId).emit("updateRoomData", rooms.get(roomId));
        })  
        
        socket.on("joinRoom", ({roomId, playerName, UserLogin}, callback) =>{
            if(rooms.get(roomId) === undefined){
                return callback({error: "Room not found"});
            }
            if(rooms.get(roomId).players.length >= 10){
                return callback({error: "Room is full"});
            }
            if(rooms.get(roomId).players.find(player => player.id === UserLogin)){
                return callback({error: "You are already in this room"});
            }
            rooms.get(roomId).players.push({id: UserLogin, name: playerName, score: 0, host: false});
            socket.join(roomId);
            io.in(roomId).fetchSockets().then((sockets) => {
                console.log("Sockets currently in room", roomId, ":", sockets.map(s => s.id));
            });
            callback({roomId, role: "Player"});
            console.log(rooms);
            console.log(rooms.get(roomId).players);
            io.to(roomId).emit("updateRoomData", rooms.get(roomId));
        })

        socket.on("getDisplayInfo", ({roomId}, callback) =>{
            let room = rooms.get(roomId);
            if(room){
                callback(room);
            }else{
                callback({error: "Room not found"});
            }  
        });
        
        socket.on("rejoinRoom", ({roomId, userId}) => {
            socket.join(roomId);
            const room = rooms.get(roomId);
            room.players[room.players.findIndex(player => player.id === userId)].socket = socket.id;
            console.log(`Socket ${socket.id} rejoined room ${roomId}`);
            if (socket.disconnectTimeout) {
                clearTimeout(socket.disconnectTimeout);
            }
    
            console.log(`Player ${userId} reconnected with socket ${socket.id}`);
            io.to(roomId).emit("updateRoomData", room);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        
            // On attend 10 secondes avant de supprimer réellement
            socket.disconnectTimeout = setTimeout(() => {
                rooms.forEach((room, roomId) => {
                    const updatedPlayers = room.players.filter(p => p.socket !== socket.id);
                    if (updatedPlayers.length !== room.players.length) {
                        room.players = updatedPlayers;
                        io.to(roomId).emit("updateRoomData", room);
                    }
                });
            }, 10000); // 10 secondes de "grâce"
        });

        socket.on("hostParameters", ({roomId, data}) => {
            const room = rooms.get(roomId);
            if (room) {
                room.parameters = data;
                io.to(roomId).emit("updateRoomData", room);
            }
            
        });

        socket.on("moveToGame", ({roomId}) => {
            const room = rooms.get(roomId);
            if (room) {
                io.to(roomId).emit("startGame", room);
                room.timer = room.parameters.timer_duration;
                room.currentQuestion = 0;
                room.questions = searchForQuestions(room.parameters);
                startGame(io, roomId, room.parameters);
            }
        });

    });
}