let userId;
let displayName;
var user;
var roomId = sessionStorage.getItem("roomId");
var gameId = sessionStorage.getItem("gameId");
var gameName = sessionStorage.getItem("gameName");
var gameId = sessionStorage.getItem("gameId");
var postgame = false;
userId = sessionStorage.getItem("gameId");
displayName = sessionStorage.getItem("gameName");


const postGameDiv = document.getElementById("postgame");
const postPseudoField = document.getElementById("post_username");
const postAnswerField = document.getElementById("post_answer");

const answerField = document.getElementById("rep-field");
const timerField = document.getElementById("timer_container");

const validateButton = document.getElementById("post_button");
const nextButton = document.getElementById("next_button");

const socket = io();

var adress = window.location.href;
adress = adress.split("/");
adress = adress[2];
adress = "http://" + adress;


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
    document.getElementById("image_field").src = "../" + question.img_path;
    document.getElementById("image_field").alt = question.question;

});
socket.on("timer", (timer)=>{
    document.getElementById("timer").innerHTML = timer;
})

let resonse = "";

document.getElementById("rep-field").addEventListener("input", (e) => {
    response = e.target.value;
    console.log(response);
});


socket.on("need_response", (nb_quest) => {
    if (!response){
        response = " ";
    }
    socket.emit("response", userId, roomId, response, nb_quest);
    document.getElementById("rep-field").value = "";
    response = "";
});

socket.on("postgame_change_button_state", (state)=>{
    
    if(state){
        validateButton.classList.remove("invalid");
        validateButton.classList.add("valid");
        validateButton.innerHTML = "Valide";
    }
    else{
        validateButton.classList.remove("valid");
        validateButton.classList.add("invalid");
        validateButton.innerHTML = "Invalide";
    }
});



socket.on("postgame_start", (room) =>{
    switchPostGame();
    const firstQuestion = room.questions[0];
    const firstPlayer = room.players[0];
    document.getElementById("question").innerHTML = firstQuestion.question;
    document.getElementById("image_field").src = "../" + firstQuestion.img_path;
    document.getElementById("image_field").alt = firstQuestion.question;
    postPseudoField.innerHTML = firstPlayer.name;
    postAnswerField.innerHTML = firstPlayer.answers[0];
    if (room.host === userId){
        validateButton.addEventListener("click", ()=>{
            if(validateButton.classList.contains("hidden")){
                return;
            }
            if(validateButton.classList.contains("invalid")){
                validateButton.classList.remove("invalid");
                validateButton.classList.add("valid");
                validateButton.innerHTML = "Valide";
                socket.emit("postgame_button_state", roomId, true);
            }
            else if(validateButton.classList.contains("valid")){
                validateButton.classList.remove("valid");
                validateButton.classList.add("invalid");
                validateButton.innerHTML = "Invalide";
                socket.emit("postgame_button_state", roomId, false);
            }
        });
        
        nextButton.addEventListener("click", ()=>{
            if(nextButton.classList.contains("hidden")){
                return;
            }
            if(validateButton.classList.contains("invalid")){
                socket.emit("postgame_validate", roomId, false);
            }
            else if(validateButton.classList.contains("valid")){
                socket.emit("postgame_validate", roomId, true);
                validateButton.classList.remove("valid");
                validateButton.classList.add("invalid");
                validateButton.innerHTML = "Invalide";
            }
        });
    }
    else{
        nextButton.classList.add("hidden");
    }
    
});

socket.on("postgame_update", (room) =>{
    const question = room.questions[room.review_quest];
    const player = room.players[room.review_player];
    document.getElementById("question").innerHTML = question.question;
    document.getElementById("image_field").src = "../" + question.img_path;
    document.getElementById("image_field").alt = question.question;
    postPseudoField.innerHTML = player.name;
    postAnswerField.innerHTML = player.answers[room.review_quest];
    if (room.host === userId){
        validateButton.classList.remove("hidden");
        nextButton.classList.remove("hidden");
    }
    else{
        validateButton.classList.remove("valid");
        validateButton.classList.add("invalid");
        validateButton.innerHTML = "Invalide";
        nextButton.classList.add("hidden");
    }
});


socket.on("redirectHome", ()=>{
    window.location.href = adress;
    sessionStorage.removeItem("roomId");
    sessionStorage.removeItem("gameName");
    sessionStorage.removeItem("gameId");
});

socket.on("redirectCreateGame", ()=>{
    window.location.href = adress + '/game/start';
    sessionStorage.removeItem("roomId");
    sessionStorage.removeItem("gameName");
    sessionStorage.removeItem("gameId");
});

socket.on("postgame_end", ()=>{
    postgame = false;
    postGameDiv.classList.add("hidden");
    answerField.classList.remove("hidden");
    timerField.classList.remove("hidden");
    validateButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
});

const switchPostGame = () =>{
    if(postgame){
        
    }
    else{
        postgame = true;
        postGameDiv.classList.remove("hidden");
        answerField.classList.add("hidden");
        timerField.classList.add("hidden");
    }
}

