import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-produit',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss',
})
export class EditProduitComponent {
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  notification = inject(NotificationService);
  router = inject(Router);

formulaire = this.formBuilder.group({
  pseudo: ['', [Validators.required, Validators.maxLength(20)]],
  description: ['', [Validators.maxLength(50)]],
  mensurations: [null, [Validators.required]],
  taille_cm: [null, [Validators.min(50), Validators.max(300)]],
  poids_kg: [null, [Validators.min(20), Validators.max(300)]],
  date_naissance: [null, [Validators.required]],
});


  onAjoutModel() {
    if (this.formulaire.valid) {
      this.http
        .post('http://localhost:5000/model', this.formulaire.value)
        .subscribe({
          next: (reponse) => {
            this.notification.show('Le model a bien été ajouté', 'valid');
            this.router.navigateByUrl('/accueil');
          },
          error: (erreur) => {
            if (erreur.status === 409) {
              this.notification.show('Un model porte déjà ce pseudo', 'error');
            }
          },
        });
    }
  }
}
