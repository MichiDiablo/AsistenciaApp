import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { , Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCardHeader, IonCard, IonCardTitle, IonLabel, IonCardContent, IonItem, IonText } from '@ionic/angular/standalone';
import { LanguageComponent } from "../../components/language/language.component";
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonText, IonItem, IonCardContent, IonLabel, IonCardTitle, IonCard, IonCardHeader, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LanguageComponent, TranslateModule
    
  ]
})
export class CorrectoPage implements OnInit {
  recoveredPassword: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.recoveredPassword = this.route.snapshot.paramMap.get('contrasena'); 
    console.log('Contraseña recuperada:', this.recoveredPassword);
  }
  irAInicio() {
    this.router.navigate(['ingresar']);
  }

 
}
