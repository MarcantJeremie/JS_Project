const startGame = (io)=> setInterval(() => {
  timer--;
  io.emit("timer", timer);
  if (timer == 0) {
    io.emit("need_response", currentQuestion);
    currentQuestion++;
    timer = 30;
    io.emit("newQuestion", getQuestion(currentQuestion));
  }}, 1000);



module.exports = function(io){
    var rooms = new Map();
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
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
            rooms.forEach((room, roomId) => {
                room.players = room.players.filter(player => player.socket !== socket.id);

                io.to(roomId).emit("updateRoomData", room);
                
            });
        });
    });

}