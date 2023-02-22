# Règles de gestion

![gestion rules image](https://www.financewhile.com/wp-content/uploads/2021/01/Business-Rules.png)

# OnBoarding : 


- Le bot doit disposer d'un système de configuration.
  - Le bot doit avoir une commande de génération d'embed (dans un canal) pour l'ajout des membres du staff.
    - L'embed doit disposer d'une liste déroulante permettant de sélectionner le rôle afin de générer un lien d'invitation.
  - Le bot doit avoir une commande de génération d'embed (dans un canal) pour la création d'un nouveau type de formation.
    - L'embed doit disposer d'un bouton permettant d'envoyer une demande de nom pour le nouveau type de formation.
- Le bot doit avoir une commande de génération d'embed (dans un canal) pour l'ajout de formation.
    - L'embed doit disposer d'une liste déroulante permettant la sélection du type de formation.
      - Une demande doit être envoyée pour demander de compléter le nom de la formation.
      - Un nouvel embed doit être envoyé et doit disposer d'un bouton permettant de créer une nouvelle formation.
      - Le bot doit envoyer un message demandant la date de début et de fin de la formation.
  - Le bot doit avoir une commande de génération d'embed (dans un canal) pour l'ajout d'apprenants à une formation.
    - L'embed doit disposer d'une liste déroulante permettant de générer un lien d'invitation pour un nouvel apprenant, à une formation spécifique.
      - Le lien d'invitation doit être valide pour une seule personne.
  - Le bot doit avoir une commande de génération d'embed (dans un canal) pour l'ajout de nouveaux utilisateurs déjà présents sur le serveur Discord, à une formation.
    - L'embed doit disposer d'une liste déroulante permettant de sélectionner une formation spécifique.
      - Lors de la sélection de la formation, un nouvel embed doit être envoyé, il doit disposer d'un bouton permettant d'afficher un formulaire d'ajout d'utilisateur.
  - Le bot doit avoir une commande de génération d'embed pour l'ajout ou la modification de template de catégorie de formation.
    - Une catégorie de formation est un ensemble de canaux dédiés à une formation.
    - Le bot doit à la création d'une formation, générer un embed de configuration dans un channel propre à sa catégorie.
- Le lien d'invitation généré par le bot ne doit fonctionner que pour une personne.
- Le lien d'invitation doit être temporaire.
- Le bot ne doit pas pouvoir créer deux fois le même embed de configuration.
- Le bot doit pouvoir détecter si un embed a été supprimé pour permettre la création d'une nouvelle.
- L'administrateur peut supprimer un embed.

- Lors de l'ajout d'un utilisateur à une formation, le bot doit envoyer une demande de vérification (dans un canal dédié à cette formation).
- Le bot doit imposer une identification lors de l'arrivée d'un nouvel apprenant ou nouveau membre du staff.
  - Lors de l'arrivée d'un nouvel apprenant, le bot doit envoyer un message de demande de vérification (dans un canal dédié à cette formation).
  - Lors de l'arrivée d'un nouveau staff, le bot doit envoyer un message de demande de vérification (dans un canal dédié au staff).
    - Une fois la vérification de l'identité validée, le rôle doit être attribué par le bot à l'utilisateur du lien.
- Le bot doit mettre en place un embed (dans un canal) permettant de sélectionner les formations visibles pour le staff.

# Gestion des signatures

- Le bot doit générer à la création de la formation, un canal spécifique dans lequel se trouve un embed pour notifier les non-signatures aux apprenants.
  - L'embed doit posséder une liste de cases à cocher pour les apprenants de la formation.
    - Lors de la sélection d'un apprenant, un message privé doit être envoyé par le bot pour signaler le problème.
  - La liste de cases à cocher doit être utilisée uniquement par le formateur.

- Le bot doit générer à la création de la formation, un embed permettant pour les apprenants de notifier le formateur de l'absence d'émargement.
  - L'embed doit disposer d'un bouton permettant d'envoyer un message privé au formateur.
    - Pour envoyer le message privé, il faut que 3 apprenants signalent le problème.

- Le formateur peut envoyer le code d'émargement dans un channel dedié à la formation.
  - Lorsque le formateur le décide, il peut désactiver la fonction de rappel des signatures pour les aprenants de la formation. 
  
- Le rappel se réactive tous les jours à 8h et 12h.

# Pôle

- Un pôle est composé de 1 à n membres.
- Un pôle est représenté par un rôle au sein de l'organisation de Simplon-HDF.
- Un pôle doit être affilié à un rôle du serveur.
- Le bot doit mettre en place un embed (dans un canal) permettant de selectionner les formations visibles pour le staff.

# Un ticket

- Un ticket est constitué d'un numéro d'identification.
- Un ticket est composé d'un nom.
- Un ticket est composé d'un créateur représenté par un utilisateur affilié à Simplon-HDF.
- Un ticket est composé d'un pôle destinataire.
- Un ticket est composé d'un fil de discussion asynchrone.
- Un ticket peut être fermé par son créateur et par le pôle destinataire.
- Un ticket peut être marqué comme résolu par un membre du pôle destinataire.
- Un ticket peut être archivé par un membre du pôle destinataire.
- Un ticket peut être sauvegardé de façon externe.

# Bot Ticketing

- Le bot doit disposer d'un embed (dans un canal) permettant à un utilisateur affilié à Simplon de créer un nouveau ticket. 
  - Cet embed doit disposer d'un bouton permettant de commencer la création d'un nouveau ticket.
    - Une demande de nom de ticket doit être envoyée à la création.
    - Une embed doit être envoyée disposant d'une liste déroulante permettant de sélectionner le pôle visé.
    - Le bot doit créer un fil de discussion dédié pour le ticket dans une catégorie adaptée.
      - Cette catégorie doit être visible uniquement par le pôle visé.
      - Le bot doit générer dans le fil de discussion du ticket un embed disposant d'un bouton.
      - Cet embed doit disposer d'un bouton permettant de fermer le ticket.
        - Le ticket doit être archivé une fois fermé.

## Configuration

- Le bot doit disposer d'une commande permettant de générer un embed (dans un canal) pour créer des tickets.

# Un sondage

- Un sondage est un embed.
- Un sondage contient plus ou moins de boutons permettant de voter.
- Il contient un message.
- Il peut contenir des images.
- Un sondage peut être signalé.

# Bot sondage

- Le bot doit disposer d'un embed (dans un canal) permettant à un utilisateur de commencer la création d'un sondage.
- L'embed doit disposer d'un bouton permettant de commencer une configuration de sondage.
- La configuration de sondage permet d'ajouter du texte, des images et des champs de votes potentiels et la durée, et le canal dans lequel l'envoyer.

- Le sondage doit être supprimé après le temps déterminé pendant la configuration.
- Le sondage doit pouvoir être signalé via une commande par tous les utilisateurs.
- A partir d'un certain nombre de signalements, le sondage doit être supprimé automatiquement.

- L'utilisateur qui créée le sondage peut le fermer le fermer ou le supprimer.
- Une image representant les resultats doit etre envoyé à la fin du sondage.


## Configuration

- Le bot doit disposer d'une commande permettant de définir une durée de sondage par défaut.
- Le bot doit disposer d'une commande permettant de générer un embed (dans un canal) pour créer des sondages.

# Feedback bot

- Le bot doit mettre à disposition un canal dédié aux membres du staff afin de consulter les feedbacks des apprenants.
- Ce canal est affilié à la catégorie de la formation.
- Les apprenants peuvent envoyer un message au bot afin de faire leur feedback.
- Le bot doit considérer les messages uniquement des apprenants.
- Le bot doit considérer uniquement 1 message par apprenant.
- Le bot doit considérer uniquement les messages des apprenants une semaine avant la fin de leur formation. 
- Le bot doit envoyer le message dans le canal dédié afin de préserver l'anonymat des feedbacks des apprenants.

## Configuration 

- Le bot doit mettre à disposition une commande permettant son activation.
- Le bot doit mettre à disposition une commande permettant sa désactivation.
- Le bot doit mettre à disposition une commande permettant d'activer les feedbacks selon les formations.
- Cet embed doit être composé d'une liste déroulante permettant de sélectionner la formation sur laquelle activer ou désactiver les feedbacks.

# SimplonHub Bot

- Le bot doit permettre aux utilisateurs de voter pour encourager une ressource.
- Le bot doit permettre aux utilisateurs de voter pour condamner une ressource.
- Le bot doit analyser les ressources partagées dans les canaux ou catégories dédiées pour détecter si elle est déjà présente ou si elle a déjà été condamnée.
- La mise en condamnation doit renomer le nom du poste en rajoutant une annotation "condamné" à la fin et fermer le poste.
- L'utilisateur peut effectuer un message commande (action specifique a discord) pour report le message.

## Configuration

- Le bot doit mettre à disposition une commande permettant son activation.
- Le bot doit mettre à disposition une commande permettant sa désactivation.
- Le bot doit mettre à disposition une commande permettant de lier un canal spécifique à un tag.
- Le bot doit mettre à disposition une commande permettant de lier une categorie spécifique à un tag . 
