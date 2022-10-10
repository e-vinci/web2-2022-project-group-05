
# Boilerplate d'une RESTful API basique
## Comment l'utiliser ?
- Si vous ne l'avez pas fait, vous pouvez cloner le repo associé au boilerplate pour initier votre application : `git clone https://github.com/e-vinci/basic-api-boilerplate.git` ou `git clone https://github.com/e-vinci/basic-api-boilerplate.git nom-de-votre-projet` pour créer votre projet nommé `nom-de-votre-projet`.
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

## Utilisation du debugger et de la configuration de debug offerte
Nous vous offrons une configuration de Debug permettant de facilement débugger plusieurs applications au sein d'un même folder de VS Code. Cette configuration se trouve dans le fichier **.vscode/launch.json**.  
Cette configuration est active au sein de VS Code que si elle se trouve à la racine du folder ouverte dans VS Code. Vous devez donc vous assurer que le dossier **.vscode** et son fichier **launch.json** se trouve au bon endroit. Voici deux scénarios :
- Si vous ouvrez un seul projet au sein de VS Code, c'est-à-dire que le folder ouvert de VS Code est le clone de ce boilerplate) : vous ne devez pas déplacer le répertoire **.vscode**, tout est bien configuré.
- Si vous ouvrez ou folder de VS Code contenant plusieurs projets, comme par exemple un repository contenant plusieurs API : vous devez déplacer **.vscode** à la racine du folder ouvert dans VS Code.

Si vous avez plusieurs applications au sein d'un folder de VS Code, pour débugger une application en
particulier, nous vous conseillons cette approche :
- Ouvrez le fichier **package.json** de l'application à débugger ; 
- Cliquez sur l'icône **Run and Debug** à gauche de l'Explorer, puis cliquez sur  **Start Debugging** 
(ou cliquez juste sur **F5**) en vérifiant que la configuration de debugging sélectionnée est bien 
nommée **Launch via NPM**.

Nottons que le nom de la configuration de debugging peut facilment être modifiée en changeant la 
valeur de l'attribut **name** dans **/.vscode/launch.json**.

## Comment ajouter un package ?
- Installation d'un package : `npm i nomDuPackage`
Pour plus d'info sur un package, ou pour trouver un package traitant d'un sujet qui vous intéresse : https://www.npmjs.com
- Modification du code pour l'utiliser, au sein de `/src/index.js` (ou tout autre module .js) : chargement de la librairie soit via `import` (ou `require`) du package. Généralement, les instructions d'installation et d'utilisation d'un package sont données sur le site de https://www.npmjs.com.
- Si quelqu'un souhaite installer et exécuter ce projet, la gestion des dépendances est très simple : copie du répertoire du projet (sans `node_modules`), `npm instal`, `npm start`. Il n'y a donc pas de librairies à gérer manuellement pour reprendre le projet d'un tiers.

# 🍬 Comment ce boilerplate a été créé et configuré ?
## Introduction
Il n'est pas nécessaire de connaître comment configurer ce boilerplate. Néanmoins, des personnes curieuses pourraient trouver cela intéressant. 
Si c'est votre cas, n'hésitez pas à lire la suite.

## Utilisation du générateur d'application Express
- A l'aide d'un générateur d'application, création d'une application Express, sans vues, dans le répertoire de projet `/basic-api` (NB : c'est lors de la création d'une MPA que les vues sont utilisées) : `npx express-generator --no-view basic-api`
NB : le `--no-view` permet de ne pas avoir à effacer certains répertoires inutiles à une SPA comme `/views`.
- Pour une API qui ne possède pas de serveur de fichiers statiques, on a pas besoin d'avoir un répertoire `public`, ni d'un serveur statique. On peut donc effacer le répertoire `/public` et supprimer le middleware de serveur de fichiers statiques de `app.js` : 
```js
app.use(express.static(path.join(__dirname, 'public'))); 
```
- On ne souhaite pas avoir de router **index**, donc on peut retirer ce router et le code associé 
dans `app.js`.
- On souhaite présenter un exemple d'opérations RESTful pour couvrir toutes les opérations CRUD. On a donc rajouté le router `/router/pizzas.js`.
- On souhaite pouvoir facilement sérialiser les ressources au sein d'un fichier JSON. Nous avons donc ajouté un fichier `/utils/json.js` offrant les opérations `serialise` et `parse` pour l'écriture d'un objet JS dans un fichier JSON et pour la création d'un objet JS à partir de données JSON contenu dans un fichier JSON. 

