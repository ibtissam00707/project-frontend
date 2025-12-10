# Projet Front End

L'objectif du projet sera de réaliser un frontend, de préférence en React.js/Next.js mais dans l'absolu avec n'importe quel framework frontend en utilisant ce backend comme API Rest.

## Fonctionnalités attendues 
* Afficher la liste des recettes paginée
* Afficher une recette spécifique
* Afficher les ingrédients d'une recette
* Mettre à jour la quantité d'ingredients lorsqu'on change le nombre de servings (uniquement côté client, sans sauvegarder en bdd ou autre)
* Ajouter une nouvelle recette avec des ingrédients
* Créer un conteneur docker pour lancer le backend et pour lancer les tests de celui ci


## Comment utiliser le backend
1. Cloner le projet
2. Modifier les `.env.dev` et `.env.test` pour y mettre les informations de votre database ou du conteneur
3. Faire un `composer install` pour installer les dépendances
4. Créer la bdd et charger les données : 
```
php bin/console do:da:cr
php bin/console do:mi:mi -q
php bin/console do:fi:lo -q
```
5. Pour préparer l'environnement de test :
```
php bin/console do:da:cr --env=test
php bin/console do:mi:mi -q --env=test
php bin/console do:fi:lo -q --env=test
```
6. Lancer les tests avec `php bin/phpunit`
7. Lancer le projet avec `symfony server:start` ou `php -t -S public localhost:8000` pour lancer le serveur sur http://localhost:8000

## Entités de l'application
```plantuml

class Recipe {
    
    id: int
    title:string
    category: string
    steps: string
    picture: string
    servings: int
}

class Ingredient {
    
    id: int
    label:string
    unit: string
    quantity: string
}

Recipe "1" -- "*" Ingredient
```

## Endpoints
Les endpoints sont consultables et testables sur http://localhost:8000/api

Seul la recipe possède des endpoint, la création/suppression d'ingredient se fait via la recipe directement tout comme la récupération des ingrédients d'une recette qui passe par la route http://localhost:8000/api/recipes/{id}/ingredients