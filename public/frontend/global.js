let address = window.location.href;
address = address.split("/");
address = address[address.length - 2];
address = "http://" + address;

export const connectWithCookie = () => {
  let cookieValue = localStorage.getItem("UserLogin");
  console.log(cookieValue);

  if (cookieValue === undefined) {
    // Le cookie de connexion n'existe pas
    sessionStorage.setItem("IsConnect", false);
  } else {
    // Le cookie de connexion existe
    sessionStorage.setItem("IsConnect", true);
  }

  return true;
};

const setItemWithExpiration = (key, value, expirationMinutes) => {
  const now = new Date().getTime();
  const item = { value, expiry: now + expirationMinutes * 60 * 1000 };
  localStorage.setItem(key, JSON.stringify(item));
};
const getItemWithExpiration = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const { value, expiry } = JSON.parse(itemStr);
  if (new Date().getTime() > expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return value;
};

// /**
//  * Hache un mot de passe en utilisant bcrypt.
//  *
//  * @param {string} password - Le mot de passe en clair.
//  * @returns {Promise<string>} Le mot de passe haché.
//  */
// const hashPassword = async (password) => {
//   const saltRounds = 10;
//   return await bcrypt.hash(password, saltRounds);
// };

/**
 * Permet d'avoir les informations d'un utilisateur à partir de son login.
 *
 * @param {string} login - Le login d'un utilisateur.
 * @returns {Promise} - Renvoi l'utilisateur.
 * Exemple d'utilisation : 
 * getUser("Test").then((data) => {
  console.log(data);
    });
 * ATTENTION /!\ Ne renvoie pas directement l'utilisateur, il faut utiliser then pour récupérer les données.
 * 
 */
export const getUser = async (login) => {
  try {
    const response = await fetch(address + "/requests/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: login }),
    });

    if (!response.ok) {
      console.error("Erreur serveur :", response.status);
      return null;
    }

    const data = await response.json(); // Attendre et récupérer les données JSON
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return null;
  }
};

/**
 * Permet de créer des nouveaux compte dans la base de donné.
 *
 * @param {string} email - L'email du compte.
 * @param {string} pseudo - Le pseudo du compte.
 * @param {string} password - Le mdp du compte (pas encore hashé).
 * @param {boolean} remember - Permet de savoir si on doit créer un cookie ou non
 * @returns {boolean} - Renvoi vrai, si le compte s'est créé sans problème, false sinon
 */
export const createNewAccount = (email, pseudo, password) => {
  // la fonction de hashage est juste au dessus
  // Utiliser cette ligne de code, pour créer le cookie en question (on sauvegarde le login)
  // Cookies.set('login', 'valeur', { expires: 30 });
};

/**
 * Permet de supprimer des compte de la base de donné à partir d'un login.
 *
 * @param {string} login - Le login du compte.
 * @returns {boolean} - Renvoi vrai, si le compte s'est supprimé sans problème, false sinon
 */
export const deleteAccount = (login) => {
  //
};

/**
 * Permet de créer des nouveaux compte dans la base de donné.
 *
 * @param {string} pseudo - Le nouveau pseudo du compte.
 * @param {string} password - Le nouveau mdp du compte (pas encore hashé).
 * @returns {boolean} - Renvoi vrai, si le compte s'est modifié sans problème, false sinon
 */
export const modifyAccount = (pseudo, password) => {
  //
};
