const selection_button = document.getElementById("selection-button");
const selection_button_login = document.getElementById("login");
const selection_button_signin = document.getElementById("signin");
const selected_button = document.getElementById("selected-button");

const form_connection = document.getElementById("form-connection");
const form_register = document.getElementById("form-register");

const account_modify_button = document.getElementById("modify-account");
const account_disconnect_button = document.getElementById("disconnect");
const account_remove_button = document.getElementById("remove");

adress = window.location.href;
adress = adress.split("/");
adress = adress[2];
adress = "http://" + adress;

const back_to_menu_button = document.getElementById("back-to-menu");

back_to_menu_button.addEventListener("click", () => {
  window.location.href = adress + "/";
});

try {
  const changeSelectionLoginPage = () => {
    selected_button.classList.toggle("left");
    selected_button.classList.toggle("right");

    form_register.classList.toggle("hide-right");
    form_connection.classList.toggle("hide-left");
  };

  //
  selection_button.addEventListener("click", changeSelectionLoginPage);
  //

  form_register.addEventListener("submit", (e) => {
    e.preventDefault();
    form_data = new FormData(form_register);
    login = form_data.get("R-login");
    password = form_data.get("R-password");
    email = form_data.get("R-email");
    displayName = form_data.get("R-pseudo");
    rememberme = form_data.get("R-horns");
    if (!displayName) {
      displayName = login;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    console.log(login);
    console.log(password);
    console.log(email);
    console.log(displayName);

    fetch(adress + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
        email: email,
        displayName: displayName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          sessionStorage.setItem("IsConnect", "true");
          sessionStorage.setItem("UserLogin", login);
          if (rememberme) {
            window.setItemWithExpiration("UserLogin", login, 30);
          }
          window.location.href = adress + "/profile/account";
        }
      });
  });

  form_connection.addEventListener("submit", (e) => {
    e.preventDefault();
    form_data = new FormData(form_connection);
    login = form_data.get("L-login");
    password = form_data.get("L-password");
    rememberme = form_data.get("L-horns");

    fetch(adress + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          sessionStorage.setItem("IsConnect", "true");
          sessionStorage.setItem("UserLogin", login);
          if (rememberme) {
            window.setItemWithExpiration("UserLogin", login, 30);
            window.setItemWithExpiration("CanPlay", "true", 30);
            window.getUser(login).then((data) => {
              window.setItemWithExpiration("DisplayName", data.displayName, 30);
            });
          } else {
            window.getUser(login).then((data) => {
              window.setItemWithExpiration("DisplayName", data.displayName, 1);
            });
          }

          window.location.href = adress + "/profile/account";
        }
      });
  });
} catch (e) {}

document
  .querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"]'
  )
  .forEach((elem) => {
    elem.addEventListener("input", (e) => {
      const label = elem.closest(".question").querySelector("label");

      if (e.target.value === "") {
        label.classList.remove("stay-up");
      } else {
        label.classList.add("stay-up");
      }
    });
  });

// Partie des boutons de la page account

account_disconnect_button.addEventListener("click", () => {
  sessionStorage.removeItem("UserLogin");
  sessionStorage.removeItem("IsConnect");
  localStorage.removeItem("UserLogin");
  window.location.href = adress + "/profile/login";
});

account_remove_button.addEventListener("click", () => {
  if (confirm("Vous êtes sûr de vouloir faire ça ?")) {
    sessionStorage.removeItem("UserLogin");
    sessionStorage.removeItem("IsConnect");
    localStorage.removeItem("UserLogin");

    // fetch pour delete un compte

    window.location.href = adress + "/profile/login";
  } else {
    history.back();
  }
});
