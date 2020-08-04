import { MetadataComponent } from './../metadata/metadata.component';
import { PhotoService } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, PopoverController, ModalController, NavController } from '@ionic/angular';
import { LoadViewCtrl } from '../utils/load-view-ctrl';


@Component({
  selector: 'app-camera-option',
  templateUrl: './camera-option.component.html',
  styleUrls: ['./camera-option.component.scss'],
})
export class CameraOptionComponent implements OnInit {
  imgURI: any = [];
  filelist: FileList;
  multipleFotos: boolean;
  constructor(private navParams: NavParams,
    private photoSvc: PhotoService,
    private alertController: AlertController,
    private loadCtrl: LoadViewCtrl,
    private modalCtrl: ModalController,
    private nav: NavController) {
    if (navParams.get('lenght') > 1) {
      this.multipleFotos = true;
    } else {
      this.multipleFotos = false;
    }
    this.imgURI = navParams.get('fileArray');
    this.filelist = navParams.get('fileList')
  }

  async presentMetadataModal() {
    const modal = await this.modalCtrl.create({
      component: MetadataComponent,
      componentProps: {
        'multipleFotos': this.multipleFotos,
        'fileList': this.filelist,
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
  ngOnInit() { }

}
