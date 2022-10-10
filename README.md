# Projet Web2 2022
## Introduction
- Ce boilerplate vous offre l'architecture de base de votre frontend et de votre API pour développer un projet qui vous tient à coeur et qui répond aux exigences résumées ci-dessous (et détaillées dans le template du rapport de projet). 
- Vous pouvez mettre à jour le boilerplate autant que nécessaire, installer des packages...
- Votre web repository sur GitHub doit être public.

## API
- Votre API doit respecter les conventions REST et appliquer le boilerplate offert dans le cadre du cours de Web2.
- Veuillez documenter les opérations de votre API, soit à l'aide de tableaux, comme vus dans le cours, soit à l'aide d'outils (Swagger par exemple). Votre fichier `README.md` doit indiquer l'endroit où se situe la documentation de votre API.
- Les tests de votre API, les requêtes HTTP, doivent être données au sein de votre projet. Votre fichier `README.md` doit indiquer où se trouve ces fichiers. Pour chaque opération de votre API, il doit exister au minimum une requête HTTP associée.
- La RESTful API ne peut pas être uniquement un « copier/coller » de ressources offertes dans le cours (notamment les ressources **users** et **auths**). Vous pouvez utiliser les ressources offertes dans le cours, mais vous devez y apporter des ajouts significatifs.
- Votre RESTful API doit mettre en œuvre au minimum un package non vu en cours.
- Votre API doit respecter les droits d’auteurs, que ça soit pour les éventuelles librairies utilisées, les morceaux de code, les sons, images, vidéos… Cela est de votre responsabilité et non pas de celle de vos enseignants.
- Vous devez déployer votre backend sur Azure ou d’autres providers gratuits supportant votre application.

## Frontend
- Votre frontend doit appliquer le boilerplate offert dans le cadre du cours de Web2.
- Votre frontend doit mettre en œuvre une librairie JS externe, ou l’API Canvas, afin de réaliser une animation.
- Votre frontend doit mettre en œuvre au minimum une librairie JS non vue en cours.
- Vous devez déployer votre frontend sur GitHub Pages ou d’autres providers gratuits supportant votre application.
- Votre RESTful API doit mettre en œuvre au minimum un package non vu en cours.
- Votre frontend doit respecter les droits d’auteurs, que ça soit pour les éventuels sons, images, vidéos, librairies et morceaux de codes utilisés. Cela est de votre responsabilité et non pas de celle de vos enseignants.
- Vous devez déployer votre API sur Azure ou d’autres providers gratuits supportant votre application.

## Ergonomie
- La vision marketing ainsi que les wireframes de votre application doivent se trouver dans le répertoire `/ergonomics`.

## Exécution de vos projets
- Il doit être possible d'installer et exécuter localement votre frontend et l'API simplement à l'aide de `npm i` et `npm start` au sein des dossiers `frontend` et `api`. 
- Si d'autres commandes sont nécessaires, vous devez les indiquer au sein du `README.md` de votre projet.
- Si vous utilisez une base de données ou des API nécessitant des secrets, il est OK de ne pas rendre public vos secrets. Dans ce cas :
    - Votre application doit être sur le cloud pour que les autres étudiants puissent la revoir ; les étudiants ne pourront donc pas exécuter l'API localement. Veuillez clairement indiquer dans le `README.md` de votre projet si l’application ne peut pas être exécutée localement sans les secrets et veuillez indiquer l'URL tant de votre frontend que de votre API au sein du `README.md` de votre projet.
    - Vous devez mettre à disposition tous ces secrets (fichiers de configuration) à disposition de vos enseignants lors de la soumission de votre projet.
    - Pour la création de votre éventuelle DB, si elle ne se fait pas automatiquement lors du démarrage de votre API, vous devez offrir un script et le mettre au sein de votre projet. Dans ce cas, la procédure pour créer la DB doit être documenté au sein du `README.md` de votre projet.

## Suivi de projet
- Au sein du repository GitHub de votre projet, vous devez créer un **Project** pour planifier les tâches, allouer les responsables, documenter vos avancées, visualiser vos milestones...
- Votre projet doit être **public** et doit suivre le template : **New project**, **Team backlog**. Vous pouvez supprimer la colonne **New**.
- Veuillez indiquer l'URL vers votre **Project** public sous GitHub dans votre `README.md`.
- Veuillez commencer votre projet en identifiant toutes les tâches principales à réaliser sur votre projet, principalement en soignant l'identification des use cases. 
- Chaque **tâche** doit être couverte par une **draft Issue** au sein de GithHub que vous devrez convertir plus tard en **Issue**. Veuillez allouer une **Priority** à chaque **Issue** (ou **draft Issue**), ainsi qu'une **Size**. 
- Lors de l'identification des tâches, les **Issues** associées se trouvent dans la colonne **Backlog**.
- Un **cas d'utilisation** doit être couvert par au moins une **Issue** avec un label nommé **enhancement**.
- Chaque **Issue** doit être associée à au moins un **Assignee**.
- S'il y a plusieurs **Assignees** associés à une **Issue**, celle-ci devra être découpée en suffisamment de tâches pour qu'il y ait un seul **Assignee** par tâche.
- Dans un premier temps, une **Issue** associée à plusieurs **Assignees** peut simplement identifier les tâches associées au sein d'une **task list**. Plus tard, ces tâches devront être converties en nouvelles **Issues** associées à un seul **Assignee**.
- Lorsque vous travailler sur une **Issue** :
    - elle doit se trouver dans la colonne **In progress** ou **In review** si vous pensez avoir terminé mais que vous attendez le feedback d'un membre de votre projet.
    - pour chaque avancée significative sur une **Issue**, vous devez indiquer un commentaire via **Comment** résumant le travail effectué.
- Lorsque vous considérez qu'une **Issue** est terminée, faites la passer dans la colonne **Done**, indiquez un message via **Comment** résumant le travail effectué et cliquez sur **Close issue**.
- Si vous souhaitez facilement voir le pourcentage de progrès dans la fermeture des **Issues** qui vous sont associées, vous pouvez créer une **Milestone** par membre de projet et associer cette **Milestone** à toutes les **Issues** où le membre de projet est le seul **Assignee**.

## Rapport de projet
- Veuillez utiliser le template de projet offert dans le cadre du cours de Web2 pour créer votre rapport de projet. En fin de projet, ce rapport doit se trouver dans le répertoire `/report`.
- ⚡ Veuillez effacer toutes les consignes mises en grisé dans le rapport de projet avant de le soumettre !!!

## Vidéo
- Elle doit viser une durée de 5 minutes, ne peut pas dépasser 10 minutes, doit être audible et visible et doit respecter les droits d'auteurs (son, images, vidéos...).
- Elle doit être visible sous youtube par n'importe qui possédant son URL. Sa visibilité doit donc être en ‘’Unlisted" ou "Public", mais pas « Private » !
- La vidéo doit se baser principalement :
    - sur la présentation de votre application web : exécution, en live, de votre API et du frontend ;
    - la présentation de l’expérience utilisateur.

## Revues de projets par les pairs
- Une fois votre projet soumis, vous devrez réaliser un minimum de 5 revues qui vous seront attribuées automatiquement via le site du cours.