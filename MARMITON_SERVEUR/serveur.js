const express = require('express');
const app     = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Content-type', 'application/json');
    next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectId;
const url         = "mongodb://localhost:27017";
const mongodb = require('mongodb');

console.log("----------------------------------------------");
console.log("Projet MEAN | MARMITON")
console.log("Lancement du serveur Node sur le port 8888 !");

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("MARMITON");

    // Liste des ingrédients 
    app.get("/ingredients", (req,res) => {
        console.log("/ingredients");
        try {
            db.collection("ingredients").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /ingredients : " + e);
            res.end(JSON.stringify([]));
        }
    });


    // Liste des recettes contenant un nom d'ingrédient spécifique
    app.get("/ingredients/:nom", (req,res) => {
        let name = req.params.nom;
        recettes = [];
        console.log("/ingredients/"+name);

            try {
                db.collection("recettes").find().toArray((err, documents) => {
                    
                    for (let rec of documents) {
                        for(let ing of rec.ingredients){
                            if (ing.nom == name){
                                recettes.push(rec);
                            }
                        }
                    }
                    res.end(JSON.stringify(recettes));


                });
            } catch(e) {
                console.log("Erreur sur /ingredients/"+name+" : "+ e);
                res.end(JSON.stringify([]));
            }
        });


    // Liste des recettes 
    app.get("/recettes", (req,res) => {
        console.log("/recettes");
        try {
            db.collection("recettes").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /recettes : " + e);
            res.end(JSON.stringify([]));
        }
    });

    // Liste des commentaires de recettes 
    app.get("/commentaire", (req,res) => {
        console.log("/commentaire");
        try {
            db.collection("commentaire").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /commentaire : " + e);
            res.end(JSON.stringify([]));
        }
    });

    
      // Liste des recettes dont le prix ne dépasse pas un certain coût
      app.get("/recettes/:cout", (req,res) => {
        let cost = req.params.cout;
        recettes = [];
        console.log("/recettes/"+cost);

            try {
                db.collection("recettes").find().toArray((err, documents) => {             
                    for (let rec of documents) {
                       let coutRecCalc = 0.; // Coût total d'une recette donnée calculée de manière itérative en parcourant chaque ingrédient de sa liste
                        for(let ing of rec.ingredients){
                            coutRecCalc += ing.prix * ing.quantite;
                          }
                          if(coutRecCalc <= cost){
                              recettes.push(rec);
                              recettes.push("coutRecCalc",coutRecCalc);
                              console.log("COUT CALCULE : ",coutRecCalc);
                          }                          
                    }                
                    res.end(JSON.stringify(recettes));
                });
            } catch(e) {
                console.log("Erreur sur /recettes/"+cost+" : "+ e);
                res.end(JSON.stringify([]));
            }
        });

        // Liste des internautes 
        app.get("/users", (req,res) => {
            console.log("/users");
            try {
                db.collection("users").find().toArray((err, documents) => {
                    res.end(JSON.stringify(documents));
                });
            } catch(e) {
                console.log("Erreur sur /users : " + e);
                res.end(JSON.stringify([]));
            }
        });

        app.post("/users/connexion", (req,res) => {
            console.log("/users/connexion avec "+JSON.stringify(req.body));
            try {
                if ( (req.body['password'] !== undefined) && ( (req.body['email'] !== undefined) || (req.body['pseudo'] !== undefined)) ) {                      
                db.collection("users").find(req.body).toArray((err, documents) => {
                    if (documents.length == 1) {
                       res.end(JSON.stringify({"resultat": 1, "message": "Connexion réussie", "user": documents[0] }));                      
                    } else { 
                        res.end(JSON.stringify({"resultat": 0, "message": "Email et/ou mot de passe incorrect"}));	
                    }
                });
                }else {
                    res.end(JSON.stringify({"resultat": 0, "message": "Informations incomplètes pour la connexion"}));
                }
            } catch (e) {
                res.end(JSON.stringify({"resultat": 0, "message": e}));
            }
        });
        


        
        // Inscription d'un utilisateur
        app.post("/users/inscription", (req, res)=> {
            console.log("/users/inscription/" + " avec " + JSON.stringify({pseudo:req.body['pseudo'],email:req.body['email']}));
            try{
                // Tests de vérification si email et/ou pseudo déjà utilisé lors de l'inscription de l'internaute 
                // Cas 1 : email déja utilisé
                // Cas 2 : pseudo déjà utilisé
                // Cas 3 : pseudo et email déjà utilisés
                let c1 = 0;
                let c2 = 0;
                const emailTrouve = db.collection("users").find({"email":req.body['email']}).count({}, function (error, count1) {
                    console.log(count1 + " correspondance trouvée avec l'email");
                    c1 = count1;
                  });
                const pseudoTrouve = db.collection("users").find({"pseudo":req.body['pseudo']}).count({}, function (error, count2) {
                    console.log(count2 + " correspondance trouvée avec le pseudo");
                    c2 = count2;
                  });
                db.collection("users").find({"pseudo":req.body['pseudo'],"email":req.body['email']}).toArray((err, documents) => {
                    if(documents.length == 1 || c1 == 1 || c2 == 1) {
                        res.end(JSON.stringify({"resultat": 0, "message": "Utilisateur déjà connu car pseudo/email déjà présent dans la base"}));
                    }

                    else {	
                        db.collection("users").insertOne(req.body);
                        res.end(JSON.stringify({"resultat": 1, "message": "Inscription réussie"}));
                    }
                
                });
    
            } catch(e) {
                res.end(JSON.stringify({"resultat": 0, "message": "Echec de l'inscription : cet utilisateur existe déjà dans la base"}));
            }
    
        });


        // Ajout d'une nouvelle recette        
        app.post("/recettes/ajout", (req,res) => {
            console.log("/recettes/ajout avec "+JSON.stringify(req.body));
            try {
                db.collection("recettes").insertOne(req.body);
                res.end(JSON.stringify({"resultat": 1, "message": "Ajout de la recette effectué avec succès !"}));
            } catch (e) {
                res.end(JSON.stringify({"resultat": 0, "message": e}));
            }
        });   
        
        // Ajout d'un commentaire à une recette
        app.post("/commentaire/ajout", (req,res) => {
            console.log("/commentaire/ajout avec "+JSON.stringify(req.body));
            try {
                db.collection("commentaire").insertOne(req.body);
                res.end(JSON.stringify({"resultat": 1, "message": "Publication de commentaire faite avec succès !"}));
            } catch (e) {
                res.end(JSON.stringify({"resultat": 0, "message": e}));
            }
        });  

        // Suppression d'un commentaire d'une recette identifié par son id
        app.delete("/commentaire/:id", (req,res) => {
            console.log(req.params.id);
            console.log("/commentaire/:id avec "+JSON.stringify(req.body));
            try {
                db.collection("commentaire").deleteOne({_id : new mongodb.ObjectID(req.params.id)});
                res.end(JSON.stringify({"resultat": 1, "message": "Suppression du commentaire faite avec succès !"}));
            } catch (e) {
                res.end(JSON.stringify({"resultat": 0, "message": e}));
            }
        }); 



        
    });

app.listen(8888);
