document.addEventListener("DOMContentLoaded", () => {
  let playBtn = document.querySelector(".play-button");

  adress = window.location.href;
  adress = adress.split("/");
  adress = adress[adress.length - 2];
  adress = "http://" + adress;

  console.log(adress);

  playBtn.addEventListener("click", () => {
    // window.location.href = adress + "/game/start";
  });

  let logBtn = document.getElementById("log-button");

  adress = window.location.href;
  adress = adress.split("/");
  adress = adress[adress.length - 2];
  adress = "http://" + adress;

  console.log(adress);

  logBtn.addEventListener("click", () => {
    if (sessionStorage.getItem("IsConnect") == "true") {
      window.location.href = adress + "/profile/account";
    } else {
      window.location.href = adress + "/profile/login";
    }
  });
});
