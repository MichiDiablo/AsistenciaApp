import { DatabaseService } from './../../services/database.service';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { Router } from '@angular/router';
import { colorWandOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { showAlertError, showToast } from 'src/app/tools/message-functions';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [
      CommonModule            // CGV-Permite usar directivas comunes de Angular
    , FormsModule             // CGV-Permite usar formularios
    , IonicModule             // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule         // CGV-Permite usar pipe 'translate'
    , LanguageComponent // CGV-Lista de idiomas
  ]
})
export class CorreoPage implements ViewWillEnter {

  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;

  correo: string = '';
  isLoading: boolean = false;
  

  constructor(
      private router: Router
    , private translate: TranslateService
    , private authService: AuthService
    , private db: DatabaseService) 
  { 
    this.correo = 'atorres@duocuc.cl';
    // Los iconos deben ser agregados a uno (ver en https://ionic.io/ionicons)
    addIcons({ colorWandOutline }); 
  }

  async ionViewWillEnter() {
    this.selectLanguage.setCurrentLanguage();
  }

  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  // async findByEmail(email: string): Promise<User | undefined>  {
  //   console.log(email);
  //   this.recuperarContrasena(email);
  //   return await this.db.findUserByEmail(email);

  // }

  iniciarSesion() {
    this.router.navigate(['/ingresar']);
  }

  // async recuperarContrasena() {
  //   this.isLoading = true;
  //   try {
  //     await this.authService.recuperarContrasena(this.correo);
  //   } catch (error) {
  //     console.log(error);
      
  //     showAlertError('CorreoPage.recuperarContrasena', error);
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }
  async buscarEmail(email: string): Promise<void> {
    try {
      const user = await this.db.findUserByEmail(email); 
      console.log('Usuario encontrado:', user);
  
      if (user) {
        const navigationExtras: NavigationExtras = {
          state: { user: user } 
        };
        await this.router.navigate(['pregunta'], navigationExtras);
      } else {
        this.router.navigate(['incorrecto']);
        showToast('No existe una cuenta registrada con ese correo.');
      }
    } catch (error) {
      showAlertError('CorreoPage.buscarEmail', error);
    }
  }
  
}
