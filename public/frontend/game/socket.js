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

const postGameAnswer = document.getElementById("postgame_answer");
const postGameDiv = document.getElementById("postgame");
const postPseudoField = document.getElementById("post_username");
const postAnswerField = document.getElementById("post_answer");

const answerField = document.getElementById("rep-field");
const timerField = document.getElementById("timer_container");

const validateButton = document.getElementById("post_button");
const nextButton = document.getElementById("next_button");

const questionField = document.getElementById("question");
const imageField = document.getElementById("image_field");

const bonusField = document.getElementById("bonuses");
const bonusList = document.getElementById("bonus_list");
const bonusButton = document.getElementById("bonus_btn");

const rankingField = document.getElementById("scores");
const rankingList = document.getElementById("score_list");

const socket = io();

var adress = window.location.href;
adress = adress.split("/");
adress = adress[2];
adress = "http://" + adress;

socket.on("connect", () => {
  socket.emit("join", userId, displayName);

  if (roomId) {
    socket.emit("rejoinRoom", { roomId, userId, context: "game" });
  } else {
    window.location.href = adress;
  }
});

socket.on("newQuestion", (question) => {
  document.getElementById("question").innerHTML = question.question;
  document.getElementById("image_field").src = "../" + question.img_path;
  document.getElementById("image_field").alt = question.question;
});
socket.on("timer", (timer) => {
  document.getElementById("timer").innerHTML = timer;
});

let response = " ";

document.getElementById("rep-field").addEventListener("input", (e) => {
    response = e.target.value;
});

socket.on("need_response", (nb_quest) => {
    socket.emit("response", userId, roomId, response, nb_quest);
    document.getElementById("rep-field").value = "";
    response = " ";
});

socket.on("postgame_change_button_state", (state) => {
  if (state) {
    validateButton.classList.remove("invalid");
    validateButton.classList.add("valid");
    validateButton.innerHTML = "Valide";
  } else {
    validateButton.classList.remove("valid");
    validateButton.classList.add("invalid");
    validateButton.innerHTML = "Invalide";
  }
});

socket.on("postgame_start", (room) => {
  switchPostGame();
  const firstQuestion = room.questions[0];
  const firstPlayer = room.players[0];
  document.getElementById("question").innerHTML = firstQuestion.question;
  document.getElementById("image_field").src = "../" + firstQuestion.img_path;
  document.getElementById("image_field").alt = firstQuestion.question;
  postGameAnswer.innerHTML = firstQuestion.answer;
  postPseudoField.innerHTML = firstPlayer.name;
  postAnswerField.innerHTML = firstPlayer.answers[0];
  if (room.host === userId) {
    validateButton.addEventListener("click", () => {
      if (validateButton.classList.contains("hidden")) {
        return;
      }
      if (validateButton.classList.contains("invalid")) {
        validateButton.classList.remove("invalid");
        validateButton.classList.add("valid");
        validateButton.innerHTML = "Valide";
        socket.emit("postgame_button_state", roomId, true);
      } else if (validateButton.classList.contains("valid")) {
        validateButton.classList.remove("valid");
        validateButton.classList.add("invalid");
        validateButton.innerHTML = "Invalide";
        socket.emit("postgame_button_state", roomId, false);
      }
    });

    nextButton.addEventListener("click", () => {
      if (nextButton.classList.contains("hidden")) {
        return;
      }
      if (validateButton.classList.contains("invalid")) {
        socket.emit("postgame_validate", roomId, false);
      } else if (validateButton.classList.contains("valid")) {
        socket.emit("postgame_validate", roomId, true);
        validateButton.classList.remove("valid");
        validateButton.classList.add("invalid");
        validateButton.innerHTML = "Invalide";
      }
    });
  } else {
    nextButton.classList.add("hidden");
  }
});

socket.on("postgame_update", (room) => {
  const question = room.questions[room.review_quest];
  const player = room.players[room.review_player];
  document.getElementById("question").innerHTML = question.question;
  document.getElementById("image_field").src = "../" + question.img_path;
  document.getElementById("image_field").alt = question.question;
  postGameAnswer.innerHTML = question.answer;
  postPseudoField.innerHTML = player.name;
  postAnswerField.innerHTML = player.answers[room.review_quest];
  if (room.host === userId) {
    validateButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  } else {
    validateButton.classList.remove("valid");
    validateButton.classList.add("invalid");
    validateButton.innerHTML = "Invalide";
    nextButton.classList.add("hidden");
  }
});

