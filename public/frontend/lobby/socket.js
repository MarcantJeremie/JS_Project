const socket = io(); 

const roomId = sessionStorage.getItem("roomId");
const pseudo = sessionStorage.getItem("gameName");
const userId = sessionStorage.getItem("gameId");

if (roomId){
    socket.emit("getDisplayInfo", {roomId}, (data) => {
        room = data;
        if (room.error){
            alert(room.error);
            return;
        }
        if (room.host === userId){
            // Host
            window.is_host = true;
            
        }
        else{
            // Player
            window.is_host = false;
            document.querySelectorAll("input").forEach((elem) => {
                elem.setAttribute("disabled", "disabled");
              });
        }
        room.players.forEach(player => {    
            window.addPlayerToList(player.id, player.name, 1, player.host);
        });
        window.SelectedPlayerAddEventListener();
    });
}