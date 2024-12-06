import { IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [TranslateModule, IonButton,CommonModule]
})
export class WelcomeComponent implements OnInit {

  @Output() welcomeClick = new EventEmitter<string>();

  user: User = new User();

  constructor(private auth: AuthService) { 
    this.auth.authUser.subscribe((user) => {
      // console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }

  sendClickEvent(buttonName: string) {
    this.welcomeClick.emit(buttonName);
  }
  

  ngOnInit() {}

}
