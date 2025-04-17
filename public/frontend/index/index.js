document.addEventListener("DOMContentLoaded", () => {
  let playBtn = document.querySelector(".play-button");

  adress = window.location.href;
  adress = adress.split("/");
  adress = adress[adress.length - 2];
  adress = "http://" + adress;

  playBtn.addEventListener("click", () => {
    window.location.href = adress + "/game/start";
  });

  let logBtn = document.getElementById("log-button");


  logBtn.addEventListener("click", () => {
    if (sessionStorage.getItem("IsConnect") == "true") {
      window.location.href = adress + "/profile/account";
    } else {
      window.location.href = adress + "/profile/login";
    }
  });

  let addQuestionBtn = document.getElementById("add-question-button");


  addQuestionBtn.addEventListener("click", () => {
    window.location.href = adress + "/questions/create";
  });
});
