const selection_button = document.getElementById("selection-button");
const selection_button_login = document.getElementById("login");
const selection_button_signin = document.getElementById("signin");
const selected_button = document.getElementById("selected-button");

const form_connection = document.getElementById("form-connection");
const form_register = document.getElementById("form-register");
const form_modify = document.getElementById("form-modify");

adress = window.location.href;
adress = adress.split("/");
adress = adress[2];
adress = "http://" + adress;

const back_to_menu_button = document.getElementById("back-to-menu");

back_to_menu_button.addEventListener("click", () => {
  window.location.href = adress + "/";
});

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

// Partie des boutons de la page account

try {
  const submit_form_modify = form_modify.querySelector('input[type="submit"]');

  const account_modify_button = document.getElementById("modify-account");
  const account_disconnect_button = document.getElementById("disconnect");
  const account_remove_button = document.getElementById("remove");

  const show_pseudo = document.getElementById("show-pseudo");
  const show_email = document.getElementById("show-email");
  const show_previous_password = document.getElementById(
    "show-previous-password"
  );
  const show_new_password = document.getElementById("show-new-password");
  const show_confirm_new_password = document.getElementById(
    "show-confirm-new-password"
  );

  window.getUser(sessionStorage.getItem("UserLogin")).then((data) => {
    show_email.innerText = data.email;
    show_pseudo.innerText = data.displayName;

    document.getElementById("M-pseudo").setAttribute("value", data.displayName);
    document.getElementById("M-email").setAttribute("value", data.email);
  });
  // Partie des boutons de la page account

  account_modify_button.addEventListener("click", () => {
    account_disconnect_button.setAttribute("disabled", "disabled");
    account_modify_button.setAttribute("disabled", "disabled");
    account_remove_button.setAttribute("disabled", "disabled");
    show_email.setAttribute("disabled", "disabled");
    show_pseudo.setAttribute("disabled", "disabled");

    submit_form_modify.removeAttribute("disabled");
    show_previous_password.removeAttribute("disabled");
    show_new_password.removeAttribute("disabled");
    show_confirm_new_password.removeAttribute("disabled");
    document.querySelectorAll("input[type='text']").forEach((element) => {
      element.removeAttribute("disabled");
    });
  });

  account_disconnect_button.addEventListener("click", () => {
    sessionStorage.removeItem("UserLogin");
    sessionStorage.removeItem("IsConnect");
    localStorage.removeItem("UserLogin");
    localStorage.removeItem("DisplayName");
    localStorage.removeItem("CanPlay");
    window.location.href = adress + "/profile/login";
  });

  account_remove_button.addEventListener("click", (e) => {
    e.preventDefault();
    userpswd = prompt("Please enter your password to delete your account");

    login = sessionStorage.getItem("UserLogin");

    // fetch pour delete un compte

    fetch(adress + "/accounts/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: userpswd,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          if (data.message === "Account deleted") {
            sessionStorage.removeItem("UserLogin");
            sessionStorage.removeItem("IsConnect");
            localStorage.removeItem("UserLogin");
            localStorage.removeItem("DisplayName");
            localStorage.removeItem("CanPlay");
            window.location.href = adress + "/profile/login";
            alert("Your account has been deleted");
          } else {
            alert(data.message);
          }
        }
      });
  });

  form_modify.addEventListener("submit", (e) => {
    e.preventDefault();
    form_data = new FormData(form_modify);
    login = sessionStorage.getItem("UserLogin");
    oldPassword = form_data.get("M-previous-password");
    newPassword = form_data.get("M-new-password");
    email = form_data.get("M-email");
    displayName = form_data.get("M-pseudo");
    confirmPassword = form_data.get("M-confirm-new-password");
    if (!displayName) {
      displayName = login;
    }
    if (newPassword || confirmPassword) {
      if (newPassword.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    } else {
      newPassword = oldPassword;
    }
    fetch(adress + "/accounts/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        oldPassword: oldPassword,
        newPassword: newPassword,
        email: email,
        displayName: displayName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
        }
        window.location.href = adress + "/profile/account";
      });
  });
} catch (e) {}
