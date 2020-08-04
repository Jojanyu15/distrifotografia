import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { PhotoModel } from './../models/photo.model';
import { PhotoService } from './../services/photo.service';
import { CameraService } from './../services/camera.service';
import { CameraOptionComponent } from './../camera-option/camera-option.component';
import { AuthServiceService } from '../services/auth-service.service';
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ModalresourcesComponent } from '../modalresources/modalresources.component';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  imgURI: string = null;
  @ViewChild('pwaphoto', { static: false }) pwaphoto: ElementRef;
  date = new Date();
  // firebaseFileTask: AngularFireUploadTask;
  progress: number = 10;
  isOnProgress: boolean = false;
  constructor(public authSvc: AuthServiceService,
    public modalCtrl: ModalController,
    private pipe: DatePipe,
    private afs: AngularFirestore,
    private photoSvc: PhotoService,
    private modalController: ModalController

  ) {
  }
  public async showRModal(){
    
      const modal = await this.modalController.create({
        component: ModalresourcesComponent,
        // cssClass: 'my-custom-class'
      });
      return await modal.present();
  }
  abrirFoto(event) {
    if (this.pwaphoto == null) {
      return;
    }

    this.pwaphoto.nativeElement.click();
  }

  async presentModal(filearray: any[], fileList:FileList,lenght:number) {
    const modal = await this.modalController.create({
      component: CameraOptionComponent,
      componentProps: {
        'fileArray': filearray,
        'fileList': fileList,
        'lenght':lenght
      },
      id:'viewModal'

    });
    return await modal.present();
  }

  cambiarPWAFOTO(event) {
    //arreglo con los archivos que contienen las fotografías
    let fileArray = [];
    if (this.pwaphoto == null) {
      return;
    }
    //listado de fotografias selaccionadas 
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    if (fileList && fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        this.archivoABase64(fileList.item(i)).then((resulta: string) => {
          //introduce dentro del arreglo los archivos uno por uno
          fileArray.push(resulta);
        });
      }
      //muestra la pagina enviandole el arreglo de archivos para que los visualice
      this.presentModal(fileArray,fileList,fileList.length);
    }
    //  this.photoSvc.uploadFile(fileList.item(0).name,fileList.item(0));
    const filename = Math.floor(Date.now() / 1000).toString();
  }
//convierte el archivo que se trajo a base64
  private archivoABase64(fileImage: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      let fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('No file found'));
      }
    });
  }

}
