import { showAlert, showAlertError } from "../tools/message-functions";

export class QrData {

  static jsonqrExample = `{ 
      "sede": "Alonso Ovalle", 
      "idAsignatura": "PGY4121", 
      "seccion": "001D", 
      "nombreAsignatura": "Aplicaciones Móviles", 
      "nombreProfesor": "Cristián Gómez Vega", 
      "dia": "2022-08-09", 
      "bloqueInicio": 7, 
      "bloqueTermino": 9, 
      "horaInicio": "13:00", 
      "horaFin": "15:15" 
    }`;
  
  static jsonqrEmpty = `{ 
      "sede": "", 
      "idAsignatura": "", 
      "seccion": "", 
      "nombreAsignatura": "", 
      "nombreProfesor": "", 
      "dia": "", 
      "bloqueInicio": 0, 
      "bloqueTermino": 0, 
      "horaInicio": "", 
      "horaFin": "" 
    }`;

  sede = '';
  idAsignatura = '';
  seccion = '';
  nombreAsignatura = '';
  nombreProfesor = '';
  dia = '';
  bloqueInicio = 0;
  bloqueTermino = 0;
  horaInicio = '';
  horaFin = '';

  constructor() {}

  public static getQrData(
    sede: string,
    idAsignatura: string,
    seccion: string,
    nombreAsignatura: string,
    nombreProfesor: string,
    dia: string,
    bloqueInicio: number,
    bloqueTermino: number,
    horaInicio: string,
    horaFin: string
  ): 
  QrData {
    const qrdata = new QrData();
    qrdata.sede = sede;
    qrdata.idAsignatura = idAsignatura;
    qrdata.seccion = seccion;
    qrdata.nombreAsignatura = nombreAsignatura;
    qrdata.nombreProfesor = nombreProfesor;
    qrdata.dia = dia;
    qrdata.bloqueInicio = bloqueInicio;
    qrdata.bloqueTermino = bloqueTermino;
    qrdata.horaInicio = horaInicio;
    qrdata.horaFin = horaFin;
    return qrdata;
  }

  /**
   * Verifica si el código QR es válido según el formato de dinosaurio esperado.
   * Retorna verdadero si el JSON contiene todos los datos de un dinosaurio, de lo contrario, muestra un mensaje de error.
   */
  static isValidDinosaurQrCode(qr: string): boolean {
    if (qr === '') return false;

    try {
      const json = JSON.parse(qr);

      // Validación de los datos esperados para un dinosaurio.
      if (
        json.sede !== undefined &&
        json.idAsignatura !== undefined &&
        json.seccion !== undefined &&
        json.nombreAsignatura !== undefined &&
        json.nombreProfesor !== undefined &&
        json.dia !== undefined &&
        json.bloqueInicio !== undefined &&
        json.bloqueTermino !== undefined &&
        json.horaInicio !== undefined &&
        json.horaFin !== undefined
      ) {
        return true;
      }
    } catch (error) {
          console.error("Error al parsear el JSON:", error);
    }

    showAlert('El código QR escaneado no corresponde ');
    return false;
  }
}
