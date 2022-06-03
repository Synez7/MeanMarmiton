import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  
  private echecInscription : String = "";
  public listeUsers: User[] = [];

  constructor(public userServ : UserService) { }

  ngOnInit(): void {}

  // Méthode de saisie pour l'inscription d'un internaute
  public inscription(nom: String, prenom: String, email: String, pseudo : String, motdepasse : String) {
    if (this.checkInscription(nom,prenom,email,pseudo,motdepasse)) {
      this.userServ.inscrire(nom,prenom,email,pseudo,motdepasse) ;
    }else {
      alert("Erreur : " + this.echecInscription) ;
    }
  }

  // Méthode de vérification de la complétude des infos à remplir pour l'inscription d'un internaute
  public checkInscription(nom: String, prenom : String, email: String, pseudo : String, password : String) : boolean {
    if((nom === "" || prenom === "" || email === "" || pseudo === "" || password === "")){
      this.echecInscription= "Champs d'informations à saisir [incomplet]";
      return false;
    }


  
    // Un check sur l'utilisation d'une adresse mail
    this.userServ.getListUsers().subscribe(users => {
      this.listeUsers = users;
      for (let u of this.listeUsers) {
        if ((email == u.email) || (pseudo == u.pseudo)) {
          this.echecInscription = "Pseudo et/ou email déja utilisé !";
        }
      }
      return false;
    });

    this.echecInscription = "";
    return true;
  }

}
