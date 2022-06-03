import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reponseServeur } from './user.service';

export interface Ingredients {
    nom : String,
    unite : String, 
    quantite : String,
    prix : String
  }
  
export interface Recette{
    
    _id : String,
    nom : String, 
    tempsDePreparation : String,
    difficulte : String, 
    tempsDeCuisson : String, 
    nombrePersonne : String, 
    auteurId : String, 
    recetteAuteur : String, 
    recetteDate : String, 
    ingredients : Ingredients[]
  }


  export interface Recette2{
    
    nom : String, 
    tempsDePreparation : String,
    difficulte : String, 
    tempsDeCuisson : String, 
    nombrePersonne : String, 
    auteurId : String, 
    recetteAuteur : String, 
    recetteDate : String, 
    ingredients : Ingredients[]
  }

  export interface Commentaire{
    _id : String;
    recetteId : String;
    auteurId : String;
    auteurPseudo : String;
    commentaireDate : String;
    contenuCommentaire : String;
  }



@Injectable({
  providedIn: 'root'
})

export class RecetteService {

  private url: string = 'http://localhost:8888/';

  constructor(private http: HttpClient) {}

  getIngredients(): Observable<Ingredients[]> {
    return this.http.get<Ingredients[]>(this.url+'ingredients');
  }

  getRecettes(): Observable<Recette[]> {
    return this.http.get<Recette[]>(this.url+'recettes');

  }


  getRecettesF(filter: string): any {
    return this.http.get(this.url + 'recettes' + filter);
  }

  ajoutRecette(recette : Recette2) {
    let lancementServeur : Observable<reponseServeur> = this.http.post<reponseServeur>(this.url  + "recettes/ajout", recette);
    lancementServeur.subscribe(code => {
      // Recette bien ajoutée
      if(code.resultat === 1) { 
        alert(code.message);
      }
      else {
        alert(code.message);
      }
    });
  }


  getCommentaire(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(this.url+'commentaire');
  }


  ajoutCommentaire(recetteId: String, auteurId : String, auteurPseudo : String, commentaireDate : String, contenuCommentaire : String) {
    let lancementServeur : Observable<reponseServeur> = this.http.post<reponseServeur>(this.url  + "commentaire/ajout", {recetteId, auteurId, 
      auteurPseudo,commentaireDate, contenuCommentaire});
    
      lancementServeur.subscribe(code => {
      if (code.resultat === 1) { 
        alert(code.message);
      }else {
        alert(code.message);
      }
    });
  }

  supprimerCommentaire(_idComm : String){
    let status = "";
    let errorMessage = "";
    this.http.delete<reponseServeur>(this.url  + "commentaire/" + _idComm).subscribe({
      next: data => {
          status = 'Delete successful';
      },
      error: error => {
          errorMessage = error.message;
          console.error('There was an error!', error);
      }
    
  });
}
  
}
