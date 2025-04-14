const socket = io(); 

const roomId = sessionStorage.getItem("roomId");
const pseudo = sessionStorage.getItem("gameName");
const userId = sessionStorage.getItem("gameId");

show_code_party.innerHTML = roomId;
context = "lobby";

if (roomId){
    socket.emit("rejoinRoom", { roomId, userId, context});

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
        list_players.innerHTML = "";
        room.players.forEach(player => {    
            window.addPlayerToList(player.id, player.name, 1, player.host);
        });
        window.SelectedPlayerAddEventListener();
    });
}

const sendParameters = () => {
    nb_quest1 = parseInt(easy_question_number.value);
    nb_quest2 = parseInt(medium_question_number.value);
    nb_quest3 = parseInt(hard_question_number.value);
    nb_quest4 = parseInt(accoustic_question_number.value);
    try{timer_duration = parseInt(list_time.querySelector("input:checked").value);}
    catch (e){
        timer_duration = -1;
    }
    tags = [];
    list_selected_tag.querySelectorAll(".tag").forEach((elem) => {
        tags.push(elem.getAttribute("id"));
    });
    total_question = nb_quest1 + nb_quest2 + nb_quest3 + nb_quest4;
    socket.emit("hostParameters", {roomId, data: {total_question, tags, nb_quest1, nb_quest2, nb_quest3, nb_quest4, timer_duration}})
}

params.addEventListener("submit", (e) => {
    e.preventDefault();
    sendParameters();

    socket.emit("moveToGame", { roomId });
    
});

socket.on("connect", ()=>{
    

    
});

socket.on("redirectHome", ()=>{
    window.location.href = adress;
    sessionStorage.removeItem("roomId");
    sessionStorage.removeItem("gameName");
    sessionStorage.removeItem("gameId");
});

socket.on("startGame", async (room) => {
    window.location.href = adress + "/game/game";
    sessionStorage.setItem("roomId", roomId);
    sessionStorage.setItem("gameName", pseudo);
    sessionStorage.setItem("gameId", userId);
});
    

socket.on("updateRoomData", (data) => {
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
    list_players.innerHTML = "";
    room.players.forEach(player => {    
        window.addPlayerToList(player.id, player.name, 1, player.host);
    });
    parameters = room.parameters;
    if (parameters){
        easy_question_number.value = parameters.nb_quest1;
        medium_question_number.value = parameters.nb_quest2;
        hard_question_number.value = parameters.nb_quest3;
        accoustic_question_number.value = parameters.nb_quest4;
        list_time.querySelectorAll("input").forEach((elem) => {
            if (elem.value == parameters.timer_duration){
                elem.checked = true;
            }
        });
        list_selected_tag.innerHTML = "";
        parameters.tags.forEach((tag) => {
            
            window.addTagToList(tag, tag);
            selected_tag.push(tag);
            
        });
    }
    else{
        easy_question_number.value = 0;
        medium_question_number.value = 0;
        hard_question_number.value = 0;
        accoustic_question_number.value = 0;
        
        selected_tag = [];
    }
    window.SelectedPlayerAddEventListener();
    window.selectedTagAddEventListener();
});

let interval = null;
// Sauvegarde toutes les 2 secondes les données des champs du host
interval = setInterval(() => {
    if (!window.is_host){
        return;
    }
    sendParameters();
}, 2000);
