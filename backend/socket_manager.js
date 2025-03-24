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
            rooms[roomId] = {
                players: [{id: UserLogin, name: playerName, score: 0, host: true}],
                host: UserLogin
            }
            socket.join(roomId);
            callback({roomId, role: "Host"});
            console.log(rooms);
            console.log(rooms[roomId].players);
            io.to(roomId).emit("updateRoomData", rooms[roomId]);
        })  
        
        socket.on("joinRoom", ({roomId, playerName, UserLogin}, callback) =>{
            if(rooms[roomId] === undefined){
                return callback({error: "Room not found"});
            }
            rooms[roomId].players.push({id: UserLogin, name: playerName, score: 0, host: false});
            socket.join(roomId);
            callback({roomId, role: "Player"});
            console.log(rooms);
            console.log(rooms[roomId].players);
            io.to(roomId).emit("updateRoomData", rooms[roomId]);
        })
        
    });

}