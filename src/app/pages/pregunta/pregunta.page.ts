import { User } from './../../model/user';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonText } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, CommonModule, FormsModule]
})
export class PreguntaPage {
  user: User = new User();
  pregunta: string = '';
  respuesta: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
      this.pregunta = this.user.secretQuestion;
    }
  }

  verificarRespuesta() {
    // Lógica para verificar la respuesta ingresada por el usuario
    if (this.respuesta.trim().toLowerCase() === this.user.secretAnswer.trim().toLowerCase()) {
      console.log('Respuesta correcta');
      // Redirigir o mostrar un mensaje de éxito
      this.router.navigate(['/pages/correcto']);
    } else {
      console.log('Respuesta incorrecta');
      this.router.navigate(['/pages/incorrecto']);
      // Mostrar un mensaje de error
    }
  }
}
