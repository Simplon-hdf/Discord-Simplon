# Architecture

Dans ce fichier, nous expliquerons les différents choix concernant l'architecture dossier de notre projet. 

## Mono-repository vs. multi-repository

### Mono-repository 

L'architecture de type mono-repository, littérallement "un seul dépôt". Ce type d'architecture est le plus utilisé car le plus intuitif lors de l'apprentissage et du développement d'applications. 
En effet, ce type d'architecture consiste à stocker tous les fichiers d'une application dans un seul référentiel de versioning, comme Git. Ainsi, tous les fichiers de l'application ne se trouvent que dans un seul dépôt qui sera central. 

En plus d'être intuitive, cette architecture facilite grandement certains processus : 
* Lors du développement, il est plus facile de gérer les différents fichiers et d'obtenir une vue globale sur son projet. 
* Pour le travail en équipe, la collaboration est simplifiée en permettant à tous les membres de l'équipe de partager les mêmes outils et fihcier,  et d'adopter le même point de vue concernant l'application (y compris sur des domaines ne concernant pas directement leur travail).
* Une application comporte des dépendances. Ces dépendances logicielles sont des éléments ayant vocation à être assemblé à d'autres en vue de construire le logiciel. En d'autres termes, les cdépendances sont des composants qu'il est nécessaire de possèder pour le bon foinctionnemenbt de l'application. Une architecture mono-repo nous permet de mieux gérer les dépendances du projet en les centralisant. 

### Multi-repository

A contrario de l'architecture en monorepo, l'architecture multiréférencée (ou architecture en multi-repository) est une architecture qui consiste en la séparation des fichiers sources et dépendances de l'application. 

Cette architecture possède également des avantages:
* Une séparation de différents codes aux fonctionnalités très différentes.
* Séparer plusieurs fonctionnalités permet également aux équipes de pouvoir travailler de façon indépendante sur ces parties sans interférer entre elles. Le versionning peut également être facilité en différenciant plusieurs historiques git.
* Séparer les architecture peut devoir forcer les équipes à réflechir l'application en terme de micro-services. 
* Une entreprise peut plus facilement contrôler l'accès au code source d'une application en limitant les accès. Ce point permet également de soulever les avantages en terme de sécurité interne.

### Choix 

Notre application est basée sur différents bots ainsi que sur un pannel administrateur nécessitant l'utilisation d'une application web. 

Dans ce cadre, il est difficile de choisir une architecture comme référentiel plutôt qu'une autre. 

Nous pourrions qualifier notre choix de mixte entre l'architecture monoréférentielle et multiréférentielle: 

Nous optons pour la création d'un repository dédié à nos bots Discord. 
Un autre repository contiendra notre application web servant de pannel administrateur pour nos bots Discord. 
Pour finir, un dernier repository comportera l'API permettant de faire dialoguer notre pannel administrateur avec nos bots. 

Ce choix d'architecture nous permet de balancer les avantages et les inconvénients de chacune des approches de façon à mieux servir notre application. 

En effet, nous espérons augmenter la productivité de l'équipe en limitant les conséquences des erreurs de gestion Git tout en permettant aux membres d'obtenir une vision à la fois globale et compartimentée de l'application finale.

Nous simplifions également de la sorte les gestions des dépendances. Les bots ayant des dépendances communes, il est important de les regrouper. De même, nous facilitons la communication des fichiers de configuration de ceux-ci. La séparation des bots dans (au minimum) deux repository rendrait plus difficile de gérer les dépendances logicielles car celles-ci devraient être installées et configurées de multiples fois.

Pour finir, ce choix d'architecture permet de favoriser la perenité du projet en offrant une plus grande facilité de maintenance et de déploiement.
