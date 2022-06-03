import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recette, RecetteService, Commentaire } from '../services/recette.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-commentairesection',
  templateUrl: './commentairesection.component.html',
  styleUrls: ['./commentairesection.component.css']
})
export class CommentairesectionComponent implements OnInit {

  public recettes: Recette[] = [];
  public commentaires: Commentaire[] = [];
  public id : String = "";

  constructor(private route: ActivatedRoute, private recette: RecetteService, public userServ : UserService, private router : Router) { }

  ngOnInit(): void {

    this.recette.getRecettes().subscribe(recettes => {
    this.recettes = recettes;


    this.id = this.route.snapshot.params['id'];     
    let trouve : Boolean = false;

    for(let i = 0; i< this.recettes.length; i++) {
      if(this.recettes[i]._id === this.id) {
          this.recettes[0] = this.recettes[i] ;
          trouve = true;
        }
      }
      if (!trouve) {
        this.router.navigate(['/permissionDenied']);
      }
    });

    this.recette.getCommentaire().subscribe(commentaires => {
      for (let c of commentaires) { 
        if (c.recetteId === this.recettes[0]._id) {
          this.commentaires.push(c) ;
        }
      }
    
    });


  }


  public envoyerCommentaire(commentaire : String) : void{
    let commentaireDate = new Date().toLocaleDateString("fr");
    this.recette.ajoutCommentaire(this.recettes[0]._id, this.userServ.getUserAuthenticated()._id, this.userServ.getUserAuthenticated().pseudo, commentaireDate, commentaire);
    window.location.reload();
  }


  public deleteCommentaire(_idCommentaire : String) : void{
    this.recette.supprimerCommentaire(_idCommentaire);
    window.location.reload();
  }

}


