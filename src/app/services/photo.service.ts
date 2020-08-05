import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, ViewChild, ElementRef, ComponentFactoryResolver, SecurityContext } from '@angular/core';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';
import { PhotoModel } from '../models/photo.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ProfileProvider } from '../providers/profile.provider';
import { AuthServiceService } from './auth-service.service';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { LoadViewCtrl } from '../utils/load-view-ctrl';
import { PhotoProvider } from '../providers/photo.provider';
import { AlertController, LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { NgxImageCompressService } from 'ngx-image-compress';
import { url } from 'inspector';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { takeLast, timeout } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private fotografia: PhotoModel;
  loading: any;
  private percentaje;
  private htmlValue;
  constructor(private storage: AngularFireStorage,
    private http: HttpClient,
    private pProvider: ProfileProvider,
    private authSvc: AuthServiceService,
    public afs: AngularFirestore,
    public lVC: LoadViewCtrl,
    private alertController: AlertController,
    private compresser: NgxImageCompressService,
    private loadCtrl: LoadingController,
    private sanitizer: DomSanitizer
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

  public test() {
    let imgResultBeforeCompress: string;
    let imgResultAfterCompress: string;

    this.compresser.uploadFile().then(({ image, orientation }) => {

      imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.compresser.byteCount(image));

      this.compresser.compressFile(image, orientation, 50, 50).then(
        result => {
          imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.compresser.byteCount(result));
        }
      );

    });
  }


  public uploadPhoto(
    photo: any, photocropped: any,
    customMetadata: PhotoModel
  ): Promise<void> {
    this.lVC.actionExecution("Cargando fotografía en calidad normal");
    return new Promise<void>((resolve, reject) => {

      let filename = Math.floor(Date.now() / 1000).toString();
      let fileOG = '/fotos/' + filename + '.jpg';
      let filecropped = '/fotos/' + filename + 'c' + '.jpg';
      let ref = this.storage.ref(fileOG);
      let refCropped = this.storage.ref(filecropped);
      customMetadata.urlPath = fileOG;
      customMetadata.pathCropped = filecropped;
      customMetadata.creador = this.authSvc.getCurrentUser().displayName;
      customMetadata.photoCreador = this.authSvc.getCurrentUser().photoURL;
      customMetadata.userUid = this.authSvc.getCurrentUser().uid
      const timest = firebase.firestore.Timestamp.fromDate(new Date());
      this.fotografia = JSON.parse(JSON.stringify(customMetadata)) as PhotoModel;
      let uid = this.authSvc.getCurrentUser().uid;
      this.fotografia.createdAt = timest;


      this.compresser.compressFile(photocropped, 'vertical', 20, 5)
        .then((photoCompressed => {

          fetch(photoCompressed)
            .then(res => {
              res.blob().then((blobg) => {
                //PRIMERO SUBE LA FOTOGRAFÍA DE BAJO TAMAÑO
                refCropped.put(blobg).then((croppedRef) => {
                  this.getDownloadURL(this.fotografia.pathCropped).then(path => {
                    //UNA VEZ SUBIDA LA FOTOGRAFÍA SE OBTIENE LA URL DE DESCARGA Y SE ACTUALIZA
                    //EN  EL DOCUMENTO
                    this.fotografia.pathCropped = path;
                    this.pProvider.obtenerUsuario(uid).collection('photos').add(this.fotografia).then(docNuevo => {
                      this.afs.collection('urlPaths').doc(docNuevo.id).set(this.fotografia);
                      this.fotografia.docId = docNuevo.id;
                      this.lVC.endExecution();
                    }).then(() => {
                      //DESPUES SUBE LA FOTOGRAFÍA ORIGINAL
                      const task = this.storage.upload(fileOG, photo);
                      this.cargarFotogrfiaHD(task);
                    });;
                  })
                })

              });
            });
        }));

      resolve();
    });
  }



  async cargarFotogrfiaHD(task: AngularFireUploadTask) {
    const load = await this.loadCtrl.create({
      cssClass: '',
    });
    
    load.present();
    task.percentageChanges().subscribe(async number => {
      load.setAttribute('message', 'Cargando fotografía en alta calidad,'+ 
      'por favor espera...\n'
        + 'progreso: '+number.toFixed()+'%');
      if((await task).state=="success"){
        await load.dismiss();
      }
    });
    
    await load.onDidDismiss().then(()=>{
      this.aPhotoUploaded();
    });
  }
 
  private aPhotoUploaded() {
    let uid = this.authSvc.getCurrentUser().uid;
      this.getDownloadURL(this.fotografia.urlPath).then(path => {
        //UNA VEZ SUBIDA LA FOTOGRAFÍA SE OBTIENE LA URL DE DESCARGA Y SE ACTUALIZA
        //EN  EL DOCUMENTO
        this.pProvider.obtenerUsuario(uid).collection('photos').doc(this.fotografia.docId)
          .update({
            'urlPath': path
          }).then(docNuevo => {
            this.afs.collection('urlPaths').doc(this.fotografia.docId).update({
              'urlPath': path
            });
          });
      });
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
      }).catch(err => {

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
