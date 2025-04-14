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

    // Liste de tags enregistrés (peut être récupérée d'une BDD plus tard)
    let storedTags = ["HTML", "CSS", "JavaScript", "Python", "PHP", "React", "Vue", "Angular", "Node.js", "Java"];
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
        tagsList.innerHTML = ""; // Nettoyer la liste avant de la remplir
        let filteredTags = storedTags.filter(tag => tag.toLowerCase().includes(filter.toLowerCase()));

        filteredTags.forEach(tag => {
            const tagItem = document.createElement("div");
            tagItem.classList.add("tag-item");
            tagItem.textContent = tag;
            tagItem.addEventListener("click", function () {
                addTag(tag);
            });
            tagsList.appendChild(tagItem);
        });
    }

    tagsInput.addEventListener("input", function () {
        displayTags(tagsInput.value);
    });

    tagsInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && tagsInput.value.trim() !== "") {
            event.preventDefault();
            addTag(tagsInput.value.trim());
        }
    });

    displayTags(); // Afficher tous les tags au début
});
