import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, NgZone, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, pawOutline, pencilOutline, qrCodeOutline, bookOutline, personOutline, mapOutline, accessibilityOutline } from 'ionicons/icons';
import { UsuariosComponent } from '../usuarios/usuarios.component';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon
  ]
})
export class FooterComponent {
  auth=inject(AuthService);
  user:any;
  ngOnInit() {
    this.auth.readAuthUser().then(user => {
      this.user=user;
    });

  }

  selectedButton = 'welcome';
  @Output() footerClick = new EventEmitter<string>();

  constructor() { 
    addIcons({homeOutline,personOutline,bookOutline,pencilOutline,accessibilityOutline,mapOutline,pawOutline,qrCodeOutline});
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }

}
