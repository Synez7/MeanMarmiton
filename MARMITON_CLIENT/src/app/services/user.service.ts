import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


export interface User{
  _id : String;
  nom: String;
  prenom: String;
  email : String;
  pseudo : String;
  password : String;
}

export interface reponseServeur{
  message : String;
  resultat : Number;
  user : User;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:8888/';

  constructor(private http: HttpClient, private router : Router) {  }


  public connexion(pseudo : String, password : String) {
    let userLogged : Observable<reponseServeur> = this.http.post<reponseServeur>(this.url + "users/connexion", {"pseudo":pseudo,"password":password}) ;
    userLogged.subscribe(user => {
      if (user.resultat === 1) { 
        localStorage.setItem('user', JSON.stringify(user.user));
        alert("Bienvenue sur l'espace MARMITON, " + user.user.pseudo + " !") ;
        this.router.navigate(['/ingredients']);
        return 1;
      }else {
        alert("Erreur : " + user.message) ;
        return -1;
      }
    });
  }

  public deconnexion() {
    alert("Déconnexion de l'espace MARMITON, à bientot !");
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }


  public getUserAuthenticated() : User{
      let user : User = JSON.parse(String(localStorage['user']));
      return user;
  }

  public getListUsers() {
    return this.http.get<User[]>(this.url + "users");
  }


  public inscrire(nom:String, prenom: String, email: String, pseudo : String, password : String) {
    let serverCall : Observable<reponseServeur> = this.http.post<reponseServeur>(this.url  + "users/inscription", {nom,prenom,email,pseudo,password});
    serverCall.subscribe(val => {
      if (val.resultat === 1) { 
        alert(val.message);
        this.router.navigate(['/users/connexion']);
      }else {
        alert(val.message);
      }
    });
  }

  public estConnecte() : boolean {
    if(localStorage.getItem("user") === undefined || localStorage.getItem("user") === null){
      return false;
    }else{
      return true;
    }
  }
}