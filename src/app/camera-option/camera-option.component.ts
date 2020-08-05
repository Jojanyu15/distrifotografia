import { MetadataComponent } from './../metadata/metadata.component';
import { PhotoService } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, PopoverController, ModalController, NavController } from '@ionic/angular';
import { LoadViewCtrl } from '../utils/load-view-ctrl';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-camera-option',
  templateUrl: './camera-option.component.html',
  styleUrls: ['./camera-option.component.scss'],
})
export class CameraOptionComponent implements OnInit {
  imgURI: any ;
  photoFile:any;
  fileEvent:any
  // multipleFotos: boolean;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageFile:any;
  constructor(private navParams: NavParams,
    private photoSvc: PhotoService,
    private alertController: AlertController,
    private loadCtrl: LoadViewCtrl,
    private modalCtrl: ModalController,
    private nav: NavController) {

    this.photoFile = this.navParams.get('photoFile');
    this.fileEvent = this.navParams.get('fileEvent');
    this.imgURI=this.navParams.get('fileURI');
  }

  ngOnInit(){
    // this.fileChangeEvent(this.navParams.get('photoFile'));
      this.imageChangedEvent = this.navParams.get('fileEvent');
  }
  fileChangeEvent(event: any): void {
    console.log(event);
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  async presentMetadataModal() {
    
    const modal = await this.modalCtrl.create({
      component: MetadataComponent,
      componentProps: {
        // 'multipleFotos': this.multipleFotos,
        'photoFile': this.photoFile,
        'croppedImage': this.croppedImage
      },
      id: 'cameraModal'
    });
    modal.onDidDismiss().then((data) => {
      console.log('modal 2 dismissed', data.data);
      this.modalCtrl.dismiss();
      this.modalCtrl.dismiss({}, '', 'viewModal');

    });
    return await modal.present();
  }

  public editarMetadatos() {

    this.presentMetadataModal().then((x) => {
    })
  }
 

}
