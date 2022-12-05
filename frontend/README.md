# Boilerplate pour vos applications modernes utilisant Webpack, Phaser (Jeux en 2D) et un routeur

# How to use ?

- Si vous ne l'avez pas fait, vous pouvez cloner le repo associé au boilerplate pour initier votre application : `git clone https://github.com/e-vinci/js-router-boilerplate.git` ou `git clone https://github.com/e-vinci/js-router-boilerplate.git nom-de-votre-projet` pour créer votre projet nommé `nom-de-votre-projet`.
- **package.json** est le fichier de configuration de votre projet. Veuillez le mettre à jour afin de :
  - donnnez un nom à votre projet & une description ;
  - vous identifier comme auteur.
- ⚡ Si vous avez cloné votre projet au sein d'un repo existant, Git ne trackera pas ce nouveau projet ; en effet, Git ne tracque pas des projets Git dans des projets Git.
Pour vous assurer que Git traque votre nouveau projet imbriqué dans un repo, vous devez effacer le répertoire **.git** se trouvant dans votre nouveau projet. N'hésitez pas aussi à effacer **.gitignore** se trouvant dans votre nouveau projet.
- Par contre, si vous souhaitez créer un nouveau repo à l'aide de votre boilerplate,
vous pouvez utiliser le **.gitignore** existant. Vous pouvez aussi éventuellement utiliser le
**.git**, mais cela signifie que vous hériterez de tous les changements associés au boilerplate,
et que vous devrez changer l'origine (`git remote remove origin`, `git remote add origin LINK_TO_YOUR_REPO`). Nous vous recommandons plutôt d'effacer le répertoire **.git** et de
réinitialiser un projet git (`git init`, `git remote add origin LINK_TO_YOUR_REPO`).
- Installation des dépendances et démarrage du boilerplate :

```shell
cd nom-de-votre-projet # (le nom donné au répertoire de votre projet)
npm i # (equivalent de npm install)
npm start
```

## Utilisation du linter et du formater

- Pour bénéficier de feedback sur le code lors de son écriture, par rapport au respect du style
des règles d'Airbnb, vous devez avoir installé l'extension **ESLint** au sein de VS Code.
- Pour que la configuration du formater offerte dans ce boilerplate soit utile,
vous devez avoir installé l'extension **prettier** au sein de VS Code.
- vous pouvez facilement formatter votre code conformément au style d'Airbnb :
  - soit en tapant **Shift Alt F** ;
  - soit en faisant un clic droit sur votre script, **Format Document** ; la première fois, il se peut que vous deviez sélectionner **prettier** comme formater.
- Pour info, la configuration des règles de **ESLint** se fait dans le fichier
**.eslintrc.js** devant se trouver à la racine d'un projet et offert au sein du boilerplate.
- Pour info, la configuration des règles de **prettier** se fait dans le fichier
**.prettierrc.js** devant se trouver à la racine d'un projet et offert au sein du boilerplate.

## How to ? Ajout d'un package

- Installation d'un package : `npm i nomDuPackage`
Pour plus d'info sur un package, ou pour trouver un package traitant d'un sujet qui vous intéresse : <https://www.npmjs.com>
- Modification du code pour l'utiliser, au sein de `/src/index.js` (ou tout autre module .js) : chargement de la librairie soit via `import` (ou `require`) du package. Généralement, les instructions d'installation et d'utilisation d'un package sont données sur le site de <https://www.npmjs.com>.
- Si quelqu'un souhaite installer et exécuter ce projet, la gestion des dépendances est très simple : copie du répertoire du projet (sans `node_modules`), `npm instal`, `npm start`. Il n'y a donc pas de librairies à gérer manuellement pour reprendre le projet d'un tiers.

## Utilisation d'assets (images, fonts, CSS...)

- Attention, quand vous utilisez des assets au sein de votre application, comme des images, l'URL d'un asset après le build de votre application n'est pas la même qu'avant le build.
- Pour bien gérer les URL au sein de votre JavaScript, vous devez d'abord importer vos assets. Vous trouverez un exemple de comment ajouter des assets à une scène de jeux dans `/Components/Game/GameScene.js` :

```javascript
import starAsset from "../../assets/star.png";
// ...
this.load.image("sky", skyAsset); // l'URL de star.png sera la bonne lors du build
```

- Plus d'information sur la gestion des assets via Webpack : <https://webpack.js.org/guides/asset-management/>

## Tout savoir sur le Routeur offert dans ce boilerplate

- Le rôle du nouveau routeur `/Components/Router/Router.js` sera d'implémenter ces fonctions :
  - Routage lors d’un clic sur un élément de la barre de navigation via `navbarWrapper.addEventListener("click",...)` :
    - Appel du composant associé à l’élément cliqué (et auto-render du composant)
    - Affichage dans le browser de l’URL associée à l’élément cliqué
    - Garder l’URL dans l’historique
  - Routage lors du chargement du frontend (ou lors d'un refresh) via `navbarWrapper.addEventListener("load",...)` :
    appel du composant associé à l’URL en cours : par exemple, si c'est "/", la HomePage sera appelée.
  - Routage lors de l’utilisation de l’historique du browser via `navbarWrapper.addEventListener("popstate",...)` : appel du composant associé à l’URL se trouvant dans la pile gérant le "state" du browser (l'historique)
  - Routage lors de redirection via la méthode `Redirect(uri)` :
    - Appel du composant associé à la redirection (et auto-render du composant)
    - Affichage dans le browser de l’URL associée à l’élément redirigé
    - Garder l’URL dans l’historique
- La configuration des routes est à faire au sein de `/Components/Router/routes.js`. Voici un exemple de configuration :

```js
const routes = {
  "/": HomePage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/logout": Logout,
};
```

- La `HomePage` n'est pas chargé dans `index.js.` C'est le rôle du Router de charger la bonne page en se focalisant sur l'URL.
- De plus, il faut appeler le `Router` au sein de `index.js`

## Redirection d'une page vers une autre

- La page doit faire appel à la fonction `` du `Router` pour rediriger vers une autre page. Dans ce boilerplate, un example est fourni pour la `NewPage` qui redirige vers la `HomePage` lors d'un clic sur un bouton.
- Vous pouvez utiliser la fonction `Navigate` présente dans `/src/Components/Router/Navigate.js/` en fonction de n'importe quel type d'événement : lors du succès de l'authentification, lors d'un clic sur un élément....

## Conclusion

- L'utilisation de ce boilerplate permet d'avoir un serveur de développement hyper performant, de développer avec beaucoup de confort, de faciliter la structure d'un projet, de gérer les dépendances, de transformer les assets de manière centralisée, ...

# Resources

- Pour information, la source de la configuration de Webpack provient principalement de [Phaser 3 Webpack Project Template](https://github.com/photonstorm/phaser3-project-template).  
Le jeu présenté dans le boilerplate est basé sur le tutoriel nommé [Modern JavaScript Phaser 3 Tutorial : Part 1 to Part 5](https://blog.ourcade.co/posts/2020/make-first-phaser-3-game-modern-javascript-part1/) et utilise Webpack au lieu de Parcel comme module bundler.
- favicon : <https://upload.wikimedia.org/wikipedia/commons/3/3e/AIGA_information.svg>, AIGA (American Institute of Graphic Arts)
