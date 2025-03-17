const selection_button = document.getElementById("selection-button");
const selection_button_login = document.getElementById("login");
const selection_button_signin = document.getElementById("signin");
const selected_button = document.getElementById("selected-button");

const form_connection = document.getElementById("form-connection");
const form_register = document.getElementById("form-register");

adress = window.location.href;
adress = adress.split("/");
adress = adress[adress.length - 2];
adress = "http://" + adress;

const changeSelectionLoginPage = () => {
  selected_button.classList.toggle("left");
  selected_button.classList.toggle("right");

  form_register.classList.toggle("hide-right");
  form_connection.classList.toggle("hide-left");
};

//

selection_button.addEventListener("click", changeSelectionLoginPage);

//

const back_to_menu_button = document.getElementById("back-to-menu");

back_to_menu_button.addEventListener("click", () => {
  window.location.href = adress + "/";
});

form_register.addEventListener("submit", (e) => {
  form_data = new FormData(form_register);
  login = form_data.get("R-login");
  password = form_data.get("R-password");
  email = form_data.get("email");

  fetch(adress + "/register", {});
});
