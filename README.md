# MARMITON

<ins>Structure du projet MEAN :</ins>

Ce projet est constitué de trois repertoires dont l'un regroupe la partie Front-End **MARMITON_CLIENT/**, un autre qui regroupe la partie Back-End **MARMITON_SERVEUR/** et un qui contient le dump de la base MongoDB **MARMITON_MONGOEXPORT/**.


<ins>Informations côté Serveur :</ins>

Dans le repertoire **MARMITON_SERVEUR/**, vous retrouverez un script bash intitulé *script.sh* qui permet de créer toutes les collections nécessaires pour notre base de données.
En somme, ce script bash vous permettra dans le même temps d'executer le serveur Node sur le port 8888.



## Guide de lancement

Pour vous faciliter la tâche, un script bash nommé *run.sh* va vous permettre d'ouvrir deux fenêtres de terminal dont l'une verra le serveur Node s'executer et l'autre le projet Angular. Il gère même l'installation de toutes les dépendances nécessaires afin que le serveur Node et le projet Angular puissent se lancer sans le moindre souci.
En vous plaçant dans le répertoire **ProjetMean_MARMITON/**, ouvrez un terminal et executez les commandes ci-dessous :

```sh
chmod +x run.sh
./run.sh
```
Pour que cette commande s'exécute sans soucis, assurez-vous d'avoir installé déjà *gnome-terminal* sur votre machine Linux.
Dans le cas contraire, executez la commande ci-dessous :

```sh
sudo apt-get install gnome-terminal
```

Vous avez ensuite plus qu'à profiter de l'ensemble des fonctionnalités de l'espace MARMITON.


### Auteurs

DABACHIL Ali (M1 GL)  
RAKKAOUI Merwane (M1 GL)  
ZEDDAM Lylia (M1 GL)








