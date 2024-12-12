import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItem } from '@ionic/angular/standalone';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/model/post';
import { APIClientService } from 'src/app/services/apiclient.service';
import { EducationalLevel } from 'src/app/model/educational-level';
import { showToast } from 'src/app/tools/message-functions';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { createAnimation } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations'; 

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar
    , CommonModule, FormsModule, IonItem, IonSelect, IonSelectOption, DatePickerComponent, TranslateModule]
})
export class MisDatosComponent implements OnInit {

  usuario: User = new User();
  usuarios: User[] = [];
  publicaciones: Post[] = [];
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();

  constructor(
    private bd: DatabaseService,
    private auth: AuthService,
    private api: APIClientService) 
  { 
    
    this.bd.userList.subscribe((usuarios) => {
      if (usuarios) {
        this.usuarios = usuarios;
      }
    });
    this.auth.readAuthUser().then((usuario) => {
      if (usuario) {
        this.usuario = usuario;
        console.log(this.usuario);
      }
    });
    
  }

  ngOnInit() {
    this.animateWelcomeMessage();

  }
  animateWelcomeMessage() {
    const element = document.querySelector('h3'); // Selecciona el elemento <h3>
  
    if (element) {
      const animation = createAnimation()
        .addElement(element) // Solo pasa el elemento si no es null
        .duration(3000)
        .iterations(1)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(-20px)', 'translateY(0)');
      animation.play(); // Reproduce la animación
    } else {
      console.error('El elemento <h3> no se encontró en el DOM.');
    }
  }
  guardarUsuario() {
    if (this.usuario.firstName.trim() === '') {
      showToast('El usuario debe tener un nombre');
    } else {
      console.log(this.usuario);
      // alert('en pagina nombre: '+this.usuario.firstName);
      // alert('en pagina nivelEducacional: '+this.usuario.educationalLevel.id);
      // alert('en pagina fecha: '+this.usuario.dateOfBirth);
      this.bd.saveUser(this.usuario);
      this.auth.saveAuthUser(this.usuario);
      showToast('El usuario fue guardado correctamente');
    }
  }

  public actualizarNivelEducacional(event: any) {
    // debugger
    this.usuario.educationalLevel 
      = EducationalLevel.findLevel(event.detail.value)!;
  }

  onFechaNacimientoChange(event: any) {
    this.usuario.dateOfBirth = new Date(event.detail.value); // Convertir de ISO a Date
  }

}

