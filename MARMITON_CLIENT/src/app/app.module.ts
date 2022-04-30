import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecettesComponent } from './recettes/recettes.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RechercheComponent } from './recherche/recherche.component';



import { AjoutrecettesComponent } from './ajoutrecettes/ajoutrecettes.component';
import { CommentairesectionComponent } from './commentairesection/commentairesection.component';
import { AccueilpageComponent } from './accueilpage/accueilpage.component';





@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    MenuComponent,
    ConnexionComponent,
    InscriptionComponent,
    RecettesComponent,
    RechercheComponent,
    AjoutrecettesComponent,
    CommentairesectionComponent,
    AccueilpageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
