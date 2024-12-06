import { Component, OnInit, EventEmitter, Output, inject } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/model/user';
import { showAlert,showAlertYesNo,showAlertError,showToast } from 'src/app/tools/message-functions';
import { MessageEnum } from 'src/app/tools/message-enum';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule, NavController } from '@ionic/angular';
import { logOutOutline, qrCodeOutline, mapOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports:[
    CommonModule,    // Permite usar directivas comunes de Angular
    FormsModule,     // Permite usar formularios
    IonicModule,     // Permite usar componentes de Ionic como IonContent, IonItem, etc.
    TranslateModule,
  ]
})
export class UsuariosComponent implements OnInit {
  users: User[] = [];
  auth=inject(AuthService);
  user:any;
  constructor(private authService: AuthService, private dbService: DatabaseService) {
    this.loadUsers();
  }

  
   ngOnInit() {}


  async loadUsers() {
    this.dbService.readUsers().then(users => {
      this.users = users;
    });
  }

  /**
   * 
   * @param userrole  
   */
  async confirmDelete(userName: string) {
    try {
      if (userName === 'admin') {
        await showAlert('El usuario administrador no puede ser eliminado.');
        return;
      }

      const response = await showAlertYesNo('¿Estás seguro de que deseas eliminar este usuario?');
      if (response === MessageEnum.YES) {
        const success = await this.dbService.deleteByUserName(userName);
        if (success) {
          showToast('Usuario eliminado con éxito', 2000);
          await this.loadUsers(); 
        } else {
          throw new Error('No se pudo eliminar el usuario.');
        }
      }
    } catch (error) {
      await showAlertError('UsuariosComponent.confirmDelete', error);
    }
  }

  /**
   * Cerrar sesión con confirmación.
   */
  async confirmLogout() {
    try {
      const response = await showAlertYesNo('¿Estás seguro de que deseas cerrar sesión?');
      if (response === MessageEnum.YES) {
        await showAlert('Has cerrado sesión correctamente.', false, true);
        this.authService.logout();
        console.log('Cerrar sesión'); // Aquí puedes redirigir a la página de inicio de sesión
      }
    } catch (error) {
      await showAlertError('UsuariosComponent.confirmLogout', error);
    }
  }
}
