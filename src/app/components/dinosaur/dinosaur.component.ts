import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { createAnimation } from '@ionic/angular';

@Component({
  selector: 'app-dinosaur',
  templateUrl: './dinosaur.component.html',
  styleUrls: ['./dinosaur.component.scss'],
  standalone: true,
  imports: [IonContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule, TranslateModule]
})
export class DinosaurComponent implements OnDestroy {

  qr: any;
  private subscription: Subscription;

  constructor(private authService: AuthService) { 
    this.subscription = this.authService.qrCodeData.subscribe((qr) => {
      this.qr = qr ? JSON.parse(qr) : null;
    });
  }
  ngAfterViewInit(): void {
    this.animateScanPrompt();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  animateScanPrompt() {
    const element = document.querySelector('h1'); // Selecciona el <h1>
    if (element) {
      const animation = createAnimation()
        .addElement(element) // Aplica la animación al <h1>
        .duration(1000) // Duración de 1 segundo
        .iterations(1) // Número de repeticiones (1 vez)
        .fromTo('opacity', '0', '1') // Efecto fade-in
        .fromTo('transform', 'translateY(-20px)', 'translateY(0)'); // Movimiento suave hacia abajo

      animation.play();
    } else {
      console.error('El elemento <h1> no se encontró en el DOM.');
    }
  }
}