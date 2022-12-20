# Sommaire

- <a href="#introduction">Introduction</a>
- <a href="#architecture">Architecture du projet</a>

# Introduction <a id="introduction"></a>

Dans le cadre de la formation CDA dispensé par Simplon, mon équipe doit réaliser un projet Fil-Rouge.<br>

Ce projet consiste en la création d'un serveur communautaire Discord ayant pour but de réunir les différents<br>
acteurs de Simplon au sein d'un seul et même serveur Discord afin qu'à terme toute ou une majeure partie de <br>
l'organisation de Simplon soit centralisée en un seul et même point.<br> 

L'équipe est constituée par 4 membres :

- **GAMACHE Benjamin** qui a le rôle de **Product Owner** dont la fonction est entre autre de prendre en charge les intéractions<br>
entre l'équipe en charge du projet et le cient.

- **BOUREZ Bastien** qui a le rôle de **Scrum Master** dont la fonction est de diriger les membres de l'équipe en charge du projet<br> 
et d'assigner des tâches à chacun.

- **PHILIPPE Nelson** qui a le rôle de **Développeur** dont la fonction est de développer les différentes solutions élaborées par tous<br>
les membres de l'équipe en charge du projet et validées par le client.<br>

- **LEROY Cédric** qui a lui aussi le rôle de **développeur**.<br>

Nous travaillons donc en Méthode Agile qui est une méthodologie utilisée au sein des entreprises dans la majorité des cas.<br>
Note : Le **Product Owner** ainsi que le **Scrum Master** ont aussi pour rôle de développer, cependant, certaines responsabilités
sont inhérentes à ces rôles spécifiques.<br>

# Architecture du projet <a id="architecture"></a>

Ce Repository est découpé selon certaines bonnes pratiques, nous allons les expliquer : 

- Le dossier **.build** correspond à toutes les ressources relatives au build de l'application.<br>
Les fichiers CMAKE par exemple, devraient être placés dans ce dossier, ainsi que les fichiers SH,<br>
ou encore les fichiers relatifs à Docker par exemple.<br>

- Le dossier **.config** correspond aux ressources relatives à la configuration de l'environnement<br>
d'éxecution local, afin d'initialiser le projet.<br>

- Le dossier **.github** correspond aux ressources relatives à Github, ce dossier peut contenir<br>
la liste non-exhaustive des contributeurs ainsi que le code de conduite à adopter en autre.<br>

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