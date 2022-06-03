import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngredientsComponent} from './ingredients/ingredients.component';
import { RecettesComponent} from './recettes/recettes.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RechercheComponent } from './recherche/recherche.component';
import { AjoutrecettesComponent } from './ajoutrecettes/ajoutrecettes.component';
import { CommentairesectionComponent } from './commentairesection/commentairesection.component';
import { AccueilpageComponent } from './accueilpage/accueilpage.component';

const routes: Routes = [

  {path: '', component: AccueilpageComponent},
	
  { path: 'ingredients', component: IngredientsComponent },
  
	{ path: 'recettes', component: RecettesComponent },
  
  { path: 'users/connexion', component: ConnexionComponent },
  
  { path: 'users/inscription', component: InscriptionComponent},

  { path: 'recherche', component: RechercheComponent},

  { path: 'ajoutRecette', component: AjoutrecettesComponent},

  { path: 'recettes/:id', component: CommentairesectionComponent}


	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
