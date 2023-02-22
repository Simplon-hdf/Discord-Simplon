# Proposition technique pour la réalisation du projet

![technical proposition image](https://img.freepik.com/premium-vector/people-work-office-vector-illustration_81522-379.jpg?w=2000)

Afin de déterminer les technologies les plus adaptées à la réalisation de notre projet,<br>
notre équipe a mené une analyse comparative de différentes options.<br>

Suite à cette évaluation, nous avons établi ce document de proposition technique détaillant les différentes approches proposées<br>
pour la mise en œuvre du projet**.<br>

Ce document vise à présenter de manière claire et concise les choix technologiques retenus et les raisons de ces choix.<br>

## 👀 Identification des technologies 

| Technologies | Description                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| NodeJS       | NodeJS est un environnement d'exécution JavaScript permettant de réaliser des applications Web côté Serveur         |
| NestJS       | NestJS est un Framework Back-End qui permet de créer des applications Web robustes et facilement maintenables       |
| Angular      | Angular est un Framework Front-End qui permet de créer des applications Web dynamiques et performantes              |
| PostgreSQL   | PostgreSQL est un système de gestion de base de données relationnelles de haute performance Open Source et évolutif |
| TypeORM      | TypeORM est un ORM Open Source permettant d'intéragir avec les bases de données de façon simple et sécurisée        |

## 📄 Proposition d'une API

![API proposition image](https://i.imgur.com/OdKnUjw.png)

    Lors de nos réfléxions, la question de l'architecture API ou Monolithique s'est posée.
    Nous proposons d'utiliser une API car l'architecture d'une API est bien plus modulaire
    qu'une architecture monolithique, ce qui permet par exemple à d'autres développeurs
    d'utiliser notre application afin d'ajouter des fonctionnalités et d'être capable de créer
    de nouveaux outils à partir de notre de application.

    Cela permettra d'apporter une évolutivité du projet dans son ensemble en permettant l'agrégation
    de nouveaux outils sans besoin de retravailler l'architecture de l'application préalablement
    en plus de permettre l'utilisation de l'API en tant que source d'informations.

Nous avons choisi d'utiliser une architecture **RESTful** pour notre **API** car elle présente plusieurs avantages pour notre cas d'utilisation. <br>

- **l'interopérabilité** est un point clé pour notre API, qui doit être utilisable par un large éventail de clients et de technologies. L'utilisation de l'architecture RESTful nous permet de nous assurer que notre API sera compatible avec tout client qui parle HTTP.

- **l'évolutivité** est un autre aspect important pour notre API. Avec une architecture RESTful, nous pouvons facilement mettre à jour et changer les ressources sans impacter les clients existants. Cela nous permet de mieux gérer l'évolution de notre API au fil du temps.

- **La performance** est également un facteur important pour notre API, qui doit être capable de gérer un volume élevé de demandes. L'architecture RESTful nous permet de mieux gérer la charge et d'utiliser efficacement les ressources du serveur, ce qui améliore les performances de notre API.

- **la séparation des préoccupations** pour finir est un autre avantage de l'architecture RESTful. En donnant à chaque ressource une URL unique, nous pouvons mieux séparer les différentes parties de notre API et les maintenir de manière plus simple.

En résumé, l'architecture RESTful nous permet de créer une API interopérable, évolutive, performante et facile à maintenir, ce qui correspond parfaitement à nos besoins.

    Une API peut être considérée comme RESTful si elle respecte les principes de l'architecture REST. 
    Si une API ne respecte pas ces principes, elle ne peut pas être considérée comme RESTful, 
    même si elle utilise l'hypertext transfer protocol (HTTP) pour envoyer et recevoir des données.

Voici quelques exemples de situations où une **API REST** ne serait pas considérée comme **RESTful** :

- Si elle ne respecte pas le principe de l'uniformité de l'interface : dans l'architecture REST, toutes les ressources doivent être - identifiées de la même manière et le client doit être en mesure d'interagir avec elles de la même manière, quelle que soit leur emplacement ou leur type. Si une API ne respecte pas ce principe, elle ne peut pas être considérée comme RESTful.

- Si elle ne respecte pas le principe de l'étatless : dans l'architecture REST, chaque demande doit être indépendante et ne doit pas dépendre de l'état précédent de la conversation. Si une API nécessite que l'état soit conservé entre les demandes, elle ne peut pas être considérée comme RESTful.

- Si elle ne respecte pas le principe de la cache : dans l'architecture REST, les ressources doivent être clairement identifiées comme étant cacheables ou non. Si une API ne respecte pas ce principe, elle ne peut pas être considérée comme RESTful.

- Si elle ne respecte pas le principe de la séparation des préoccupations : dans l'architecture REST, chaque ressource doit avoir sa propre URL et ne doit pas dépendre des autres ressources. Si une API ne respecte pas ce principe, elle ne peut pas être considérée comme RESTful.

Nous avons également choisi d'utiliser un **Modèle Stateless** car celui-ci présente plusieurs avantages pour notre cas d'utilisation. <br>

- **La Scalabilité** : un modèle stateless permet de traiter les requêtes de manière indépendante, ce qui peut améliorer la scalabilité de l'application. En effet, le système n'a pas à conserver l'état de la session entre les requêtes, ce qui peut réduire la charge sur les ressources serveur.
- La Facilité de développement et de maintenance **: un modèle stateless rend l'application plus facile à développer et à maintenir, car le système n'a pas à gérer l'état de la session entre les requêtes. Cela peut réduire la complexité de l'application et faciliter l'ajout de nouvelles fonctionnalités.
- **Interopérabilité** : un modèle stateless rend l'application plus facile à intégrer à d'autres systèmes et à utiliser avec différents clients, car il ne nécessite pas de maintenir l'état de la session entre les requêtes. Cela peut être particulièrement utile dans le cas d'applications distribuées ou utilisant différents protocoles de communication.
- **La Sécurité** : un modèle stateless peut améliorer la sécurité de l'application en réduisant le risque de fuites d'informations sensibles liées à l'état de la session. En effet, comme le système n'a pas à conserver l'état de la session, il n'y a pas de données sensibles à protéger.

C'est pourquoi, notre proposition d'utilisation d'API s'est portée sur **l'API RESTful** avec un modèle **Stateless** plutôt qu'une **API REST** ou qu'un modèle **Stateful**.<br>

## ⚛️ Proposition de langage

![Langage proposition image](https://i.imgur.com/7kaaBB5.png)

La proposition de TypeScript plutôt que JavaScript a été motivé par plusieurs facteurs. <br>

Tout d'abord, TypeScript est un langage de programmation open-source qui est une extension de JavaScript,<br>
ajoutant la vérification de type statique au code, ce qui rends le debogage d'une application plus efficient.<br>

En plus de la vérification de type, TypeScript ajoute également un support de la programmation orientée objet au JavaScript,<br>
ce qui permet d'utiliser des concepts tels que les classes, les interfaces et les types génériques pour structurer le code de manière plus claire et plus évolutive.<br>

TypeScript est également connu pour sa meilleure documentation, grâce à la possibilité de définir les types de chaque variable et fonction dans le code. <br>
Cela rend la documentation plus complète et facilite la compréhension du code par d'autres développeurs,<br>
de ce fait, la maintenabilité et la lisibilité du code sont assurées de façon plus efficace.<br>

Enfin, TypeScript est compatible avec de nombreux outils et frameworks populaires pour le développement JavaScript, <br>
ce qui consistue un atout dans le cadre d'utilisation d'Angular par exemple.<br>

En résumé, TypeScript est un langage de programmation polyvalent et performant qui ajoute certains concepts<br> 
et une meilleure documentation au JavaScript, ce qui peut rendre le développement plus fiable et plus facile à maintenir.<br>

C'est pourquoi, notre proposition de langage s'est portée sur TypeScript plutôt que JavaScript.<br>

## 🌍 Proposition d'environnement d'exécution

![](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220614183841/laravel-vs-nodejs-vs-django.png)


Nous vous proposons Node.js comme environnement d'exécution pour plusieurs raisons.

### 👶🏼 Facilité de création d'applications Web

    Node.js dispose d'une large gamme
    de frameworks pour le développement back-end et front-end,
    ce qui rend la création d'applications Web très facile.

### 🗃 Environnement complet et puissant

    Node.js est un environnement complet et puissant,
    avec une large communauté de développeurs. 
    Cela permet d'avoir accès à de nombreuses ressources et à une documentation fournie.

### 🤖 Développement de bots Discord

    Dans le cadre de ce projet, nous souhaitons
    développer des bots Discord.
    Node.js offre une grande flexibilité et des performances élevées,
    ainsi qu'un large choix d'outils pour faciliter la communication entre les bots et Discord.

### 1️⃣ Utilisation d'un seul environnement

    Enfin, en choisissant Node.js comme<br>
    environnement d'exécution, nous pouvons développer à la fois des bots Discord et une<br>
    interface Web de configuration de ces bots et de consultation de données sur le serveur communautaire,<br>
    tout en utilisant un seul et même environnement.<br>

*Node.js a donc été retenu en tant qu'environnement d'exécution pour ce projet en raison de sa facilité de mise en place*,<br> 
*de sa flexibilité, de ses hautes performances, de sa large communauté et de la disponibilité d'outils pour la communication avec Discord*.<br> 
*De plus, en choisissant Node.js, nous pouvons développer tous les aspects de ce projet dans un seul et même environnement*.<br>

## 📦 Proposition de Framework Front-End

![framework front choice](https://digiwin.fr/wp-content/uploads/2021/03/1-GEVBYK_t2QirtIhCJwrxvA.jpeg)

Nous proposons d'utiliser **Angular** comme framework Front-End car c'est un outil très<br> 
puissant qui repose sur une architecture **MVC (Modèle-Vue-Contrôleur)** solide.<br>
Cette architecture permet de séparer efficacement les données, la logique et la présentation de l'application.<br>

Voici quelques raisons pour lesquelles **Angular** peut être un choix judicieux :<br>

- Angular propose des **bindings bidirectionnels**, ce qui est intéressant dans le cadre<br>
de ce projet en ce qui concerne la visualisation de données. <br>
En effet, grâce à ce système, il est possible de synchroniser en temps réel des changements de données.<br>

- Angular propose également un système de **composants réutilisables**, ce qui signifie que des<br> 
composants peuvent être utilisés dans certaines interfaces et réutilisés dans d'autres<br>
sans avoir à les redévelopper.<br>

- En outre, Angular a une **structure de fichiers claire et organisée**, ce qui peut rendre la<br>
maintenance de l'application plus facile pour d'autres développeurs, et donc assurer une<br>
meilleure maintenabilité de l'application.<br>

- Angular a également une grande **communauté de développeurs**, ce qui peut être une<br>
source précieuse d'aide et de soutien pendant le développement de cette application.<br>

En résumé, nous proposons donc d'utiliser Angular comme framework Front-End pour tous ces avantages.

## 📑 Proposition de base de donnée

![database proposition image](https://i.imgur.com/DxiRJ8j.png)

Nous proposons d'utiliser **PostgreSQL** comme système de gestion de base de données (SGBD) pour notre projet en raison de sa :

- **Fiabilité** : PostgreSQL a fait ses preuves en étant utilisé dans de nombreux projets à succès tel qu'Instagram par exemple.

- **Performance** : PostgreSQL est capable de traiter efficacement de grandes quantités de données.
Ce qui dans le cadre de notre projet semble être intéressant en raison du nombre de données que nous<br>
seront amenés à stocker sur le long terme.

- **Aide de la communauté** : La communauté active autour de PostgreSQL fournit un soutien précieux pour résoudre les problèmes qui peuvent survenir
lors de l'utilisation de PostgreSQL.<br>

- **Nature open source** : PostgreSQL nous donne la liberté de modifier les bases de données selon nos besoins.

Nous pensons que l'utilisation de PostgreSQL est la meilleure option pour assurer la persistance des données de notre application.

## 🧐 Proposition d'ORM

![ORM proposition image](https://i.imgur.com/GPDIYHZ.jpg)

Nous proposons d'utiliser **TypeORM** en tant qu'ORM afin de sécuriser les<br> 
interactions entre l'application et les bases de données.<br>

Voici quelques raisons pour lesquelles **TypeORM** peut être un choix judicieux :<br>

**TypeORM** est un ORM entièrement conçu en **TypeScript**, ce qui correspond à nos besoins en termes de langage.<br>
Il dispose d'une large communauté de développeurs et d'une documentation détaillée,<br>
ce qui peut apporter un nombre conséquent de ressources en termes de résolution de problèmes éventuels<br>
pouvant survenir lors du développement, ainsi que de nombreuses solutions pour le développement des fonctionnalités<br> 
dont nous aurons besoin.
- **TypeORM** est un ORM **open source**, ce qui est intéressant en termes de<br>
liberté quant à l'utilisation et la manipulation de ce dernier.
- **TypeORM** est performant et est utilisé par un grand nombre de développeurs<br>
en raison de sa flexibilité. Il prend en charge de nombreux SGBD, dont **PostgreSQL**.
- **TypeORM** gère automatiquement les schémas de base de données en termes<br>
de création et de modifications, selon les modèles établis dans le code, ce qui<br>
permet de gagner du temps<br>
- **TypeORM** prend en charge la migration de base de données, ce qui permet de<br>
gérer plus facilement les mises à jour du schéma de base de données.<br>
- **TypeORM** est très intuitif et simple d'utilisation, <br>
ce qui rend la manipulation de bases de données facile et intuitive.

En résumé, **TypeORM** est un ORM complet et polyvalent qui peut s'intégrer facilement à notre projet<br> 
et nous offrir une gestion sécurisée et efficace des interactions avec les bases de données.<br>

Sa grande communauté de développeurs et sa documentation détaillée en font également,<br>
 un choix de qualité pour le développement de notre application.<br>

## 👷‍♀️ Proposition de l'architecture d'application.

Nous proposons de ne pas utiliser une architecture micro-services pour notre application car elle présente plusieurs inconvénient, notament en ce qui est de la deadline :

- **Complexité accrue** : une architecture microservices peut être plus complexe à mettre en place et à maintenir qu'une architecture monolithe, car elle implique la mise en place de plusieurs services indépendants qui doivent être coordonnés.
- **Développement et déploiement plus longs** : le développement et le déploiement d'une application basée sur une architecture microservices peuvent être plus longs, car ils impliquent la mise en place et le déploiement de plusieurs services indépendants.
- **Intégration et tests plus complexes** : dans une architecture microservices, il peut être plus complexe de mettre en place des tests et de s'assurer que l'ensemble des services fonctionnent correctement ensemble.

En résumé, nous ne pouvons à l'heure actuelle opter pour une architecture micro-services par manque de temps mais également car cela require des compétences qu'aucun membre de Nore équipe dispose pour effectuer cela dans les temps.

## Choix de la couche N-tier

La couche N-tier (ou N-tier architecture) est une approche de design d'applications qui consiste à séparer l'application en plusieurs couches de responsabilité logiques. Chaque couche est responsable d'une tâche spécifique et peut être développée et mise à jour indépendamment des autres couches.

La couche d'administration sera développée en utilisant le Framework Angular pour gérer l'interface utilisateur du panel.

La couche logiciel de l'administration sera développée en utilisant le Framework NestJS pour gérer les interactions entre l'interface utilisateur et les données de l'application.

La couche logiciel publique sera développé en TS via l'API Discord pour permettre de gérer les interactions sur le logiciel Discord.

La couche de données sera développé en utilisant PostgreSQL et TypeORM pour gérer l'acces et la manipulation des données de l'application, qui seront stockées dans une base de données relationnelle.

En utilisant cette architecture N-tier, nous espérons rendre l'application plus facile à maintenir et à évoluer, tout en séparant clairement les responsabilités de chaque couche. Cela nous permettra également de développer et mettre à jour chaque couche de manière indépendante, ce qui accélère le processus de développement.
<<<<<<< HEAD
=======
## 👷‍♀️ Proposition de l'architecture d'application.

Nous proposons de ne pas utiliser une architecture micro-services pour notre application car elle présente plusieurs inconvénient, notament en ce qui est de la deadline :

- **Complexité accrue** : une architecture microservices peut être plus complexe à mettre en place et à maintenir qu'une architecture monolithe, car elle implique la mise en place de plusieurs services indépendants qui doivent être coordonnés.
- **Développement et déploiement plus longs** : le développement et le déploiement d'une application basée sur une architecture microservices peuvent être plus longs, car ils impliquent la mise en place et le déploiement de plusieurs services indépendants.
- **Intégration et tests plus complexes** : dans une architecture microservices, il peut être plus complexe de mettre en place des tests et de s'assurer que l'ensemble des services fonctionnent correctement ensemble.

En résumé, nous ne pouvons à l'heure actuelle opter pour une architecture micro-services par manque de temps mais également car cela require des compétences qu'aucun membre de Nore équipe dispose pour effectuer cela dans les temps.

## Choix de la couche N-tier

La couche N-tier (ou N-tier architecture) est une approche de design d'applications qui consiste à séparer l'application en plusieurs couches de responsabilité logiques. Chaque couche est responsable d'une tâche spécifique et peut être développée et mise à jour indépendamment des autres couches.

La couche d'administration sera développée en utilisant le Framework Angular pour gérer l'interface utilisateur du panel.

La couche logiciel de l'administration sera développée en utilisant le Framework NestJS pour gérer les interactions entre l'interface utilisateur et les données de l'application.

La couche logiciel publique sera développé via en TS via l'API discord pour permettre de gérer les interactions sur le logiciel Discord.

La couche de données sera développé en utilisant PostgreSQL et TypeORM pour gérer l'acces et la manipulation des données de l'application, qui seront stockées dans une base de données relationnelle.

En utilisant cette architecture N-tier, nous espérons rendre de l'application plus facile à maintenir et à évoluer, tout en séparant clairement les responsabilités de chaque couche. Cela nous permettra également de développer et mettre à jour chaque couche de manière indépendante, ce qui accélère le processus de développement.
>>>>>>> 9d97350 (docs(common) : add explication for ntiers choice)
