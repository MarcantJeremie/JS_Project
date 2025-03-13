document.addEventListener("DOMContentLoaded", () => {
  let playBtn = document.querySelector(".play-button");

  adress = window.location.href;
  adress = adress.split("/");
  adress = adress[adress.length - 2];
  adress = "http://" + adress;

  console.log(adress);

  playBtn.addEventListener("click", () => {
    window.location.href = adress + "/game/start";
  });
});

import { connectWithCookie } from "../global";

const logButton = document.getElementById("log-button");

connectWithCookie();
displayConnectButton();

const displayConnectButton = () => {
  const is_connect = sessionStorage.getItem("IsConnect");

  if (is_connect) {
    logButton.classList.add("connected");
    logButton.classList.remove("log");
    logButton.textContent = "profil";
  } else {
    logButton.classList.remove("connected");
    logButton.classList.add("log");
    logButton.textContent = "connexion";
  }
};
