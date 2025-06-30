import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-accueil',
  imports: [MatCardModule, MatButtonModule, DatePipe, RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  http = inject(HttpClient);
  models: any = [];
  notification = inject(NotificationService);
  authService = inject(AuthService);

  ngOnInit() {
    this.raffraichirModel();
  }

  raffraichirModel() {
    this.http
      .get('http://localhost:5000/models/liste')
      .subscribe((models) => (this.models = models));
  }

  onClickSuppressionModel(item: any) {
    if (confirm('Voulez-vous vraiment supprimer ce model ?')) {
      this.http
        .delete('http://localhost:5000/model/' + item.id_model)
        .subscribe((reponse) => {
          this.raffraichirModel();
          this.notification.show('Le model a bien été supprimé', 'valid');
        });
    }
  }
}
