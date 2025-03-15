const selection_button = document.getElementById("selection-button");
const selection_button_login = document.getElementById("login");
const selection_button_signin = document.getElementById("signin");
const selected_button = document.getElementById("selected-button");

const form_connection = document.getElementById("form-connection");
const form_register = document.getElementById("form-register");

const changeSelectionLoginPage = () => {
  selected_button.classList.toggle("left");
  selected_button.classList.toggle("right");

  form_register.classList.toggle("hide-left");
  form_connection.classList.toggle("hide-right");
};

//

selection_button.addEventListener("click", changeSelectionLoginPage);

//

const back_to_menu_button = document.getElementById("back-to-menu");

back_to_menu_button.addEventListener("click", () => {
  adress = window.location.href;
  adress = adress.split("/");
  adress = adress[adress.length - 2];
  adress = "http://" + adress;
  window.location.href = adress + "/";
});
