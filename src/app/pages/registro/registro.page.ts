import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service'; 
import { User } from 'src/app/model/user';
import { EducationalLevel } from 'src/app/model/educational-level';
import { showAlertError, showSysAlert } from 'src/app/tools/message-functions'; 
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroPage implements OnInit {
  registerForm!: FormGroup; 
  listaNivelesEducacionales = [
    { id: 1, name: 'Primaria' },
    { id: 2, name: 'Secundaria' },
    { id: 3, name: 'Universitaria' }
  ];

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService 
  ) { }

  ngOnInit() {
    
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      secretQuestion: ['', Validators.required],
      secretAnswer: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      educationalLevel: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      address: ['', Validators.required]
    });
  }

  async registrarUsuario() {
    // Verifica que el formulario sea válido
    if (this.registerForm.invalid) {
      await showAlertError('Formulario Inválido', 'Por favor completa todos los campos correctamente.');
      return;
    }

    const userData = this.registerForm.value;

    // Crea un nuevo usuario con los datos del formulario
    const newUser = User.getNewUsuario(
      userData.userName,
      userData.email,
      userData.password,
      userData.secretQuestion,
      userData.secretAnswer,
      userData.firstName,
      userData.lastName,
      EducationalLevel.findLevel(userData.educationalLevel)!, // Obtiene el nivel educativo
      new Date(userData.dateOfBirth), // Convierte la fecha
      userData.address,
      'default-image.jpg'
    );

    try {
      // Verifica si el usuario ya existe por correo
      const existingUser = await this.databaseService.findUserByEmail(userData.email);
      if (existingUser) {
        await showAlertError('Registro Fallido', 'Ya existe un usuario con este correo.');
        return;
      }

      // Guarda el nuevo usuario en la base de datos
      await this.databaseService.saveUser(newUser);
      await showSysAlert('Registro Exitoso', 'El usuario ha sido registrado correctamente.');
      this.registerForm.reset(); // Limpia el formulario
    } catch (error) {
      await showAlertError('Error', 'Ocurrió un error al registrar el usuario. Por favor intenta nuevamente.');
    }
  }
}
