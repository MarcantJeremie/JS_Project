# Présentation du projet
Pour ce projet de JS les membres du groupes ont été Jérémie MARCANT, Théo LESAGE, Clément MASQUELIER et Romain PIAT.

Ce projet a pour objectif de reprendre le concept du kculture. Le but de ce jeu est de marquer des points et de 
finir la partie avec un total plus élevé que celui des adversaires. Une partie s'organise en 2 temps : 
- le temps de réponse aux questions avec un temps limité pour chacune d'entre elles,
- le temps de correction des réponses réalisé par le créateur de la partie.

Une fois la correction terminée, le créateur de la partie a la possibilité de donner des points bonus aux joueurs après quoi il pourra afficher le classement et mettre fin à la partie.

# Installation et éxécution
> Pour installer et éxécuter notre projet vous aurez besoin d'installer [Node.js](https://nodejs.org/fr/download) ainsi qu'un navigateur web **(autre que Mozilla Firefox)**

Une fois ces choses installées, plusieurs choix s'offrent à vous :
- [Télécharger l'archive disponible sur Github](#choix-1--télécharger-larchive-sur-github)
- [Cloner le dépôt Github](#choix-2--cloner-le-dépôt-github)




### Choix 1 : Télécharger l'archive sur Github
1. Rendez vous sur le [dépôt Github de notre projet](https://github.com/MarcantJeremie/JS_Project) (si vous voyez ce readme vous êtes déjà au bon endroit).

2. Rendez vous dans l'onglet "[release](https://github.com/MarcantJeremie/JS_Project/releases)" de celui-ci et téléchargez l'archive zip de la dernière version de notre projet.

3. Extrayez l'archive dans le dossier de votre choix sur votre ordinateur.

4. Sous Windows, éxécutez le script `run_server.bat` situé à la racine du dossier, sous Linux ou MacOS, ouvrez un terminal dans le dossier du projet et éxécutez la commande `npm run server`

5. Ouvrez votre navigateur internet et rendez vous sur `localhost:4000` pour découvrir notre projet




### Choix 2 : Cloner le dépôt Github
> Cette partie est quelque peu plus longue et technique que la précédente, si vous souhaitez éviter tout ce qui est technique, je vous invite à [suivre la partie précédente](#choix-1--télécharger-larchive-sur-github) plutôt que celle-ci. Si cependant vous vous refusez à télécharger l'archive présente sur Github, alors accrochez vous-bien et suivez pas à pas les étapes ci-dessous.

1. Rendez vous sur le [dépôt Github de notre projet](https://github.com/MarcantJeremie/JS_Project) (si vous voyez ce readme vous êtes déjà au bon endroit).

2. Assurez vous de bien être placé dans la branche `main` puis cliquez sur le bouton `code` vert.

3. Dans l'onglet déroulant qui s'affiche, cliquez sur le petit logo indiquant ``"copy url to clipboard"``.

4. Rendez vous dans le dossier de votre choix sur votre ordinateur.

5. Assurez vous que **git** est bien installé sur votre ordinateur, pour vérifier cela : ouvrez un terminal et tapez la commande `git -v`. Si vous voyez une réponse du style `git version <version>`, alors c'est que git est bien installé sur votre machine. Si ce n'est pas le cas, je vous invite à vous rendre sur internet et à installer git.

6. Supposons que vous avez installé git sur votre ordinateur, ouvrez un terminal dans le dossier dans lequel vous souhaitez placer notre projet puis éxécutez la commande `git clone <l'url que vous avez copié à l'étape 3>`

7. Une fois le dépôt cloné, créez à la racine du dossier un fichier appelé `.env`, si le type de ce fichier est bien `ENV`, alors rendez vous à la **partie 9** de ce guide d'installation. Si en revanche le fichier créé est un fichier texte, alors suivez la **partie 8** d'abord

8. Sous Windows 11, rendez vous dans votre explorateur de fichier et plus particulièrement dans l'onglet `Afficher` de votre barre d'outil. Descendez votre curseur pour survoler le nouvel onglet `Afficher` puis cliquez sur `Extension de noms de fichiers`. Reprenez le fichier `.env` créé précedemment qui doit maintenant être affiché comme `.env.txt` et renommez le en supprimant le `.txt` à la fin. Une fenêtre pop-up doit sans doute s'afficher, appuyez sur entrez pour valider.

9. Ouvrez ce fichier `.env` avec n'importe quel éditeur de texte ou de code et copiez collez le paragraphe suivant : 
>```MONGO_URI=mongodb+srv://gtrc:mongoPSWORDGTRC@clmt.tghrp.mongodb.net/gtrc```
    ```PORT=4000``` <br>
    ```SESSION_SECRET=secretkey```

10. Sauvegardez ce fichier

11. Sous Windows, éxécutez le script `run_server.bat` situé à la racine du dossier, sous Linux ou MacOS, ouvrez un terminal dans le dossier du projet et éxécutez la commande `npm run server`

12. Ouvrez votre navigateur internet et rendez vous sur `localhost:4000` pour découvrir notre projet

# Fonctionalités

Dans GTRCulture, vous pourrez :
- [Tester votre culture sur différents sujets tout seul ou avec vos amis](#jouer-avec-vos-amis)
- [Créer de nouvelles questions afin d'enrichir le jeu](#créer-des-questions)

## Jouer avec vos amis
> Le jeu n'étant pas encore hébergé en ligne, pour jouer avec voc amis, ceux-ci devront être connectés au même réseau que vous et vous devrez héberger le jeu sur votre machine. Pour ce faire, éxécutez simplement le script `run_server.bat` ou la commande `npm run server` dans un terminal.

> Vous devrez ensuite communiquer votre IPV4 Locale à vos amis, celle-ci peut être trouvée en tapant la commande `ipconfig` dans un terminal. En général, celle ci est souvent de cette forme `192.168.1.<2-255>` <br>
Une fois connectés au serveur, vos amis verront la même page que vous, il vous suffira alors de créer une partie en cliquant sur ``Jouer`` puis ``Créer``

## Créer des questions
> Pour créer une question, rendez vous sur la page d'accueil du jeu, vous pourrez alors créer un compte ou vous connecter si vous en avez déjà un en cliquant sur le bouton `Connexion` en haut à droite

> Une fois votre compte créé et après vous être connecté, vous devrez revenir sur la page d'accueil afin de cliquer sur le bouton `Questions` situé à gauche de l'ancien bouton ``Connexion`` maintenant devenu ``Profil``. Vous aurez alors la possibilité de rentrer les informations de votre question et de la soumettre **aux administrateurs** du jeu afin de la faire valider par ceux-ci.

### Validation des questions (réservée aux administrateurs)

> Si lors de votre connexion vous vous êtes connecté avec un compte administrateur, alors sur la page `Création de question` vous aurez un bouton supplémentaire `Admin`. En cliquant sur celui-ci, vous arriverez sur la page de validation de question avec à gauche de la page : un menu déroulant permettant de sélectionner la question à vérifier. Et au milieu de la page des champs correspondants aux informations de la question que vous souhaitez vérifier. Vous aurez alors la possibilité de modifier ces champs puis de valider ou non la question. <br>
Si vous la validez, alors elle sera disponible en jeu. Si en revanche vous la refusez, alors celle-ci sera supprimée de la base de donnée et devra être recréé si vous souhaitez de nouveau la soumettre à validation.

# Crédits

La rédaction du fichier README.md que vous êtes en train de lire a été assurée par **Clément MASQUELIER** et **Romain PIAT**

La partie **Interface Utilisateur** a été réalisée par **Jérémie MARCANT**, **Romain PIAT** et **Théo LESAGE**

La partie **Serveur** a été réalisée par **Clément MASQUELIER** et **Jérémie MARCANT**

La partie **Jeu et les interactions entre les clients et le serveur** a été réalisée par **Clément MASQUELIER**