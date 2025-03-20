const back_to_menu_button = document.getElementById("back-to-menu");

adress = window.location.href;
adress = adress.split("/");
adress = adress[2];
adress = "http://" + adress;

back_to_menu_button.addEventListener("click", () => {
    window.location.href = adress + "/";
});