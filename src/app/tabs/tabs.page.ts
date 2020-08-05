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
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { analytics } from 'firebase';
import * as exif from 'exif-js';
import { LoadViewCtrl } from '../utils/load-view-ctrl';

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
    private loadvie: LoadViewCtrl

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
  abrirFoto(event) {
    if (this.pwaphoto == null) {
      return;
    }
    console.log(event);
    this.fileEvent = event;
    this.pwaphoto.nativeElement.click();
  }

  cambiarPWAFOTO(event) {
    this.fileEvent = event;
    let photoFile: any = this.pwaphoto.nativeElement.files[0];

    if (this.pwaphoto == null) {
      return;
    }
    this.presentModal(photoFile, this.fileEvent, event);
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
