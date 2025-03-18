let countdown;
function startTimer() {
    clearInterval(countdown);
    let timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;
    countdown = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Temps écoulé !");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(countdown);
}