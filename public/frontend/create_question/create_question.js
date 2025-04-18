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
    creator = sessionStorage.getItem("UserLogin");
    if (!creator){
        creator = window.getItemWithExpiration("UserLogin");
        if (!creator){
            alert("You are not connected, please connect to create a question.");
            window.location.href = adress + "/profile/login";
            return;
        }
    }
    formData.append("creator", creator);
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

document.addEventListener("DOMContentLoaded", function () {
    const tagsContainer = document.getElementById("tags-container");
    const tagsInput = document.getElementById("tags-input");
    const tagsHidden = document.getElementById("tags-hidden");
    const tagsList = document.getElementById("tags-list");

    let storedTags = [
        "tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10",];
    let selectedTags = [];

    function updateHiddenInput() {
        tagsHidden.value = selectedTags.join(",");
    }

    function createTagElement(tag) {
        const tagElement = document.createElement("span");
        tagElement.classList.add("tag");
        tagElement.textContent = tag;

        const removeButton = document.createElement("button");
        removeButton.textContent = "×";
        removeButton.addEventListener("click", function () {
            selectedTags = selectedTags.filter(t => t !== tag);
            tagsContainer.removeChild(tagElement);
            updateHiddenInput();
        });

        tagElement.appendChild(removeButton);
        tagsContainer.insertBefore(tagElement, tagsInput);
    }

    function addTag(tagText) {
        if (!selectedTags.includes(tagText)) {
            selectedTags.push(tagText);
            createTagElement(tagText);
            updateHiddenInput();
        }
        tagsInput.value = "";
        displayTags();
    }

    function displayTags(filter = "") {
        let filteredTags = storedTags.filter(tag => tag.toLowerCase().includes(filter.toLowerCase()));

        filteredTags.forEach(tag => {
            const tagItem = document.createElement("div");
            tagItem.classList.add("tag-item");
            tagItem.textContent = tag;
            tagItem.addEventListener("click", function () {
                addTag(tag);
            });
        });
    }

    tagsInput.addEventListener("input", function () {
        displayTags(tagsInput.value);
    });

    tagsInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && tagsInput.value.trim() !== "") {
            event.preventDefault();
            addTag(tagsInput.value.trim().toUpperCase());
        }
    });

    displayTags(); // Afficher tous les tags au début
});

const adminButton = document.getElementById("admin");

admin = sessionStorage.getItem("Admin");
if (admin == null){
    admin = window.getItemWithExpiration("Admin");
}
if (admin){
    adminButton.classList.remove("hidden");
}


adminButton.addEventListener("click", () => {
    if (adminButton.classList.contains("hidden")){
        return;
    }
    window.location.href = adress + "/questions/confirm";
});