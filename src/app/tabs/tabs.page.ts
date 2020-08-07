import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { PhotoModel } from './../models/photo.model';
import { PhotoService } from './../services/photo.service';
import { CameraService } from './../services/camera.service';
import { CameraOptionComponent } from './../camera-option/camera-option.component';
import { AuthServiceService } from '../services/auth-service.service';
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { ModalresourcesComponent } from '../modalresources/modalresources.component';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { analytics } from 'firebase';
import * as exif from 'exif-js';
import { LoadViewCtrl } from '../utils/load-view-ctrl';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { MetadataComponent } from '../metadata/metadata.component';
import { timeout, delay } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  imgURI: string = null;
  @ViewChild('pwaphoto', { static: false }) pwaphoto: ElementRef;
  date = new Date();
  progress: number = 10;
  isOnProgress: boolean = false;
  fileEvent: any;


  constructor(public authSvc: AuthServiceService,
    public modalCtrl: ModalController,
    private pipe: DatePipe,
    private afs: AngularFirestore,
    private photoSvc: PhotoService,
    private modalController: ModalController,
    private loadvie: LoadViewCtrl,
    private loadc: LoadingController,
    private alertController:AlertController
  ) {
  }



  public async showRModal() {

    const modal = await this.modalController.create({
      component: ModalresourcesComponent,
      // cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  async presentModal(file: any, fileEvent: any, uri: any) {
    const modal = await this.modalController.create({
      component: CameraOptionComponent,
      componentProps: {
        'photoFile': file,
        'fileEvent': fileEvent,
        'fileURI': uri
      },
      id: 'viewModal'
    });
    return await modal.present().then(() => {
    }
    );
  }

  async presentMetadata(filePath: any) {
    const modal = await this.modalController.create({
      component: MetadataComponent,
      componentProps: {
        'filePath': filePath,
      },
      id: 'viewModal'
    });
    return await modal.present();
  }


  public abrirFoto(event) {
    if (this.pwaphoto == null) {
      return;
    }
    console.log(event);
    this.fileEvent = event;
    this.pwaphoto.nativeElement.click();
  }

  async alertaFotografía() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'La fotografía que subió contiene contenido no apto para la plafatofma, '+
      'porfavor comparta otro tipo de fotografías para una mejor comunidad.',
      buttons: [
       {
          text: 'Entendido!',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  } 

  async cambiarPWAFOTO(event) {
    if (this.pwaphoto == null) {
      return;
    }
    this.fileEvent = event;
    let photoFile: any = this.pwaphoto.nativeElement.files[0];
    this.photoSvc.uploadAndGetThumb(photoFile).then(async filePath => {
      this.loadvie.actionExecution('Identificando la fotografía');
      await new Promise(resolve => 
        setTimeout(()=>
        resolve(), 15000)
        )
        .then(()=>{
          this.loadvie.endExecution();
          this.photoSvc.getDownloadURL(filePath[0]).then((url) => {
            console.log(url);
            this.presentMetadata(filePath);
          }).catch((e => {
            this.alertaFotografía();
          }));
        });
     
 

    });
  }




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
