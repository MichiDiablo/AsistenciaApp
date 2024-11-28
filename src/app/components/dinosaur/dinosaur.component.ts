import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateModule } from '@ngx-translate/core'; 

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
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}