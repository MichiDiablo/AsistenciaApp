import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon, // Asegúrate de importar IonIcon
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon, // Asegúrate de agregar IonIcon aquí
  ],
})
export class UsuariosComponent {
  // Lista de usuarios simulada
  users = [
    { id: 1, name: 'Administrador del Sistema', email: 'admin@duocuc.cl' },
    { id: 2, name: 'Ana Torres', email: 'atorres@duocuc.cl' },
    { id: 3, name: 'Carla Fuentes', email: 'cfuentes@duocuc.cl' },
    { id: 4, name: 'Alberto Valenzuela', email: 'avalenzuela@duocuc.cl' },
  ];

  constructor() {}

  // Método para eliminar un usuario por su ID
  deleteUser(userId: number) {
    this.users = this.users.filter((user) => user.id !== userId);
    console.log(`Usuario con ID ${userId} eliminado.`);
  }

  // Método para cerrar sesión
  logout() {
    console.log('Cerrar sesión');
    // Aquí puedes agregar lógica adicional, como redirigir al usuario a la página de login
  }
}
