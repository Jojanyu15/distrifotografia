import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';
import { PhotoModel } from '../models/photo.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ProfileProvider } from '../providers/profile.provider';
import { AuthServiceService } from './auth-service.service';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { LoadViewCtrl } from '../utils/load-view-ctrl';
import { PhotoProvider } from '../providers/photo.provider';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private fotografia: PhotoModel;
  constructor(private storage: AngularFireStorage,
    private http: HttpClient,
    private pProvider: ProfileProvider,
    private authSvc: AuthServiceService,
    public afs: AngularFirestore,
    public lVC: LoadViewCtrl,
    private alertController: AlertController
  ) { }

  public uploadFile(
    file: any,
    path?: string): AngularFireUploadTask {
    //    const filename = Math.floor(Date.now() / 1000).toString();

    let ref = this.storage.ref('/fotos/' + path);
    return ref.put(file);
  }

  public uploadComment() {
  }
  public uploadPhoto(
    file: any,
    customMetadata: PhotoModel): Promise<void> {
    this.lVC.actionExecution();
    return new Promise<void>((resolve, reject) => {
      let filename = Math.floor(Date.now() / 1000).toString();
      filename = '/fotos/' + filename + '.jpg';
      let ref = this.storage.ref(filename);
      customMetadata.urlPath = filename;
      customMetadata.creador = this.authSvc.getCurrentUser().displayName;
      customMetadata.photoCreador = this.authSvc.getCurrentUser().photoURL;
      customMetadata.userUid = this.authSvc.getCurrentUser().uid
      const timest = firebase.firestore.Timestamp.fromDate(new Date());
      this.fotografia = JSON.parse(JSON.stringify(customMetadata)) as PhotoModel;
      let uid = this.authSvc.getCurrentUser().uid;
      this.fotografia.createdAt = timest;

      //subo primero el archivo
      ref.put(file).then((fileRef) => {
        fileRef.ref.getDownloadURL().then(url => {
          this.fotografia.urlPath = url;
          //Añadimos primero la fotografía a la carpeta del usuario
          this.pProvider.obtenerUsuario(uid).collection('photos').add(this.fotografia).then(docNuevo => {
            //Añadimos el documento a la lista global
            this.afs.collection('urlPaths').doc(docNuevo.id).set(this.fotografia);
          });
        });

      }).then(() => {
        this.lVC.endExecution();
      });
      //actualizo el documento con su dirección 
      resolve();
    });


    //  this.pProvider.obtenerUsuario();
  }

  private generateAlert(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.alertController
        .create({
          header: 'Alerta!',
          message: '¿Desea eliminar las foto?',
          buttons: [
            {
              text: 'No',
              handler: () => reject(false)
            },
            {
              text: 'Si',
              handler: () => resolve(true)
            }
          ]
        })
        .then(alert => {
          alert.present();
        });
    });
  }

  public deletephoto(photo: PhotoModel) {
    if (this.authSvc.getCurrentUser().uid == photo.userUid) {
      this.generateAlert().then(opcion => {
        if (opcion) {
          this.pProvider.obtenerUsuario(photo.userUid).collection('photos').doc(photo.docId)
            .delete().then(() => {
              this.afs.collection('urlPaths').doc(photo.docId).delete();
            });
        }
      }).catch(err=>{
        
      });
    }
  }
  public getDownloadURL(path: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.storage.storage.ref(path).getDownloadURL().then(url => {
        resolve(url);
      }).catch(err => {
        reject(err);
      });
    });

  }

  public readBlobFromURL(fileUrl: string): Promise<Blob> {
    return this.http.get(fileUrl, { responseType: 'blob' }).toPromise();
  }
}
