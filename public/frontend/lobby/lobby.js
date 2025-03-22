const list_players = document.getElementById("list_players");
const list_selected_tag = document.getElementById("list-selected-tag");
const tag_list = document.getElementById("tag-list");
let selected_tag = []; // contient les id des tags
let player_in_game = []; // contient les id des joueurs

let id_host; // L'id de l'host de la partie

// Ajouter et Supprimer un joueur du lobby

const addPlayerToList = (id, pseudo, level, playerIsHost = false) => {
  list_players.innerHTML += `
    <div id="${id}" class="player">
        ${
          playerIsHost
            ? '<i class="bx bxs-crown"></i>'
            : '<i class="bx bxs-user"></i>'
        }
        <p class="player_title">${pseudo}</p>
        <p class="player_level">LvL <span>${level}</span></p>
    </div>
    `;
  player_in_game.push(id);
};

const removePlayerToList = (id) => {
  list_players.removeChild(document.getElementById(id));
};

addPlayerToList(0, "GGLEMARCHANT", "99", true);
addPlayerToList(1, "GGLEMARCHANT", "99", true);
addPlayerToList(2, "Romain", "0", 0);

removePlayerToList(1);

// Ajouter tout les tags de la barre de recherche

// Ajouter et supprimer tags de la liste de ceux sélectionner

/**
 * Ajout de la sélection un tag.
 *
 * @param {string} id - L'id du tag.
 * @param {string} text - Le text content de l'élément ajouter.
 * @returns {void}
 */
const addTagToList = (id, text) => {
  list_selected_tag.innerHTML += `
  <div id="${id}" class="tag">
    <div class="tag_title">${text}</div>
    <i class="bx bxs-x-circle"></i>
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
const selectedTagAddEventListener = () => {
  selected_tag.forEach((id) => {
    document.querySelector(`#${id} i`).addEventListener("click", () => {
      removeTagToList(id);
    });
  });
};

// Search

document.querySelectorAll("#tag-list div").forEach((item) => {
  item.addEventListener("click", () => {
    let id_use = item.textContent.toLowerCase().trim();
    if (!selected_tag.includes(id_use)) {
      addTagToList(id_use, item.textContent);

      selectedTagAddEventListener();
    }
  });
});

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
