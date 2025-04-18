const { getQuestion, searchForQuestions } = require("./game_manager");

var rooms = new Map();



const startGame = (io, roomId, params) => {
    let room = rooms.get(roomId);
    room.interval = setInterval(() => {
        if (room.currentQuestion > room.questions.length) {
            clearInterval(room.interval);
            return;
        }
        room.timer = room.timer - 1;
        io.to(roomId).emit("timer", room.timer); // Correction ici : .to(roomId)
        if (room.timer == 0) {
            io.to(roomId).emit("need_response", room.currentQuestion);
            room.currentQuestion++;
            room.timer = params.timer_duration;
            if (room.currentQuestion == room.questions.length) {
                postGameStart(io, roomId);
                clearInterval(room.interval); // Stop le timer ici aussi pour être safe
            } else if (room.currentQuestion < room.questions.length) {
                io.to(roomId).emit("newQuestion", room.questions[room.currentQuestion]);
            }
        }
    }, 1000);
};

const postGameStart = (io, roomId) => {
    let room = rooms.get(roomId);
    room.postGame = true;
    room.review_quest = 0;
    room.review_player = 0;
    io.to(roomId).emit("postgame_start", room); 
}

function getSafeRoomData(room) {
    const { interval, ...safeRoom } = room;
    return safeRoom;
}

module.exports = function(io){
    io.on("connection", (socket) => {
        console.log("New connection");
    
        socket.on("createRoom", ({playerName, UserLogin}, callback) =>{
            const roomId = Math.random().toString(36).substring(2, 7);
            rooms.set(roomId, {
                players: [{id: UserLogin, name: playerName, score: 0, host: true}],
                host: UserLogin,
                started: false
            });
            socket.join(roomId);
            io.in(roomId).fetchSockets().then((sockets) => {
                console.log("Sockets currently in room", roomId, ":", sockets.map(s => s.id));
            });
            callback({roomId, role: "Host"});
            io.to(roomId).emit("updateRoomData", getSafeRoomData(rooms.get(roomId)));
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
            io.to(roomId).emit("updateRoomData", getSafeRoomData(rooms.get(roomId)));
        })

        socket.on("getDisplayInfo", ({roomId}, callback) =>{
            let room = getSafeRoomData(rooms.get(roomId));
            if(room){
                callback(room);
            }else{
                callback({error: "Room not found"});
            }  
        });
        
        socket.on("rejoinRoom", ({roomId, userId, context}) => {
            const room = rooms.get(roomId);
            if (!room) {
                socket.emit("redirectCreateGame");
                return;
            }
            if (context === "lobby" && room.started === true) {
                socket.emit("redirectCreateGame");
                return;
            }
            socket.join(roomId);
            
            player = room.players[room.players.findIndex(player => player.id === userId)];
            if (player) player.socket = socket.id;
            console.log(`Socket ${socket.id} rejoined room ${roomId}`);
            if (socket.disconnectTimeout) {
                clearTimeout(socket.disconnectTimeout);
            }
    
            console.log(`Player ${userId} reconnected with socket ${socket.id}`);
            io.to(roomId).emit("updateRoomData", getSafeRoomData(room));
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        
            // On attend 10 secondes avant de supprimer réellement
            socket.disconnectTimeout = setTimeout(() => {
                rooms.forEach((room, roomId) => {
                    const updatedPlayers = room.players.filter(p => p.socket !== socket.id);
                    if (updatedPlayers.length !== room.players.length) {
                        room.players = updatedPlayers;
                        io.to(roomId).emit("updateRoomData", getSafeRoomData(room));
                    }
                });
            }, 10000); // 10 secondes de "grâce"
        });

        socket.on("hostParameters", ({roomId, data}) => {
            const room = rooms.get(roomId);
            if (room) {
                room.parameters = data;
                io.to(roomId).emit("updateRoomData", getSafeRoomData(room));
            }
            
        });

        socket.on("moveToGame", async ({roomId}) => {
            const room = rooms.get(roomId);
            if (room) {
                io.to(roomId).emit("startGame", room);
                room.timer = room.parameters.timer_duration;
                room.currentQuestion = 0;
                room.questions = await searchForQuestions(room.parameters);
                startGame(io, roomId, room.parameters);
                await new Promise(r => setTimeout(r, 2000));
                room.started = true;
                io.in(roomId).fetchSockets().then((sockets) => {
                    console.log("Sockets currently in room", roomId, ":", sockets.map(s => s.id));
                });
                io.to(roomId).emit("newQuestion", room.questions[room.currentQuestion]);
            }   
        });

        socket.on("response", (userId, roomId, response, nb_quest) => {
            const room = rooms.get(roomId);
            if (!room){
                return;
            }
            const player = room.players.find(player => player.id === userId);
            if (!player){
                return;
            }
            if (nb_quest == 0){
                player.answers = [];
                player.score = 0;
            }
            if( player.answers.length >= room.questions.length){
                return;
            }
            player.answers.push(response);
        });

        socket.on("postgame_button_state", (roomId, state) => {
            io.to(roomId).emit("postgame_change_button_state", state);
        });

        socket.on("postgame_validate", (roomId, state)=>{
            const room = rooms.get(roomId);
            if (!room){
                return;
            }
            const player = room.players[room.review_player];
            if (!player){
                return;
            }
            if (state) player.score++;
            room.review_player++;
            if (room.review_player == room.players.length){
                room.review_player = 0;
                room.review_quest++;
            }
            if (room.review_quest == room.questions.length){
                room.postGame = false;
                room.review_quest = 0;
                room.review_player = 0;
                io.to(roomId).emit("postgame_end", getSafeRoomData(room));
            }
            else{
                io.to(roomId).emit("postgame_update", getSafeRoomData(room));
            }
        });

        socket.on("bonus", (roomId, userId, bonus) => {
            const room = rooms.get(roomId);
            if (!room){
                return;
            }
            const player = room.players.find(player => player.id === userId);
            if (!player){
                return;
            }
            player.bonus = bonus;
            io.to(roomId).emit("updateBonuses", getSafeRoomData(room));
        });

        socket.on("rankings", (roomId) => {
            const room = rooms.get(roomId);
            if (!room){
                return;
            }
            room.players.forEach(player => {
                bonus = player.bonus || 0;
                player.score += bonus;
            });

            room.players.sort((a, b) => b.score - a.score);
            io.to(roomId).emit("show_ranking", getSafeRoomData(room));
        });

    });
}