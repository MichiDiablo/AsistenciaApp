import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule, NavController } from '@ionic/angular';
import { logOutOutline, qrCodeOutline, mapOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { createAnimation } from '@ionic/angular';
// import { UsuariosModule } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,    // Permite usar directivas comunes de Angular
    FormsModule,     // Permite usar formularios
    IonicModule,     // Permite usar componentes de Ionic como IonContent, IonItem, etc.
    TranslateModule
  ]
})
export class HeaderComponent implements OnInit {
  user:any;
  auth=inject(AuthService);

  @Output() headerClick = new EventEmitter<string>();

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private db: DatabaseService // Para interactuar con la base de datos
  ) {
    addIcons({ logOutOutline, qrCodeOutline, mapOutline });
  }

  ngOnInit() {
    this.auth.readAuthUser().then(user => {
      this.user=user;
    });

  }
  ngAfterViewInit() {
    this.animateWelcomeMessage(); // Llama a la animación después de que el DOM esté cargado
  }


  sendClickEvent(buttonName: string) {
    this.headerClick.emit(buttonName);
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada exitosamente.');
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
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
}
