const logButton = document.getElementById("log-button");
window.connectWithCookie();

const displayConnectButton = () => {
  const is_connect = sessionStorage.getItem("IsConnect");

  if (is_connect == "true") {
    logButton.classList.add("connected");
    logButton.classList.remove("log");
    logButton.textContent = "profil";
  } else {
    logButton.classList.remove("connected");
    logButton.classList.add("log");
    logButton.textContent = "connexion";
  }
};

// Partie code

displayConnectButton();