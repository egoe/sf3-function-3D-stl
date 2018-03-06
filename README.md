# Projet basé sur Symfony3
<p>
Ce bootstrap fournit un projet symfony3 prêt à l'emploi avec des fonctionnalités comme
</p>

* Administration grâce à EasyAdminBundle

* Une interface RestFull grâce à FOSRestBundle

* Un système de gestion des utilisateurs grâce à FOSUserBundle

* un exemple de service avec un alias configuré sous app/config/services.yml et appelée damn le controleur FrontBundle/Controller/DefaultController.php 

* un listener pour découpler l'envoie des emails dans un service et utiliser les evenements 
Exemple UserEvent et UserEventSubscriber

## Docker

Une commande symfony3 a été developpe pour faciliter la mise en place de docker

bin/console docker:init


Pour plus d'informations sur l'installation de docker jeter un oeil ici
https://github.com/maxpou/docker-symfony