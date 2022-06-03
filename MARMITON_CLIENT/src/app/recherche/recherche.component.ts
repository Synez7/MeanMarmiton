import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Recette, RecetteService } from '../services/recette.service';


@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})

export class RechercheComponent implements OnInit{
  public recettes : Recette[] = []; 



  constructor(private rec : RecetteService) { }

  ngOnInit(): void {

  this.rec.getRecettes().subscribe(reponse => {
  this.recettes = reponse;  
  console.log(this.recettes);   
  });

    
  }

  // Méthode de filitrage d'une recette suivant son nom, on explore les cartes de recettes à partir du DOM HTML
  // En saisissant quelques lettres, on essaye de trouver une correspondance avec un nom de recette des defferentes cartes de recettes disponibles
  // à l'affichage
  filtrageNomRecette(){
    
    const input = (<HTMLInputElement>document.getElementById('saisie')).value.toLowerCase();
    const cardContainer = document.getElementById('listCards');
    
    const cards = cardContainer?.getElementsByClassName('card');
    
    if(cards !== undefined){

    for(let i = 0 ; i < cards?.length ; i++){
      // Récupération des nom de chacune des cartes de recettes qui satisfassent la query
      let nom = <HTMLElement> cards[i].querySelector(".card-body h1.card-title");
        if(nom.innerText.toLowerCase().indexOf(input) > -1){
          // Si correspondance avec la saisie de nom faite par l'internaute ---> carte de recette visible à l'écran
          (<HTMLElement> cards[i]).style.visibility = "";
        }
        else{
          // Si aucune correspondance avec la saisie de nom faite par l'internaute ---> carte de recette cachée 
          (<HTMLElement> cards[i]).style.visibility = "hidden";
          console.log(cards[i]);
        }

      }
  
    }

  }


  // Méthode permettant de récupérer la liste des noms d'ingrédients pour un numéro de recette donnée
  // on a 10 recettes ici : chaque card est numérotée de 0 à 9
  // le k en paramètre représente le numéro de la carte de recette
  listeNomIngrRecette(k : number){
    
    const lengthIng = document.getElementsByClassName('card')[k].getElementsByTagName('li').length;
    const card : Element | null = document.getElementsByClassName('card')[k];
    let listeNomIngr = [];

    for(let i = 0 ; i < lengthIng ; i++){
      if(card?.getElementsByTagName('li')[i] != null){
        // Récupération du nom d'ingrédient en splitant par rapport à différents séparateurs pour ainsi avoir que le nom.
        listeNomIngr.push(card?.getElementsByTagName('li')[i].textContent?.split('(')[0].split('-')[1].trim());
        }
      }
    return listeNomIngr;
    }
    



  // Méthode permettant le filtrage de recette selon un nom d'ingrédient ou plusieurs
  filtrageNomIngredient(){

    const input = (<HTMLInputElement>document.getElementById('saisie2')).value;

    const cardContainer = document.getElementById('listCards');

    const cards = cardContainer?.getElementsByClassName('card');
    
    const tabNomIng = Array.from(document.querySelectorAll('#mesIngredients>li'));

    let liste = new Array();
    let nbRecettes = -1;

    // Construction de la liste récupérant tous les noms d'ingrédients possible en parcourant toutes nos recettes
    for(let k = 0 ; k < tabNomIng.length ; k++){
      let nom = <HTMLElement> <unknown>tabNomIng[k].textContent?.split('-')[1].split('(')[0].trim();
      liste.push(nom);
      }

      if(cards !== undefined){
        
        for(let i = 0 ; i < cards?.length ; i++){

          nbRecettes++;

          for(let k = 0 ; k < this.listeNomIngrRecette(i).length ; k++){

            for(let n = 0 ; n < input.split(' ').length ; n++){
              // Test de correspondance entre un nom d'ingrédient saisie par l'internaute et un nom d'ingrédient contenu dans la liste construite initialement
             if(this.listeNomIngrRecette(i).find(e => e == input?.split(' ')[n] ||input?.split(' ')[n] == '')){
               // Carte de recette affichée à l'écran si correspondance
               (<HTMLElement> cards[nbRecettes]).style.visibility = "";
             }
               else{
                    // Carte de recette cachée à l'écran dans le cas contraire
                     (<HTMLElement> cards[i]).style.visibility = "hidden";
                   }
          }
        }
      }
    }
    }
  
  // Méthode permettant le filtrage de recette selon un nom d'utilisateur
  filtrageNomAuteur(){
    
    const input = (<HTMLInputElement>document.getElementById('saisie3')).value.toUpperCase();
    const cardContainer = document.getElementById('listCards');
    const cards = cardContainer?.getElementsByClassName('card');
        
    if(cards !== undefined){
      for(let i = 0 ; i < cards?.length ; i++){
        // pour chaque carte de recette, on récupère depuis le template l'élément qui correspond au nom de l'internanute
        // ayant publiée la recette donnée
        let nom = <HTMLElement> cards[i].querySelector(".card-body p.center");      
        if(nom.innerText.toUpperCase().indexOf(input) > -1){
          (<HTMLElement> cards[i]).style.visibility = "";
        }
        else{
          (<HTMLElement> cards[i]).style.visibility = "hidden";
          }
        }
            
      }
    
    }
      
