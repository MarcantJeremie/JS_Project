// const bcrypt = require("bcryptjs");

export const connectWithCookie = () => {
  let cookieValue = localStorage.getItem("UserLogin");
  if (cookieValue === undefined) {
    // Le cookie de connexion n'existe pas
    sessionStorage.setItem("IsConnect", false);
  } else {
    // Le cookie de connexion existe
    sessionStorage.setItem("IsConnect", false);
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

/**
 * Hache un mot de passe en utilisant bcrypt.
 *
 * @param {string} password - Le mot de passe en clair.
 * @returns {Promise<string>} Le mot de passe haché.
 */
const hashPassword = async (password) => {
  // const saltRounds = 10;
  // return await bcrypt.hash(password, saltRounds);
};

/**
 * Permet d'avoir le pseudo d'un certain login
 *
 * @param {string} login - Le login d'un utilisateur.
 * @returns {string} - Renvoi le pseudo.
 */
export const getPseudo = (login) => {
  //
};

/**
 * Permet d'avoir l'email d'un certain login
 *
 * @param {string} login - Le login d'un utilisateur.
 * @returns {string} - Renvoi l'email.
 */
export const getEmail = (login) => {
  //
};

/**
 * Permet d'avoir le mdp hashé de la db
 *
 * @param {string} login - Le login d'un utilisateur.
 * @returns {string} - Renvoi le mdp hashé de la db.
 */
export const getHashPassword = (login) => {
  //
};

/**
 * Vérifie si un mot de passe correspond à son hash stocké.
 *
 * @param {string} password - Le mot de passe saisi par l'utilisateur.
 * @param {string} hashedPassword - Le hash du mot de passe stocké dans la base de données.
 * @returns {Promise<boolean>} `true` si le mot de passe est valide, sinon `false`.
 */
const verifyPassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

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
