import { Component, OnInit } from '@angular/core';
import { RecetteService } from '../services/recette.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
    public ingredients: any;


    ingredient = [
      {
        nom: "poulet",
        prix: 8,
        unite: "kilogramme",
        img: '../../assets/poulet-fermier-800x445.jpeg'
      },
      {
         nom: "cumin",
         prix: 15,
         unite: "kilogramme",
         img: '../../assets/cumin-graines.jpg'

      },
      {
         nom: "oignon",
         prix: 1,
         unite: "kilogramme",
         img: '../../assets/oignon.jpg'       

      },
      {
         nom: "tomate",
         prix: 2.50,
         unite: "kilogramme",
         img: '../../assets/37262-tomate-aliment-miracle-prevenir-cancer.png'
      },
      {
         nom: "boeuf",
         prix: 22,
         unite: "kilogramme",
         img: '../../assets/techniques-boeuf-pxhere.webp'

       },
       {
         nom: "carotte",
         prix: 1.50,
         unite: "kilogramme",
         img: '../../assets/product-packshot-Carrot.jpg'

       },
       {
         nom: "courgette",
         prix: 1.50,
         unite: "kilogramme",
         img: '../../assets/courgette.650x0.jpg'

       },
       {
         nom: "pois chiche",
         prix: 1.50,
         unite: "kilogramme",
         img: '../../assets/pois-chiche-585.jpg'
       },
       {
         nom: "sel",
         prix: 1.50,
         unite: "kilogramme",
         img: '../../assets/vignette-focus.jpg'


       },
       {
         nom: "poivre",
         prix: 1.50,
         unite: "kilogramme",
         img: '../../assets/61kwQb1f0NL._AC_SX679_.jpg'
       },
       {
         nom: "concentre de tomates",
         prix: 1.50,
         unite: "kilogramme",
         img: '../../assets/sauce-tomate-italienne.jpg'

       },
       {
         nom: "beurre",
         prix: 1.50,
         unite: "kilogramme",
         img: '../../assets/i130213-un-beurre-qui-transforme-tout-en-fete-le-beurre-safrane.jpeg'

       },
       {
         nom: "huile d'olive",
         prix: 1.50,
         unite: "kilogramme",
         img: '../../assets/image.jpg'

       },

  
    ];

    
    constructor(private recetteService: RecetteService) {}
    
    ngOnInit() {
       this.recetteService.getIngredients().subscribe(ingredients => {
            this.ingredients = ingredients;
       });
    }
}

