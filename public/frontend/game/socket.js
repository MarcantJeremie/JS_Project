let userId;
let displayName;
var user;
var roomId = sessionStorage.getItem("roomId");
var gameId = sessionStorage.getItem("gameId");
var gameName = sessionStorage.getItem("gameName");
var gameId = sessionStorage.getItem("gameId");

userId = sessionStorage.getItem("gameId");
displayName = sessionStorage.getItem("gameName");


const socket = io();



socket.on("connect", () => {
    socket.emit("join", userId, displayName);

    if(roomId) {
        socket.emit("rejoinRoom", { roomId, userId, context: "game" });
    }
    else{
        window.location.href = adress;
    }

    
});

socket.on("newQuestion", (question) => {
    document.getElementById("question").innerHTML = question.question;
});
socket.on("timer", (timer)=>{
    document.getElementById("timer").innerHTML = timer;
})

let resonse = "";

document.getElementById("rep-field").addEventListener("input", (e) => {
    response = e.target.value;
    console.log(response);
});


socket.on("need_response", (question) => {
    socket.emit("response", userId, response, question);
    document.getElementById("rep-field").value = "";
    response = "";
});
