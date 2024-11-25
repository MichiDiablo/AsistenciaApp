import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonItem, IonText } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonText, IonItem, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule]
})
export class IncorrectoPage {

  // Inyecta Router en el constructor
  constructor(private router: Router) { }



  volverIntentar() {
    // Usa this.router en lugar de this.Router
    this.router.navigate(['correo']);
  }
}
