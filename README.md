![Simplon logo](https://www.actuia.com/wp-content/uploads/2019/07/%C3%A9cole-simplon.png)

# 📑 Sommaire

- <a href="#introduction">Introduction</a>
- <a href="#architecture">Architecture du projet</a>
- <a href="#project-doc">Documentation relative au projet</a>
  - <a href="#project-presentation">Présentation du projet</a>
  - <a href="#project-technical-documentation">Présentation des choix techniques</a>

## Checklist Projet

- [X] **Choix de la méthodologie de travail**
- [X] **Créer un repo Github**
- [X] **Créer la structure du repo (Best practice)**
    - Dossier
        - [X] .config
        - [X] dep
        - [X] doc
        - [X] res
        - [X] samples
        - [X] tools
        - [X] build
        - [X] test
        - [X] src
    - Fichier
        - [ ] LICENCE.md
        - [X] README.md
        - [ ] .gitattributes
        - [X] .gitignore
        - [ ] .gitmodules
        - [ ] .dockerignore

- [x] **Mise en place du Readme**
- [ ] **Cadrage de la demande client**
  - [X] Contexte / Enjeux / Problèmatique
  - [X] Questions entretiens
  - [X] Persona
  - [x] Présentation (PowerPoint)
  - [X] Mail de suivie / Proposition stratégique
- [ ] 4**Benchmark (Analyse de la concurence)**
- [ ] **Spécification fonctionnelle**
  - [X] Règle de gestion
  - [ ] UML
    - [ ] Diagramme d'activité
    - [ ] Use case
    - [ ] Diagramme de séquence
    - [ ] Diagramme de classe
  - [ ] Merise
    - [ ] MCD
    - [ ] MLD
    - [ ] MPD
  - [ ] RBAC
- [ ] **Epic**
  - [X] User Story
  - [ ] Product backlog (Tâches)
- [x] **Jira**
- [ ] **Rituels agiles**
  - [ ] Sprint planning meeting (Avant)
  - [ ] Stand up meeting (Tout les matins)
  - [ ] Sprint retrospective (Fin de sprint)
  - [ ] Sprint Review (Fin de sprint)

- [ ] **Démarrer les sprints**


# 📄 Introduction <a id="introduction"></a>

Dans le cadre de la formation CDA dispensé par Simplon, mon équipe doit réaliser un projet Fil-Rouge.<br>

Ce projet consiste en la création d'un serveur communautaire Discord ayant pour but de réunir les différents<br>
acteurs de Simplon au sein d'un seul et même serveur Discord afin qu'à terme toute ou une majeure partie de <br>
l'organisation de Simplon soit centralisée en un seul et même point.<br> 

L'équipe est constituée de 4 membres :

- **GAMACHE Benjamin** qui a le rôle de **Product Owner** dont la fonction est entre autre de prendre en charge les intéractions<br>
entre l'équipe en charge du projet et le client.

- **BOUREZ Bastien** qui a le rôle de **Scrum Master** dont la fonction est de diriger les membres de l'équipe en charge du projet<br> 
et d'assigner des tâches à chacun.

- **PHILIPPE Nelson** qui a le rôle de **Développeur** dont la fonction est de développer les différentes solutions élaborées par tous<br>
les membres de l'équipe en charge du projet et validées par le client.<br>

- **LEROY Cédric** qui a lui aussi le rôle de **Développeur**.<br>

Nous travaillons donc en Méthode Agile qui est une méthodologie utilisée au sein des entreprises dans la majorité des cas.<br>
Note : Le **Product Owner** ainsi que le **Scrum Master** ont aussi pour rôle de développer, cependant, certaines responsabilités
sont inhérentes à ces rôles spécifiques.<br>

# 🗂 Architecture du projet <a id="architecture"></a>

Ce Repository est découpé selon certaines bonnes pratiques, nous allons les expliquer : 

- Le dossier **.build** correspond à toutes les ressources relatives au build de l'application.<br>
Les fichiers CMAKE par exemple, devraient être placés dans ce dossier, ainsi que les fichiers SH,<br>
ou encore les fichiers relatifs à Docker par exemple.<br>

- Le dossier **.config** correspond aux ressources relatives à la configuration de l'environnement<br>
d'éxecution local, afin d'initialiser le projet.<br>

- Le dossier **.github** correspond aux ressources relatives à Github, ce dossier peut contenir<br>
la liste non-exhaustive des contributeurs ainsi que le code de conduite à adopter entre autre.<br>

- Le dossier **dep** correspond aux dépendances relatives au projet, ce dossier doit contenir<br>
les dépendances relatives au bon fonctionnement de l'application.<br>

- Le dossier **doc** correspond aux ressources relatives à la documentation du projet ainsi qu'à<br>
l'application.<br>

- Le dossier **res** correspond aux ressources statiques relatives au projet ainsi que l'application,<br>
il peut s'agir d'image par exemple.<br>

- Le dossier **src** correspond aux fichiers source de l'application, c'est à dire le code source<br>
de cette dernière.<br>

- Le dossier **test** correspond aux ressources relatives aux tests au cours du développement,<br>
c'est à dire les test unitaires, les tests d'intégrations par exemple.<br>

# 🗒 Documentation relative au projet <a id="project-doc"></a>

Dans le cadre de ce projet, nous avons dû rédiger des documents afin de présenter à notre client<br>
(Direction Simplon) des pistes d'amélioration au sein de l'organisme.

## 🎤 Présentation du projet <a id="project-presentation"></a>

Dans un premier temps nous avons rédigés un document de présentation du contexte dans lequel ce<br>
projet à vu le jour, puis nous avons introduit notre client afin d'ajouter d'avantage de contexte<br>
au projet, ainsi nous avons établis une liste de problématiques, dans l'optique d'établir des<br>
stratégies de résolutions de ces dernières.<br>

Ce document peut être consulté en cliquant <a href="doc/improvement-proposition-strategy.md">ici</a>

## 🎤 Présentation technique du projet <a id="project-technical-documentation"></a>

Dans un second temps, nous avons rédigés un document de présentation des choix techniques que<br>
nous avons réalisés, nous avons donc dû réaliser des études quant au différentes technologies<br>
envisageables dans le cadre de la mise en place de ce projet, et avons comparés ces différentes<br>
technologies afin d'obtenir des **Benchmarks** dans l'optique d'obtenir la meilleure technologie<br>
dans chaque domaine, nous avons donc rédigés un document récapitulatif et explicatif de nos choix<br>
afin de permettre à de tiers personnes d'en comprendre les enjeux ainsi que les raisons qui ont<br>
motivées nos choix.<br>

Ce document peut-être consulté en cliquant <a href="doc/technical-proposition.md">ici</a>