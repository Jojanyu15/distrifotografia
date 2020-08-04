import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class CameraService {

  


    constructor(
        public alertCtrl: AlertController,
        public modalController: ModalController
    ) { }

 
    //croppedImage: any = '';
    // @ViewChild("video",{static:false})public video: ElementRef;

    /* ngAfterViewInit() {
         if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
             navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                 this.video.nativeElement.src = window.URL.createObjectURL(stream);
                 this.video.nativeElement.play();
             });
         }
     }
     public capture() {
         let context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
         this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
     }*/
    /* public doSelectOptionCamera(aspectRatio: number, resizeToWidth: number): Promise<HTMLIonModalElement> {
         return new Promise<HTMLIonModalElement>((resolve, reject) => {
             let alert = this.alertCtrl.create(
                 {
                     header: 'Foto desde...',
                     inputs: [{
                         type: 'radio',
                         label: 'Cámara',
                         value: 'camera',
                         checked: true
                         
                     },
                     {
                         type: 'radio',
                         label: 'Galería',
                         value: 'galery'
                     }],
                     buttons: [
                         {
                             text: 'Cancelar',
                             role: 'cancel',
                             cssClass: 'secondary',
                             handler: () => {
                                 console.log('Confirm Cancel');
                                 reject();
                             }
                         },
                         {
                             text: 'Ok',
                             handler: (option: string) => {
                             
                                 this.presentModal(option, aspectRatio, resizeToWidth).then(modal => {
                                     resolve(modal);
                                 }).catch(err => {
                                     reject(err);
                                 });
                             }
                         }
                     ]
                 }
             );
 
             alert.then(alertElement => {
                 alertElement.present();
             }).catch(err => {
 
             });
         });
     }
 
 
     public presentModal(option: string, aspectRatio: number, resizeToWidth: number): Promise<HTMLIonModalElement> {
         return new Promise<HTMLIonModalElement>((resolve, reject) => {
 
             
     }*/
}