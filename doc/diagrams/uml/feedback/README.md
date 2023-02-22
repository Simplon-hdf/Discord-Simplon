# Sommaire

- <a href='#context'>Contexte</a>
- <a href='#usecase-diagram'>Diagramme de cas d'utilisation</a>
- <a href='#activities-diagram'>Diagramme d'activités</a>
- <a href='#sequences-diagram'>Diagramme de séquences</a>
- <a href='#classes-diagram'>Diagramme de classes</a>

# Contexte

Le **Bot de Feedback** doit permettre aux **apprenants** ainsi qu'aux **alumnis** de faire des retours quant à une formation qu'ils ont suivis auprès de Simplon, cela se caractérise par la mise en place d'un canal dédié régie par le **Bot**.

# Diagramme de cas d'utilisation <a id='usecase-diagram'></a>

Le diagramme de cas d'utilisation représente les cas d'utilisation possibles d'une application de façon générale et très peu détaillée : 

<img src='use-case.png'/>

## Explication du diagramme

Ce présent diagramme indique qu'un membre du **Staff** peut consulter un feedback, ce qui implique que le **Bot** affiche le feedback au membre du **Staff**.
Afin de permettre l'affichage du feedback, un apprennant (représenté ici par l'acteur **Learner**) doit au préalable envoyer un feedback, pour se faire
le bot doit mettre à disposition de l'**Apprenant** un **encart** dédié à l'envoi d'un feedback.

# Diagramme d'activités <a id='activities-diagram'></a>

Le diagramme d'activités représente les différentes activités d'une application de façon générale et peu détaillée, il est conçu à partir du <a href='#usecase-diagram'>**diagramme de cas d'utilisation**</a>

<img src='activity-diagram.png'/>

## Explication du diagramme

Ce présent diagramme indique qu'un **Apprenant** rejoint un canal dédié à l'envoi d'un **feedback** concernant la formation qu'il a suivi, l'apprenant reçoit alors un encart permettant de laisser son **feedback**, le **bot** l'enregistre alors et demande à **Discord** d'afficher un message notifiant à l'**Apprenant** que son feedback à bien été enregistré.

# Diagramme de séquences <a id='sequences-diagram'></a>

Le diagramme de séquence représente les différentes activités d'une application de façon très détaillée, il est conçu à partir du <a href='#activities-diagram'>**diagramme d'activités**</a>

<img src='sequence-diagram.png'/>

La lecture de ce diagramme suffit à son compréhension en raison de son niveau de détail.

# Diagramme de classes <a id='classes-diagram'></a>

Le diagramme de classe représente les différentes classes d'une application, ce diagramme doit être utilisé lors de la phase de développement afin de permettre aux développeurs de savoir la façon dont doit être développer l'application.<br>

<img src='class-diagram.png'/>

## Explication du diagramme

- La classe **Guild** représente ici le serveur Discord sur lequel le **Bot** se trouve.
- Une classe **User** (représentant un utilisateur) agrège la classe **Guild**.
- Une classe **Staff** généralise (hérite) de la classe **User**.
- Une classe **Learner** généralise (hérite) de la classe **User**.
- La classe **Learner** est associée à une autre classe nommée **Feedback**.
- Cette classe **Feedback** est associée à une autre classe nommée **FeedbackChannel**.
- La classe **FeedbackChannel** généralise (hérite) de la classe **Channel**.
- Cette classe **Channel** compose la classe **Guild**.