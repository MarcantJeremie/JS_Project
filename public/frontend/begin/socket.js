const socket = io();


window.createRoom = (userId, displayName) => {
    socket.emit("createRoom", {playerName: displayName, UserLogin: userId}, (data) => {
        if (data.error) {
            alert(data.error);
            return;
        }
        sessionStorage.setItem("roomId", data.roomId);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("gameName", displayName);
        sessionStorage.setItem("gameId", userId);
    });

}

window.joinRoom = (roomId, userId, displayName) => {
    socket.emit("joinRoom", {roomId, playerName: displayName, UserLogin: userId}, (data) => {
        if (data.error) {
            alert(data.error);
            return;
        }
        sessionStorage.setItem("roomId", data.roomId);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("gameName", displayName);
        sessionStorage.setItem("gameId", userId);
    });
}