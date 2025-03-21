const list_players = document.getElementById("list_players");

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
};

const removePlayerToList = (id) => {
  list_players.removeChild(document.getElementById(id));
};

addPlayerToList(0, "GGLEMARCHANT", "99", true);
addPlayerToList(1, "GGLEMARCHANT", "99", true);
addPlayerToList(2, "Romain", "0", 0);

removePlayerToList(1);

//
