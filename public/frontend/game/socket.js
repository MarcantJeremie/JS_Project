let userId;
let displayName;
var user;

if (window.getItemWithExpiration("CanPlay") === "true") {
    userId = sessionStorage.getItem("UserLogin");
    displayName = window.getItemWithExpiration("DisplayName");
    if (!displayName){
        window.getUser(userId).then((data) => {
            user = data;
            displayName = user.displayName;
            window.setItemWithExpiration("DisplayName", displayName, 1);
        });
    }
}
else{
    userId = generateUniqueId();
    window.setItemWithExpiration("UserLogin", userId, 1);

    displayName = window.prompt("Please enter your name");
    window.setItemWithExpiration("DisplayName", displayName, 1);

    
    window.setItemWithExpiration("CanPlay", "true", 1)
}

const socket = io();

function generateUniqueId() {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `${timestamp}-${randomSuffix}`;
}

socket.on("connect", () => {
    socket.emit("join", userId, displayName);


    
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
