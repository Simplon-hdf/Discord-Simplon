# Règles de gestion

![gestion rules image](https://www.financewhile.com/wp-content/uploads/2021/01/Business-Rules.png)

## OnBoarding : 

- Le bot doit disposer un systeme de configuration.
  - Le bot doit avoir une commande de generation d'embed (dans un canal) pour l'ajout des staffs .
    - L'embed doit disposer d'une liste box permettant de selectionner le role afin de generer un lien d'invitation.
  - Le bot doit avoir une commande de generation d'embed (dans un canal) pour la creation d'un nouveau type de formation.
    - L'embed doit disposer d'un bouton permettant d'envoyer une demande de nom de nouveau type.
  - Le bot doit avoir une commande de generation d'embed (dans un canal) pour l'ajout de formation.
    - L'embed doit disposer d'une liste box permettant la selection du type de formation.
      - Un demande doit être envoyer pour demander de completer le nom de la formation.
      - Un nouvel embed doit etre envoye et doit disposer d'un bouton permettant de creer une nouvel formation.
      - Le bot doit envoyer un message demandant la date de commencement et de fin de formation.
  - Le bot doit avoir une commande de generation d'embed (dans un canal) pour l'ajout d'apprenant a une formation.
    - L'embed doit disposer d'une liste box permettant de generer un lien d'invitation pour un nouvel apprenant, a une formation specifique.
      - Le lien d'invitation doit etre effectif pour une seul personne.
  - Le bot doit avoir une commande de generation d'embed (dans un canal) pour l'ajout de nouveaux utilisateur deja present sur le serveur discord, a une formation.
    - L'embed doit disposer d'une liste box permettant de selectionner une formation specifique.
      - Lors de la selection de la formation, un nouvel embed doit etre envoyer, il doit disposer d'un bouton permettant d'afficher un formulaire d'ajout d'utilisateur.
  - Le bot doit avoir une commande de generation d'embed pour l'ajout ou la modification de template de categorie de formation.
    - Une categorie de formation est un ensemble de canaux dedie a une formation.
    - Le bot doit à la creation d'une formation, générer un embed de configuration dans un channel propre à ça catégorie.
  - Le lien d'invitation générer par le bot ne doit fonctionner que pour une personne.
  - Le lien d'invitation doit etre temporaire.
- Le bot ne doit pas pouvoir creer deux fois la même embed de configuration.
- Le bot doit pouvoir detecter si un embed à été supprimé pour permettre la recreation d'une nouvelle.
- L'administrateur peut supprimer un embed.

- Lors de l'ajout d'un utitlisateur a une formation, le bot doit envoyer une demande de verification (dans un canal) dedié à ça formation.
- Le bot doit imposer une identification lors de l'arrive d'un nouvel apprenant ou nouveau membre du staff.
  - Lors de l'arrive d'un nouvel apprenant, le bot doit envoyer un message de demande de verification (dans un canal) dedié à ça formation.
  - Lors de l'arrive d'un nouveau staff, le bot doit envoyer un message de demande de verification (dans un canal) dedié au staff.
    - Une fois la verification de l'identité validée, le role doit etre attribué par le bot à l'utilisateur du lien.

- Le bot doit mettre en place un embed (dans un canal) permettant de selectionner les formations visibles pour le staff


## Gestion des signatures

- Le bot doit générer à la création de la formation, un embed doit être généré (dans un canal specifique) pour notifié les non signatures au apprenants
  - L'embed doit posseder une liste de box des apprenants de la formation
    - Lors de la selection d'un apprenant un message privé doit être envoyé par le bot pour signaler le problème.
  - La liste box doit être utilisé uniquement par le staff
  
- Le bot doit générer à la création de la formation, un embed permettant de notifié le formateur de l'absence d'émargement
  - L'embed doit disposer d'un bouton permettant d'envoyer un message privé au formateur.
    - Pour envoyer le message privé, il faut que 3 apprenants signal le problème.

- Le bot doit disposer d'une interface (un canal) permettant à un utilisateur affilié à Simplon de créer un nouveau ticket 
  - Ce canal est composé :
  - D'un bouton permettant de créer un nouveau ticket
  - D'un champ de texte permettant de renseigner le nom du ticket
  - D'une listbox permettant de selectionner le pôle de destination du ticket
  - D'un bouton permettant de confirmer l'ouverture du ticket


## Gestion des signatures

- Le bot doit générer à la création de la formation, un embed doit être généré (dans un canal specifique) pour notifié les non signatures au apprenants
  - L'embed doit posseder une liste de box des apprenants de la formation
    - Lors de la selection d'un apprenant un message privé doit être envoyé par le bot pour signaler le problème.
  - La liste box doit être utilisé uniquement par le staff


# Pôle

- Un pole est composé de 1 à n membres
- Un pole est représenté par un rôle au sein de l'organisation de Simplon-HDF
- Un pôle doit être affilié à un rôle du serveur
- Le bot doit mettre en place un embed (dans un canal) permettant de selectionner les formations visibles pour le staff

# Un ticket

- Un ticket est constitué d'un numéro d'identification
- Un ticket est composé par un nom
- Un ticket est composé d'un créateur représenté par un utilisateur affilié à Simplon-HDF
- Un ticket est composé d'un pôle destinataire
- Un ticket est composé d'un thread de discussion asynchrone
- Un ticket peut être fermé par son créateur et par le pôle destinataire
- Un ticket peut être marqué comme résolu par un membre du pôle destinataire
- Un ticket peut être archivé par un membre du pôle destinataire
- Un ticket peut être sauvegardé de façon externe

# Bot Ticketing

## Configuration

- Le bot doit mettre à disposition une commande permettant de modifier la catégorie dans laquelle les tickets seront situés
- Le bot doit mettre à disposition une commande permettant d'ajouter un pîle auquel s'addresser
- Le bot doit mettre à disposition une commande permettant de supprimer un pôle auquel s'addresser

----

- Le bot doit disposer d'une interface (un canal) permettant à un utilisateur affilié à Simplon de créer un nouveau ticket 
  - Ce canal est composé :
  - D'un bouton permettant de créer un nouveau ticket
  - D'un champ de texte permettant de renseigner le nom du ticket
  - D'une listbox permettant de selectionner le pôle de destination du ticket
  - D'un bouton permettant de confirmer l'ouverture du ticket

# Bot feedback

- Le bot doit mettre à disposition un canal dédié aux apprenants afin de faire un retour sur leur formation
- Ce canal est affilié à la catégorie de la formation
- Ce canal est affiché à la vue des apprenants lors de la dernière semaine de formation
- Les apprenants peuvent poster un message dans ce canal afin d'intéragir avec le bot
- Le canal devient invisible pour un apprenant lorsqu'il a posté son feedback
- Le bot doit supprimer le message du canal et le reposter afin d'assurer l'anonymité du message

## Configuration

- Le bot doit mettre à disposition une commande permettant son activation
- Le bot doit mettre à disposition une commande permettant sa désactivation