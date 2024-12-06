import { capSQLiteChanges, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';
import { EducationalLevel } from '../model/educational-level';
import { showAlertError } from '../tools/message-functions';
import { convertDateToString, convertStringToDate } from '../tools/date-functions';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  testUser1 = User.getNewUsuario(
    'atorres', 
    'atorres@duocuc.cl', 
    '1234', 
    '¿Cuál es tu animal favorito?', 
    'gato',
    'Ana', 
    'Torres', 
    EducationalLevel.findLevel(6)!,
    new Date(2000, 0, 5),
    'La Florida',
    'default-image.jpg',
    0 // Usuario normal
  );

  testUser2 = User.getNewUsuario(
    'jperez', 
    'jperez@duocuc.cl', 
    '5678', 
    '¿Cuál es tu postre favorito?',
    'panqueques',
    'Juan', 
    'Pérez',
    EducationalLevel.findLevel(5)!,
    new Date(2000, 1, 10),
    'La Pintana',
    'default-image.jpg',
    0 // Usuario normal
  );

  testUser3 = User.getNewUsuario(
    'admin', 
    'admin@duocuc.cl', 
    'admin123', 
    '¿Cuál es tu color favorito?',
    'azul',
    'Administrador', 
    'Sistema', 
    EducationalLevel.findLevel(6)!,
    new Date(1980, 0, 1),
    'Providencia',
    'default-image.jpg',
    1 // Administrador
  );

  userUpgrades = [
    {
      toVersion: 1,
      statements: [`
      CREATE TABLE IF NOT EXISTS USER (
        userName         TEXT PRIMARY KEY NOT NULL,
        email            TEXT NOT NULL,
        password         TEXT NOT NULL,
        secretQuestion   TEXT NOT NULL,
        secretAnswer     TEXT NOT NULL,
        firstName        TEXT NOT NULL,
        lastName         TEXT NOT NULL,
        educationalLevel INTEGER NOT NULL,
        dateOfBirth      TEXT NOT NULL,
        address          TEXT NOT NULL,
        image            TEXT NOT NULL,
        role             INTEGER NOT NULL
      );
      `]
    }
  ];

  sqlInsertUpdate = `
    INSERT OR REPLACE INTO USER (
      userName, 
      email, 
      password, 
      secretQuestion, 
      secretAnswer,
      firstName, 
      lastName,
      educationalLevel, 
      dateOfBirth,
      address,
      image,
      role
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  dataBaseName = 'AsistenciaDataBase';
  db!: SQLiteDBConnection;
  userList: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private sqliteService: SQLiteService) { }

  async initializeDataBase() {
    try {
      await this.sqliteService.createDataBase({ database: this.dataBaseName, upgrade: this.userUpgrades });
      this.db = await this.sqliteService.open(this.dataBaseName, false, 'no-encryption', 1, false);
      await this.createTestUsers();
      await this.readUsers();
    } catch (error) {
      showAlertError('DatabaseService.initializeDataBase', error);
    }
  }

  async createTestUsers() {
    try {
      const user1 = await this.readUser(this.testUser1.userName);
      if (!user1) {
        await this.saveUser(this.testUser1);
      }
  
      const user2 = await this.readUser(this.testUser2.userName);
      if (!user2) {
        await this.saveUser(this.testUser2);
      }
  
      const user3 = await this.readUser(this.testUser3.userName);
      if (!user3) {
        await this.saveUser(this.testUser3);
      }
    } catch (error) {
      showAlertError('DatabaseService.createTestUsers', error);
    }
  }

  async saveUser(user: User): Promise<void> {
    try {
      await this.db.run(this.sqlInsertUpdate, [
        user.userName, 
        user.email, 
        user.password,
        user.secretQuestion, 
        user.secretAnswer, 
        user.firstName, 
        user.lastName,
        user.educationalLevel.id, 
        convertDateToString(user.dateOfBirth), 
        user.address,
        user.image,
        user.role
      ]);
      await this.readUsers();
    } catch (error) {
      showAlertError('DatabaseService.saveUser', error);
    }
  }

  async readUsers(): Promise<User[]> {
    try {
      const query = 'SELECT * FROM USER;';
      const rows = (await this.db.query(query)).values;
      let users: User[] = [];
      if (rows?.length) {
        users = rows.map((row: any) => this.rowToUser(row));
      }
      this.userList.next(users);
      return users;
    } catch (error) {
      showAlertError('DatabaseService.readUsers', error);
      return [];
    }
  }

  async readUser(userName: string): Promise<User | undefined> {
    try {
      const query = 'SELECT * FROM USER WHERE userName = ?;';
      const rows = (await this.db.query(query, [userName])).values;
      return rows?.length ? this.rowToUser(rows[0]) : undefined;
    } catch (error) {
      showAlertError('DatabaseService.readUser', error);
      return undefined;
    }
  }

  async deleteByUserName(userName: string): Promise<boolean> {
    try {
      const query = 'DELETE FROM USER WHERE userName = ?;';
      const result: capSQLiteChanges = await this.db.run(query, [userName]);
      const rowsAffected = result.changes?.changes ?? 0;
      await this.readUsers();
      return rowsAffected > 0;
    } catch (error) {
      showAlertError('DatabaseService.deleteByUserName', error);
      return false;
    }
  }

  async findUser(userName: string, password: string): Promise<User | undefined> {
    try {
      const query = 'SELECT * FROM USER WHERE userName = ? AND password = ?;';
      const rows = (await this.db.query(query, [userName, password])).values;
      return rows?.length ? this.rowToUser(rows[0]) : undefined;
    } catch (error) {
      showAlertError('DatabaseService.findUser', error);
      return undefined;
    }
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    try {
      const query = 'SELECT * FROM USER WHERE email = ?;';
      const rows = (await this.db.query(query, [email])).values;
      return rows?.length ? this.rowToUser(rows[0]) : undefined;
    } catch (error) {
      showAlertError('DatabaseService.findUserByEmail', error);
      return undefined;
    }
  }

  async isAdmin(userName: string): Promise<boolean> {
    try {
      const query = 'SELECT role FROM USER WHERE userName = ?;';
      const rows = (await this.db.query(query, [userName])).values;
      return rows?.length ? rows[0].role === 1 : false;
    } catch (error) {
      showAlertError('DatabaseService.isAdmin', error);
      return false;
    }
  }

  private rowToUser(row: any): User {
    try {
      const user = new User();
      user.userName = row.userName;
      user.email = row.email;
      user.password = row.password;
      user.secretQuestion = row.secretQuestion;
      user.secretAnswer = row.secretAnswer;
      user.firstName = row.firstName;
      user.lastName = row.lastName;
      user.educationalLevel = EducationalLevel.findLevel(row.educationalLevel) || new EducationalLevel();
      user.dateOfBirth = convertStringToDate(row.dateOfBirth);
      user.address = row.address;
      user.image = row.image;
      user.role = row.role;
      return user;
    } catch (error) {
      showAlertError('DatabaseService.rowToUser', error);
      return new User();
    }
  }
}
