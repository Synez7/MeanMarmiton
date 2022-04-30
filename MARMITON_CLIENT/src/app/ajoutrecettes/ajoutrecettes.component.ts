import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { User, UserService } from '../services/user.service';


export interface Ingredients {
  nom : String,
  unite : String, 
  quantite : String,
  prix : String
}



@Component({
  selector: 'app-ajoutrecettes',
  templateUrl: './ajoutrecettes.component.html',
  styleUrls: ['./ajoutrecettes.component.css']
})



export class AjoutrecettesComponent implements OnInit {

  constructor(public userServ : UserService, private router : Router, private serviceRecette : RecetteService) { }

  ngOnInit(): void {
    if (!this.userServ.estConnecte())
      this.router.navigate(['denied']);
  }

 


  public ajouterRecette(nom : String, tempsDePreparation : String, difficulte : String, tempsDeCuisson : String, nombrePersonne : String) {
    // Internaute connecté et tous les champs d'informations doivent être remplis !
    if (this.userServ.estConnecte() === true && nom != '' && tempsDePreparation != '' && difficulte != '' && tempsDeCuisson != '' && nombrePersonne != '') {
      let user : User = this.userServ.getUserAuthenticated() ;

      let auteurId : String = user._id;
      let recetteAuteur : String = user.pseudo;
      let recetteDate = new Date().toLocaleDateString("fr");

  

      let ingredientsListe : Ingredients[] = [];
      let ingredients = document.getElementById("ingredients");

      if (ingredients !== null && ingredients !== undefined) {
        let tailleIngredients = ingredients?.getElementsByClassName("inputIngredients").length ;
        
        for (let i = 0; i < tailleIngredients; i++) {
          
          let ingredient = ingredients?.getElementsByClassName("inputIngredients")[i];

          let ingredientNom = (<HTMLInputElement> ingredient.children[0].firstChild).value;
          let ingredientUnite = (<HTMLInputElement> ingredient.children[1].firstChild).value;
          let ingredientQuantite = (<HTMLInputElement> ingredient.children[2].firstChild).value;
          let ingredientPrix = (<HTMLInputElement> ingredient.children[3].firstChild).value;

      
          ingredientsListe.push({nom: ingredientNom, unite: ingredientUnite, quantite: ingredientQuantite, prix : ingredientPrix}) ;
        }

      }
      
      
  

      let enregistrementRecette : {
        nom : String, 
        tempsDePreparation : String,
        difficulte : String, 
        tempsDeCuisson : String, 
        nombrePersonne : String, 
        auteurId : String, 
        recetteAuteur : String, 
        recetteDate : String, 
        ingredients : Ingredients[], 
        } 
        
        =
        
        {

          nom: nom,
          tempsDePreparation: tempsDePreparation,
          difficulte: difficulte,
          tempsDeCuisson: tempsDeCuisson,
          nombrePersonne: nombrePersonne,
          auteurId: auteurId,
          recetteAuteur: recetteAuteur,
          recetteDate: recetteDate,
          ingredients: ingredientsListe,
        };

     
      for(let i in ingredientsListe){
        if(ingredientsListe[i].nom != '' && ingredientsListe[i].unite != '' && ingredientsListe[i].quantite != '' && ingredientsListe[i].prix != ''){
      this.serviceRecette.ajoutRecette(enregistrementRecette);
      this.router.navigate(['/recettes']);
      
    }
  }
}
    }



  public enleverIngredient() {
    
    let listeIngredients = document.getElementById("ingredients");
    
    if(listeIngredients !== null && listeIngredients !== undefined && listeIngredients.lastChild !== null)
      
      listeIngredients.removeChild(listeIngredients.lastChild) ;
  }



  public ajouterIngredient() {
    let champsIngredients = document.getElementById("ingredients");
    
    if(champsIngredients !== null && champsIngredients !== undefined){
      
      let divisionIngredients = document.createElement("div");
      divisionIngredients.className = "row inputIngredients";


      // Nom pour ingrédient
      let ingredientNom = document.createElement("div");
      ingredientNom.className = "col m6 l2" ;

      // Construction d'un champ de saisie pour le nom d'ingrédient
      let saisieNomIngredient = document.createElement("input") ;
      saisieNomIngredient.type = "text";
      saisieNomIngredient.placeholder = "Nom d'ingrédient";
      saisieNomIngredient.required = true;


      ingredientNom.appendChild(saisieNomIngredient);
      divisionIngredients.appendChild(ingredientNom);



      // Unité pour ingrédient
      let ingredientUnite = document.createElement("div");
      ingredientUnite.className = "col m6 l2" ;

      // Construction d'un champ de saisie pour l'unité (kg,gr,etc...) d'un ingrédient 
      let saisieUniteIngredient = document.createElement("input") ;
      saisieUniteIngredient.type = "text";
      saisieUniteIngredient.placeholder = "Unité";
      saisieUniteIngredient.required = true;


      ingredientUnite.appendChild(saisieUniteIngredient);
      divisionIngredients.appendChild(ingredientUnite);

      // Quantité pour ingrédient
      let ingredientQuantite = document.createElement("div");
      ingredientQuantite.className = "col m6 l2" ;


      // Construction d'un champ de saisie pour la quantité donnée d'un ingrédient
      let saisieQuantiteIngredient = document.createElement("input") ;
      saisieQuantiteIngredient.type = "number";
      saisieQuantiteIngredient.min = "0";
      saisieQuantiteIngredient.placeholder = "Quantité";
      saisieQuantiteIngredient.required = true;


      ingredientQuantite.appendChild(saisieQuantiteIngredient);
      divisionIngredients.appendChild(ingredientQuantite);

      // Prix pour un ingrédient
      let ingredientPrix = document.createElement("div");
      ingredientPrix.className = "col m6 l2";

      // Construction d'un champ de saisie pour le prix donné d'un ingrédient
      let saisiePrixIngredient = document.createElement("input") ;
      saisiePrixIngredient.type = "number";
      saisiePrixIngredient.min = "0";
      saisiePrixIngredient.placeholder = "Prix";
      saisiePrixIngredient.required = true;
   
   
      ingredientPrix.appendChild(saisiePrixIngredient);
      divisionIngredients.appendChild(ingredientPrix);

      
      champsIngredients.appendChild(divisionIngredients) ;

      var element = document.getElementById('conteneurCarte');

      if(element !== null){
        element.scrollIntoView({block: "end"});

      }
      
    }
  }
}
