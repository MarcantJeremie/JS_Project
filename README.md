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

