const back_to_menu_button = document.getElementById("back-to-menu");

adress = window.location.href;
adress = adress.split("/");
adress = adress[2];
adress = "http://" + adress;

back_to_menu_button.addEventListener("click", () => {
    window.location.href = adress + "/";
});

creation_form = document.getElementById("creation");

creation_form.addEventListener("submit", (e) => {
    e.preventDefault();
    formData = new FormData(creation_form);
    console.log("nous y est");
    fetch(adress + "/questions/submit", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.message){
                alert(data.message);
            } else {
                alert("Question submitted");
                window.location.href = adress + "/";
            }
        });

});