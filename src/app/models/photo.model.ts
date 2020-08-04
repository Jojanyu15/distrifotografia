import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class PhotoModel {
    urlPath: string;
    fecha: any;
    descripcion: string;
    artista: string;
    iso: string;
    apreturaDiafragma: string;
    tmpDeObturacion: string;
    createdAt:firebase.firestore.Timestamp;
    nivelExp: string;
    flash: boolean;
    distanciaFocal: string;
    resolucion: string;
    balanceBlancos: string;
    categoria:string;
    creador:string;
    photoCreador:string;
    userUid:string;
    docId: string;
}
