mongoimport --db MARMITON --collection ingredients --file ./Collections/ingredients.json --jsonArray --drop
mongoimport --db MARMITON --collection recettes --file ./Collections/recettes.json --jsonArray --drop
mongoimport --db MARMITON --collection users --file ./Collections/users.json --jsonArray --drop
mongoimport --db MARMITON --collection commentaire --file ./Collections/commentaire.json --jsonArray --drop

node serveur.js