  // Méthode permettant le filtrage de recette selon la difficulté
  filtrageDifficulte(){
    const checkboxF = <HTMLInputElement>document.getElementById('facile');
    const checkboxM = <HTMLInputElement>document.getElementById('moyen');
    const checkboxD = <HTMLInputElement>document.getElementById('difficile');
    

    const cards = document.getElementsByClassName('card');
    console.log("VISIBILITE :" + ((<HTMLElement>document.getElementsByClassName('card')[1]).style.visibility));

    if(cards !== undefined){

    for(let i = 0 ; i < cards?.length ; i++){
      
      // Récupération de la difficulté de la recette depuis le template
      let difficulte =  cards[i].getElementsByClassName('card-text')[1].textContent?.substring(14);

      // Si case facile cochée 
      if(checkboxF != null && checkboxF.checked == true && difficulte == 'facile'){
          if((<HTMLElement> cards[i]).style.visibility == ""){
          (<HTMLElement> cards[i]).style.visibility = "";
          }
        }
        else{
          (<HTMLElement> cards[i]).style.visibility = "hidden";
        }
        // // Si case moyen cochée
        if(checkboxF != null && checkboxM.checked == true && difficulte == 'moyen'){
          (<HTMLElement> cards[i]).style.visibility = "";
        }
        // Si case difficile cochée
        if(checkboxF != null && checkboxD.checked == true && difficulte == 'difficile'){
          (<HTMLElement> cards[i]).style.visibility = "";
        }

        if(checkboxM != null && checkboxF.checked == true && difficulte == 'facile'){
          (<HTMLElement> cards[i]).style.visibility = "";
        }
        if(checkboxD != null && checkboxF.checked == true && difficulte == 'facile'){
          (<HTMLElement> cards[i]).style.visibility = "";
        }
      }
  }
    


  }

  // Méthode permettant le filtrage de recette selon la cherté
  filtragePrix(){

    const input = (<HTMLInputElement>document.getElementById('saisie4')).value;

    const cardContainer = document.getElementById('listCards');

    const cards = cardContainer?.getElementsByClassName('card');
    
    const rec = this.recettes;


    if(cards !== undefined){


    for(let i = 0 ; i < cards?.length ; i++){
      // Récupération des nom de chacune des cartes de recettes qui satisfassent la query
      let difficulte =  cards[i].getElementsByClassName('card-text')[1].textContent?.substring(14);
      console.log("diff:" + difficulte);
      let prix = <HTMLElement> cards[i].querySelector('#prix');
      let prixNombre = prix.textContent!.split(':')[1].split('€')[0].trim();
    
        if((Number(prixNombre) <= Number(input) && (<HTMLInputElement>document.getElementById('facile')).checked==true && difficulte == 'facile') ||
        (Number(prixNombre) <= Number(input) && (<HTMLInputElement>document.getElementById('moyen')).checked==true && difficulte == 'moyen') ||
        (Number(prixNombre) <= Number(input) && (<HTMLInputElement>document.getElementById('difficile')).checked==true && difficulte == 'difficile') ||
        (Number(prixNombre) <= Number(input) && (<HTMLInputElement>document.getElementById('facile')).checked==false  && 
        (<HTMLInputElement>document.getElementById('moyen')).checked==false && (<HTMLInputElement>document.getElementById('difficile')).checked==false)){
          // Si correspondance avec la saisie de prix faite par l'internaute ---> carte de recette visible à l'écran
          (<HTMLElement> cards[i]).style.visibility = "";
        }
        else{
          // Si aucune correspondance avec la saisie de prix faite par l'internaute ---> carte de recette cachée 
          (<HTMLElement> cards[i]).style.visibility = "hidden";
          console.log(cards[i]);
        }

      }

    }
  }
  


  // Méthode permettant de calculer le prix d'une recette passée en paramètre
  prixRecette(recette : Recette){

      const input = (<HTMLInputElement>document.getElementById('saisie4')).value;
      
      const rec = this.recettes;
      
      let coutRecCalc = 0.;
  
      for(let r of rec){
        if(r == recette){
          for(let ing of r.ingredients){
            coutRecCalc += Number(ing.prix) * Number(ing.quantite);
          }
        }
      }
      // Prix total avec arrondi à 2 chiffres après la décimale
      return coutRecCalc.toFixed(2);
  
      }


  // Méthode permettant de réinitialiser chaque champ de filtre du formulaire de recherche (cases à cocher et champs de saisie)
  reinitialiser(){
    const cardContainer = document.getElementById('listCards');
    const cards = cardContainer?.getElementsByClassName('card');
    var resetForm = <HTMLFormElement>document.getElementById('formRecherche');
    resetForm.reset();
    if(cards != undefined){
    for(let r = 0 ; r < cards?.length ; r++){
      (<HTMLElement> cards[r]).style.visibility = "";
    }

  }
  }

}
  

  



