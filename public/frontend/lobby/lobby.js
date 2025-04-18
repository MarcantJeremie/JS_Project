const params = document.getElementById("params");

const list_players = document.getElementById("list_players");
const list_selected_tag = document.getElementById("list-selected-tag");
const tag_list = document.getElementById("tag-list");
const easy_question_number = document.getElementById("easy-question-number");
const medium_question_number = document.getElementById(
  "medium-question-number"
);
const hard_question_number = document.getElementById("hard-question-number");
const accoustic_question_number = document.getElementById(
  "accoustic-question-number"
);
const list_time = document.getElementById("list-time");

const show_code_party = document.getElementById("show-code-party");
const copy_code_party = document.getElementById("copy-code-party");

let selected_tag = []; // contient les id des tags
let player_in_game = []; // contient les id des joueurs

window.is_host; // L'id de l'host de la partie

// if (!is_host) {
//   document.querySelectorAll("input").forEach((elem) => {
//     elem.setAttribute("disabled", "disabled");
//   });
// }

// Back to menu

const back_button = document.querySelectorAll(".back-button");

adress = window.location.href;
adress = adress.split("/");
adress = adress[2];
adress = "http://" + adress;
const back_to_menu_button = document.getElementById("back-to-menu");
back_to_menu_button.addEventListener("click", () => {
  window.location.href = adress + "/game/start";
});

// Ajouter et Supprimer un joueur du lobby

window.addPlayerToList = (id, pseudo, level, playerIsHost = false) => {
  list_players.innerHTML += `
    <div id="${id}" class="player">
        ${
          playerIsHost
            ? '<i class="bx bxs-crown"></i>'
            : '<i class="bx bxs-user"></i>'
        }
        <p class="player_title">${pseudo}</p>
        ${
          window.is_host
            ? '<i class="bx bxs-x-circle"></i>'
            : `<p class="player_level">LvL <span>${level}</span></p>`
        }
    </div>
    `;
  player_in_game.push(id);
  if (is_host) SelectedPlayerAddEventListener();
};

window.removePlayerToList = (id) => {
  list_players.removeChild(document.getElementById(id));
  player_in_game.pop(id);
};

window.SelectedPlayerAddEventListener = () => {
  document
    .querySelectorAll("#players #list_players .player")
    .forEach((elem) => {
      try{
        elem.querySelector(".bxs-x-circle").addEventListener("click", () => {
        removePlayerToList(elem.id);
      });
    }
      catch (e) {
        console.log(e);
      }
    });
};





// Ajouter tout les tags de la barre de recherche

// Ajouter et supprimer tags de la liste de ceux sélectionner

/**
 * Ajout de la sélection un tag.
 *
 * @param {string} id - L'id du tag.
 * @param {string} text - Le text content de l'élément ajouter.
 * @returns {void}
 */
window.addTagToList = (id, text) => {
  list_selected_tag.innerHTML += `
  <div id="${id}" class="tag">
    <div class="tag_title">${text}</div>
    ${is_host ? '<i class="bx bxs-x-circle"></i>' : ""}
  </div>
  `;
  selected_tag.push(id);
};

/**
 * Supprime de la sélection un tag.
 *
 * @param {string} id - L'id du tag.
 * @returns {void}
 */
const removeTagToList = (id) => {
  list_selected_tag.removeChild(document.getElementById(id));
  selected_tag.pop(id);
};

/**
 * Permet d'ajouter à tout les tags sélectionné de pouvoir être supprimer.
 *
 * @returns {void}
 */
window.selectedTagAddEventListener = () => {
  selected_tag.forEach((id) => {
    try{
      document.querySelector(`#${id} i`).addEventListener("click", () => {
      removeTagToList(id);
    });}
    catch (e) {
      
    }
  });
};

// Search



/**
 * Gére la barre de recherche des tags.
 *
 * @returns {void}
 */
const search = () => {
  let input = document.getElementById("searchBar").value;
  let items = document.querySelectorAll("#tag-list div");

  items.forEach((item) => {
    if (item.textContent.toLowerCase().includes(input.toLowerCase())) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
};

// Partie copier coller du code de la partie

copy_code_party.addEventListener("click", () => {
  navigator.clipboard.writeText(show_code_party.innerText);
});

const fillTagList = (tags) => {
  tag_list.innerHTML = "";
  tags.forEach((tag) => {
    tag_list.innerHTML += `
      <div class="tag-list-elem">${tag}</div>
    `;
  });
}

fetch(adress + "/questions/tags", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
}).then((response) => {
  if (response.ok) {
    response.json().then((data) => {
      fillTagList(data.tags);
    }).then(()=>{
      document.querySelectorAll(".tag-list-elem").forEach((item) => {
        item.addEventListener("click", () => {
          let id_use = item.textContent.toUpperCase().trim();
          if (!selected_tag.includes(id_use)) {
            addTagToList(id_use, id_use);
      
            if (window.is_host) selectedTagAddEventListener();
          }
        });
      });
    });
  } else {
    console.error("Erreur lors de la récupération des tags.");
  }
});