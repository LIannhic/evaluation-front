import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { Page404Component } from './pages/page404/page404.component';
import { EditModelComponent } from './pages/edit-model/edit-model.component';
import { vendeurGuard } from './services/vendeur.guard';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'ajout-model',
    component: EditModelComponent,
    canActivate: [vendeurGuard],
  },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];
