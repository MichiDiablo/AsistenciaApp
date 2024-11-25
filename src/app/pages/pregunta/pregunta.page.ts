import { User } from './../../model/user';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonText, IonIcon, IonCardContent, IonCardHeader, IonCardTitle, IonCard } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { LanguageComponent } from "../../components/language/language.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonIcon, IonText, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, CommonModule, FormsModule, LanguageComponent, TranslateModule]
})
export class PreguntaPage {

  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;
  
  user: User = new User();
  pregunta: string = '';
  respuesta: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.user = navigation.extras.state['user'] || new User(); 
      this.pregunta = this.user.secretQuestion || 'Pregunta no disponible'; 
      console.log('Usuario cargado:', this.user);
      console.log('Pregunta de seguridad:', this.pregunta);
    } else {
      console.error('No se encontraron datos del usuario en la navegación');
    }
  }
  
  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  verificarRespuesta() {
    if (this.respuesta.trim().toLowerCase() === this.user.secretAnswer.trim().toLowerCase()) {
      console.log('Respuesta correcta');
      this.router.navigate(['correcto', this.user.password]); // Pasa la contraseña como parámetro
    } else {
      console.log('Respuesta incorrecta');
      this.router.navigate(['incorrecto']);
    }
  }

}
