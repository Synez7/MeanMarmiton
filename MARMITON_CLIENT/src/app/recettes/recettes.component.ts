import { Component, OnInit } from '@angular/core';
import { RecetteService, Recette } from '../services/recette.service';


@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {

  public recettes: Recette[] = [];


constructor(private rec : RecetteService){}
  
    ngOnInit(): void {
      this.rec.getRecettes().subscribe(recettes => {
        this.recettes = recettes;  
      });         
    }

}