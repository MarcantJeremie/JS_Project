const get_pseudo = document.getElementById("show-pseudo").lastElementChild;
const join_game_button = document.getElementById("join-game");
const create_game_button = document.getElementById("create-game");
const list_button_begin = document.querySelectorAll(".button-begin");
const little_text = document.querySelector(".little");

const div_start_game = document.getElementById("start-game");
const div_join_game = document.getElementById("div-join-game");
const div_create_game = document.getElementById("div-create-game");

const clickOnButton = (event) => {
  div_start_game.classList.add("hide");
  if (event.target.id == join_game_button.id) {
    div_join_game.classList.remove("hide");
  } else if (event.target.id == create_game_button.id) {
    div_create_game.classList.remove("hide");
  }
};

get_pseudo.addEventListener("input", () => {
  if (get_pseudo.value.trim() !== "") {
    list_button_begin.forEach((elem) => {
      elem.classList.add("can-push");
      elem.addEventListener("click", clickOnButton);
    });
  } else {
    list_button_begin.forEach((elem) => {
      elem.classList.remove("can-push");
      elem.removeEventListener("click", clickOnButton);
    });
  }
});
