import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { Person } from './person';
import { EducationalLevel } from './educational-level';
import { convertDateToString } from '../tools/date-functions';

export class User extends Person {
  userName = '';
  email = '';
  password = '';
  secretQuestion = '';
  secretAnswer = '';
  image = '';
  role = 0; // 0 = Usuario, 1 = Admin
  listaUsuarios: any[] = [];
  asistencia: any = {};
  cuenta = '';
  nombre = '';
  apellido = '';
  nivelEducacional = '';
  fechaNacimiento: any;

  constructor() {
    super();
  }

  // Método estático para crear un nuevo usuario
  static getNewUsuario(
    userName: string,
    email: string,
    password: string,
    secretQuestion: string,
    secretAnswer: string,
    firstName: string,
    lastName: string,
    educationalLevel: EducationalLevel,
    dateOfBirth: Date,
    address: string,
    image: string,
    role: number = 0 // 0 = Usuario, 1 = Admin
  ) {
    let usuario = new User();
    usuario.userName = userName;
    usuario.email = email;
    usuario.password = password;
    usuario.secretQuestion = secretQuestion;
    usuario.secretAnswer = secretAnswer;
    usuario.firstName = firstName;
    usuario.lastName = lastName;
    usuario.educationalLevel = educationalLevel;
    usuario.dateOfBirth = dateOfBirth;
    usuario.address = address;
    usuario.image = image;
    usuario.role = role;
    return usuario;
  }

  navegarEnviandoUsuario(router: Router, pagina: string) {
    if (this.userName.trim() !== '' && this.password.trim() !== '') {
      const navigationExtras: NavigationExtras = {
        state: {
          userName: this.userName,
          listaUsuarios: this.listaUsuarios,
          asistencia: this.asistencia,
        },
      };
      router.navigate([pagina], navigationExtras);
    } else {
      router.navigate(['/ingreso']);
    }
  }

  recibirUsuario(activatedRoute: ActivatedRoute, router: Router) {
    const nav = router.getCurrentNavigation();
    if (nav?.extras?.state) {
      const state = nav.extras.state;

      this.listaUsuarios = state['listaUsuarios'] || [];
      const encontrado = this.buscarUsuarioPorCuenta(state['userName']);

      if (encontrado) {
        this.cuenta = encontrado.cuenta;
        this.email = encontrado.email;
        this.password = encontrado.password;
        this.secretQuestion = encontrado.secretQuestion;
        this.secretAnswer = encontrado.secretAnswer;
        this.nombre = encontrado.nombre;
        this.apellido = encontrado.apellido;
        this.nivelEducacional = encontrado.nivelEducacional;
        this.fechaNacimiento = encontrado.fechaNacimiento;
        this.asistencia = state['asistencia'] || {};
      } else {
        router.navigate(['/ingreso']);
      }
    } else {
      router.navigate(['/ingreso']);
    }
  }

  crearListausuariosValidos() {
    this.listaUsuarios = [
      {
        cuenta: 'usuario1',
        password: '1234',
        preguntaSecreta: 'Color favorito',
        respuestaSecreta: 'Azul',
        nombre: 'Juan',
        apellido: 'Pérez',
        nivelEducacional: 'Secundaria',
        fechaNacimiento: new Date('2000-01-01'),
        role: 0 // Usuario
      },
      {
        cuenta: 'admin',
        password: 'adminpass',
        preguntaSecreta: 'Comida favorita',
        respuestaSecreta: 'Pizza',
        nombre: 'Admin',
        apellido: 'System',
        nivelEducacional: 'Universitaria',
        fechaNacimiento: new Date('1980-01-01'),
        role: 1 // Admin
      },
    ];
  }

  buscarUsuarioPorCuenta(cuenta: string) {
    return this.listaUsuarios.find((usuario) => usuario.cuenta === cuenta);
  }

  buscarUsuarioPorCorreo(email: string) {
    return this.listaUsuarios.find((usuario) => usuario.email === email);
  }

  override toString(): string {
    return `\n
        User name: ${this.userName}\n
        Email: ${this.email}\n
        Password: ${this.password}\n
        secretQuestion: ${this.secretQuestion}\n
        secretAnswer: ${this.secretAnswer}\n
        First name: ${this.firstName}\n
        Last name: ${this.lastName}\n
        Education level: ${this.educationalLevel.getEducation()}\n
        Date of birth: ${convertDateToString(this.dateOfBirth)}\n
        Address: ${this.address}\n
        Image: ${this.image !== ''}\n
        Role: ${this.role === 1 ? 'Admin' : 'User'}\n
      `;
  }

  isAdmin(): boolean {
    return this.role === 1;
  }

  isUser(): boolean {
    return this.role === 0;
  }
}
