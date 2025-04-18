const sidebar_questions = document.querySelector(".links_container");

let actual_id = "";
let actual_question = "";
let actual_answer = "";
let actual_tags = [];
let actual_difficulty = "easy";
let actual_img_path = "";

const display_no_verified_question = (data) => {
  actual_id = data._id;
  actual_question = data.question;
  actual_answer = data.answer;
  actual_tags = data.tags;
  actual_difficulty = data.difficulty;
  actual_img_path = data.img_path;

  document
    .getElementById("display_question")
    .setAttribute("value", actual_question);
  document
    .getElementById("display_answer")
    .setAttribute("value", actual_answer);
  document.querySelector('select[name="difficulty"]').value = actual_difficulty;
  window.clearTagsFromUI();
  actual_tags.forEach((tag) => {
    window.addTagToUI(tag);
  });
  console.log(document.getElementById("img"));
  console.log(actual_img_path);
  document.getElementById("img").src = "../" + actual_img_path;
  document.getElementById("img").alt = actual_question;
};

adress = window.location.href;
adress = adress.split("/");
adress = adress[2];
adress = "http://" + adress;

const back_to_menu_button = document.getElementById("back-to-menu");

back_to_menu_button.addEventListener("click", () => {
  window.location.href = adress + "/";
});

fetch(adress + "/questions/getNoVerifiedQuestions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      sidebar_questions.innerHTML += `<a id="${element._id}" class="no-verified-question"> ${element.question} </a>`;
    });
  })
  .then(() => {
    document.querySelectorAll(".no-verified-question").forEach((element) => {
      element.addEventListener("click", () => {
        fetch(adress + "/questions/getQuestionById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: element.id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            display_no_verified_question(data);
          });
      });
    });
  });

document.getElementById("valid").addEventListener("click", () => {
  if (actual_id == "") return;

  fetch(adress + "/questions/approvedQuestion", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: actual_id,
      id_user: sessionStorage.getItem("UserLogin"),
      question: actual_question,
      answer: actual_answer,
      tags: actual_tags,
      difficulty: actual_difficulty,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Question approved") {
        alert(data.message);
        document.getElementById(actual_id).remove();
        window.clearTagsFromUI();
        document.getElementById("display_question").value = "";
        document.getElementById("display_answer").value = "";
        document.querySelector('select[name="difficulty"]').value = 1;
        document.getElementById("img").src = "../../files/uploads/default.png";
        document.getElementById("img").alt = "default.png";
      } else {
        alert(data.message);
      }
    });
});

document.getElementById("non_valid").addEventListener("click", () => {
  if (actual_id == "") return;

  document.getElementById(actual_id).remove();

  fetch(adress + "/questions/removeQuestion", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: actual_id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Question deleted") {
        alert(data.message);
        window.clearTagsFromUI();
        document.getElementById("display_question").setAttribute("value", "");
        document.getElementById("display_answer").setAttribute("value", "");
        document.querySelector('select[name="difficulty"]').value = "easy";
        document.getElementById("img").src = "../../files/uploads/default.png";
        document.getElementById("img").alt = "default.png";
      } else {
        alert(data.message);
      }
    });
});

// Pour les tags
document.addEventListener("DOMContentLoaded", function () {
  const tagsContainer = document.getElementById("tags-container");
  const tagsInput = document.getElementById("tags-input");
  const tagsHidden = document.getElementById("tags-hidden");

  // Liste de tags enregistrés (peut être récupérée d'une BDD plus tard)
  let storedTags = [
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "PHP",
    "React",
    "Vue",
    "Angular",
    "Node.js",
    "Java",
  ];
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
      selectedTags = selectedTags.filter((t) => t !== tag);
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
    let filteredTags = storedTags.filter((tag) =>
      tag.toLowerCase().includes(filter.toLowerCase())
    );

    filteredTags.forEach((tag) => {
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
      addTag(tagsInput.value.trim());
    }
  });

  function clearTags() {
    selectedTags = [];
    updateHiddenInput();
    // Supprimer tous les éléments <span class="tag"> sauf l’input
    const tagElements = tagsContainer.querySelectorAll(".tag");
    tagElements.forEach((el) => el.remove());
  }
  window.clearTagsFromUI = clearTags;

  window.addTagToUI = addTag;
  displayTags(); // Afficher tous les tags au début
});