## Ajout et configuration d'un linter et d'un formateur
- Nous souhaitons ajouter un outil qui permette de détecter des erreurs de programmation lors 
de l'écriture de nos scripts.
Pour ce faire, nous allons utiliser ESLint (cet outil est aussi utilisé par Facebook au sein d'app React).
- Installation du linter : `npm install eslint -D`.
- Configuration du linter et création d'un fichier de config nommé `.eslintrc.js` : `npm init @eslint/config`. Une suite de questions sont pausées. Ici on a précisé que l'on fait du 
développement `CommonJS`, sans framework ni TypeScript, du code qui s'exécute avec `Node`, 
- Installation du package pour utiliser le Airbnb JavaScript Syle Guide : `npm i eslint-config-airbnb-base -D`.
- Ajoutez La config d'Airbnb dans les plugins (rules) vérifiées par ESLint, c'est représenté par cette ligne de `.eslintrc.js` : extends: ['airbnb-base']
Airbnb JavaScript Syle Guide est donné ici : https://github.com/airbnb/javascript.

- Pour bénéficier de plus de feedback sur le code, installez l'extension **ESLint** au sein de 
VS Code. Vous ne devez plus attendre la compilation pour avoir du feedback sur votre code, cela 
se fait dès l'écriture ! Vous avez même des propositions de "Quick fix" !
- Pour formater votre code, nous vous conseillons d'installer l'extension **Prettier**.
- Vous souhaitez reformater votre code en accord avec le linter ?
Par défaut, l'extension Prettier de VS Code n'est pas configuré pour appliquer le style 
d'Airbnb. Il y a notamment des soucis avec les Strings : tout devient des double quotes au lieu 
de single quotes...
- Pour configurer prettier basé sur Airbnb JS style guide   : 
  - installer un package fournissant les paramètres de config : `npm i prettier-airbnb-config -D`
  - utiliser ces paramètres de configuration au sein d'un fichier `.prettierrc.js` :
```
module.exports = {
  ...require('prettier-airbnb-config'),
  printWidth: 120,
  arrowParens: 'always',
  bracketSpacing: true,
  trailingComma: 'all',
};
```
- Concernant le formateur, apparemment le package **prettier-airbnb-config** ne fournit pas une config qui correspond au style guide d'Airbnb. Nous avons du changer les règles au sein de **.prettierrc.js** :
  - - tenter de ne pas créer de lignes de plus de 100 caractères  via **printWidth**
  - toujours mettre les parenthèses lors d'un unique paramètre via ***arrowParens**.
  - mettre un espace entre les accolades d'un objet via **bracketSpacing**.
  - toujours ajouter une virgule (même dans les fonctions quand multilignes, pour le dernier paramètre) : **trailingComma**.  
- Toujours concernant le formateur, celui-ci fait du bon travail, mais cela ne colle pas toujours avec ce que le linter impose. Pour désactiver les règles qui entrent en conflit avec Prettier :
  - ce package a été installé : `npm i -D eslint-config-prettier`.
  - la config du linter a été changée dans **.estlintrc.js** en ajoutant **prettier** à la fin de l'array "extends" pour qu'il puisse remplacer d'autres configurations.
- Certaines règles d'Airbnb sont difficilement applicables. La 1ère est que sous Windows ou Linux, les sauts à la lignes sont faits différemment. On souhaite laisser cela acceptable. De plus, on souhaite aussi permettre le hoisting des fonctions. Afin de rendre le code plus lisible, on aimerait pouvoir utiliser une fonction, même si ça définition est donnée plus loin dans le script. Nous avons donc assoupli ces deux règles, 'linebreak-style' & 'no-use-before-define', au sein du fichier de configuration du linter **.eslintrc.js**.

- Afin de checker ou corriger les erreurs de style, on peut rajouter deux lignes à **package.json** :
"scripts": {
    "start": "node ./bin/www",
    "lint": "eslint **/*.js",
    "lint:fix": "npm run lint -- --fix"
  },
- On peut manuellement lancer le check des règles de style via `npm run lint`.

- On va tenter d'automatiser le checking des règles avant de lancer un serveur de développement.
Mais avant cela, on va améliorer le serveur de développement.

## How to ? Redémarrer automatiquement votre application à chaque fois que vous sauvez un fichier
- installer `nodemon` au niveau du répertoire du projet : `npm i nodemon -D`
- lancer `nodemon` (au lieu du simple node) quand on tape `npm run dev` : ajout de la ligne `"dev": "nodemon /bin/www"`
dans `package.json` :
```json
"scripts": {
    "dev": "nodemon ./bin/www",
    "start": "node ./bin/www"
  },
```

## How to ? Ne pas redémarrer quand un fichier de votre projet est mis à jour
- Il est possible d'indiquer les fichiers qui doivent être ignorés par nodemon via l'ajout dans `package.json` :
```json
"nodemonConfig": {
    "ignore": [
      "data/*"
    ]
  },
```

- Dans la configuration ajoutée ci-dessous, tous les fichiers qui seraient mis à jour dans le répertoire `/data` ne provoqueront pas de redémarrage du serveur **nodemon** lorsqu'il est lancé en mode debug (`npm run debug`)

## How to ? Automatiser l'appel du linter à chaque redémarrage de nodemon
Veuillez indiquer ce que dois faire **nodemon** à chaque fois qu'un changement de fichier est détecté :
```json
"nodemonConfig": {
    "ignore": [
      "data/*"
    ],
    "exec": "npm run lint && node"
  },
```
A chaque fois, il lance le linter, et si tout est OK, alors il lance **node**. En cas de souci, 
il ne lance pas **node** et donc l'application est temporairement crashée.

- En conclusion, voici tous les packages qui ont été installés pour le linter et le formater : `npm i eslint eslint-config-airbnb-base eslint-webpack-plugin prettier-airbnb-config -D`. Deux fichiers de config ont été rajoutés : **.eslintrc.js** et **.prettierrc.js**, et deux extensions ont été installées dans VS Code : **ESLint** et **Prettier**.