socket.on("redirectHome", () => {
  window.location.href = adress;
  sessionStorage.removeItem("roomId");
  sessionStorage.removeItem("gameName");
  sessionStorage.removeItem("gameId");
});

socket.on("redirectCreateGame", () => {
  window.location.href = adress + "/game/start";
  sessionStorage.removeItem("roomId");
  sessionStorage.removeItem("gameName");
  sessionStorage.removeItem("gameId");
});

socket.on("postgame_end", (room) => {
  postgame = false;
  postGameAnswer.classList.add("hidden");
  questionField.classList.add("hidden");
  imageField.classList.add("hidden");
  postGameDiv.classList.add("hidden");
  players = room.players;
  bonusList.innerHTML = "";
  players.forEach((player) => {
    addPlayerToBonuses(player, room);
  });
  if (userId != room.host) {
    bonusButton.classList.add("hidden");
  }
  bonusField.classList.remove("hidden");
  const bonusesPlus = document.querySelectorAll(".bonus_elem_add");
  const bonusesMinus = document.querySelectorAll(".bonus_elem_remove");
  bonusesPlus.forEach((bonus) => {
    bonus.addEventListener("click", () => {
      const parent = bonus.closest(".bonus_elem");
      const scoreElem = parent.querySelector(".bonus_elem_score");
      let score = parseInt(scoreElem.innerHTML) + 1;
      scoreElem.innerHTML = score;
      socket.emit("bonus", roomId, parent.id, score);
    });
  });
  bonusesMinus.forEach((bonus) => {
    bonus.addEventListener("click", () => {
      const parent = bonus.closest(".bonus_elem");
      const scoreElem = parent.querySelector(".bonus_elem_score");
      let score = parseInt(scoreElem.innerHTML) - 1;
      scoreElem.innerHTML = score;
      socket.emit("bonus", roomId, parent.id, score);
    });
  });


});

const switchPostGame = () => {
  if (postgame) {
  } else {
    postgame = true;
    postGameAnswer.classList.remove("hidden");
    postGameDiv.classList.remove("hidden");
    answerField.classList.add("hidden");
    timerField.classList.add("hidden");
  }
};

const addPlayerToBonuses = (player, room) => {
  bonusList.innerHTML += `
    <div id="${player.id}" class="bonus_elem">
          <span class="bonus_elem_pseudo">${player.name}</span>
          ${(userId == room.host) 
            ? '<div class="bonus_elem_btn"><i class="bx bx-message-alt-add bonus_elem_add"></i><i class="bx bx-message-alt-minus bonus_elem_remove"></i></div>' 
            : ''
          }
          <span class="bonus_elem_score">0</span>
        </div>`;
    
}

bonusButton.addEventListener("click", () => {
  if (bonusField.classList.contains("hidden")) {
    return;
  } else {
    socket.emit("rankings", roomId);
  }
});

socket.on("updateBonuses", (room) => {
  const elems = bonusList.querySelectorAll(".bonus_elem");
  elems.forEach((elem) => {
    const player = room.players.find((player) => player.id == elem.id);
    if (player) {
      const scoreElem = elem.querySelector(".bonus_elem_score");
      if(player.bonus != undefined) scoreElem.innerHTML = player.bonus;
      else scoreElem.innerHTML = 0;
    }
  });
});

socket.on("show_ranking", (room) => {
  bonusField.classList.add("hidden");
  players = room.players;
  rankingList.innerHTML = "";
  for (let i = 0; i < players.length; i++) {
    rank = "";
    if (!i) rank = "1er";
    else rank = i + 1 + "ème";
    rankingList.innerHTML += `
        <div id="${players[i].id}" class="score_elem">
        <span class="elem_elem_rank">${rank}</span>    
        <span class="elem_elem_pseudo">${players[i].name}</span>
            <span class="elem_elem_score">${players[i].score}</span>
        </div>`;
  }
  rankingField.classList.remove("hidden");

});

document.getElementById("score_btn").addEventListener("click", () => {
  if (rankingField.classList.contains("hidden")) {
    return;
  } else {
    sessionStorage.removeItem("roomId");
    window.location.href = adress + "/game/start";
  }
});