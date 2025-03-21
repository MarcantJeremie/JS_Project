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

const selectElement = document.querySelector("select");
selectElement.style.color = "green";

selectElement.addEventListener("change", (e) => {
    let select = e.target.value;

    switch (select){
        case "1":
            selectElement.style.color = "green";
            break;
        case "2":
            selectElement.style.color = "orange";
            break;
        case "3":
            selectElement.style.color = "red";
            break;
        case '4':
            selectElement.style.color = "purple";
            break;
        default:
            selectElement.style.color = "black";
    }
    
});
