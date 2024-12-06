import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule, NavController } from '@ionic/angular';
import { logOutOutline, qrCodeOutline, mapOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { UsuariosComponent } from '../usuarios/usuarios.component';
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
    TranslateModule,
    UsuariosComponent
  ]
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false; 

  @Output() headerClick = new EventEmitter<string>();

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private db: DatabaseService // Para interactuar con la base de datos
  ) {
    addIcons({ logOutOutline, qrCodeOutline, mapOutline });
  }

  ngOnInit() {
    // Verificar si el usuario actual es administrador
    this.authService.readAuthUser().then(user => {
      if (user) {
        this.db.readUser(user.userName).then(dbUser => {
          this.isAdmin = dbUser?.role === 1; 
        }).catch(error => {
          console.error('Error al obtener información del usuario desde la base de datos:', error);
        });
      }
    }).catch(error => {
      console.error('Error al verificar el usuario autenticado:', error);
    });
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
}
