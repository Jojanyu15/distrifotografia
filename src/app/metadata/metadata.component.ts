import { PhotoService } from './../services/photo.service';
import { DataService } from './../services/data.service';
import { PhotoModel } from './../models/photo.model';
import { NavParams, AlertController, ModalController, NavController } from '@ionic/angular';
import { Component, Input, } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { Router } from '@angular/router';
import { LoadViewCtrl } from '../utils/load-view-ctrl';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
})
export class MetadataComponent {
  @Input() pMetadata: PhotoModel;
  @Input() metadataEdit: boolean = true;
  formReady: boolean;
  multipleFotos: boolean;
  form: FormGroup;
  filelist: FileList;
  metadata: PhotoModel;
  public categorias: KeyValue<string, string>[] = [];

  constructor(
    private navParams: NavParams,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private dataService: DataService,
    private modalController: ModalController,
    private photoSvc: PhotoService,
    private navCtrl: NavController,
    private router: Router,
    private loading: LoadViewCtrl) {
    this.formReady = false;
    this.filelist = this.navParams.get('fileList');
    this.multipleFotos = this.navParams.get('multipleFotos');

  }

  ngOnInit() {
    if (!this.metadataEdit) {
      //console.log(this.pMetadata);
      this.form = this.formBuilder.group({
        artista: [this.pMetadata.artista],
        fecha: [this.pMetadata.fecha,Validators.required],
        descripcion: [this.pMetadata.descripcion,Validators.required],
        apreturaDiafragma: [this.pMetadata.apreturaDiafragma,Validators.required],
        balanceBlancos: [this.pMetadata.balanceBlancos,Validators.required],
        distanciaFocal: [this.pMetadata.distanciaFocal,Validators.required],
        flash: [this.pMetadata.flash],
        iso: [this.pMetadata.iso,Validators.required],
        nivelExp: [this.pMetadata.nivelExp,Validators.required],
        resolucion: [this.pMetadata.resolucion,Validators.required],
        tmpDeObturacion: [this.pMetadata.tmpDeObturacion,Validators.required],
        // urlPath: ['', [Validators.required, Validators.maxLength(30)]],
        categoria: [this.pMetadata.categoria],
      });

    } else {
      this.metadataEdit=true;
      if (!this.multipleFotos) {
        this.form = this.formBuilder.group({
          artista: ['', [Validators.required, Validators.maxLength(30)]],
          fecha: ['', [Validators.maxLength(30)]],
          descripcion: ['', [Validators.maxLength(250)]],
          apreturaDiafragma: ['', [Validators.maxLength(30)]],
          balanceBlancos: ['', [Validators.maxLength(30)]],
          distanciaFocal: ['', [Validators.maxLength(240)]],
          flash: ['', [Validators.required, Validators.maxLength(240)]],
          iso: ['', [Validators.maxLength(30)]],
          nivelExp: ['', [Validators.maxLength(30)]],
          resolucion: ['', [Validators.maxLength(240)]],
          tmpDeObturacion: ['', [Validators.maxLength(30)]],
          // urlPath: ['', [Validators.required, Validators.maxLength(30)]],
          categoria: ['', [Validators.required, Validators.maxLength(30)]],
        });
      }
      /*   else {
           console.log("entrotrón multiple");
           this.form = this.formBuilder.group({
             artista: ['', [Validators.required, Validators.maxLength(240)]],
             fecha: ['', [Validators.required, Validators.maxLength(30)]],
             descripcion: ['', [Validators.required, Validators.maxLength(30)]],
             categoria: ['', [Validators.required, Validators.maxLength(30)]]
           });
         }*/
    }
    this.categorias = this.dataService.loadCategorias();
    this.formReady = true;
  }
  public goBack() {
    this.modalController.dismiss();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: '¿Desea subir las fotos?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.uploadFiles();
          }
        }
      ]
    });

    await alert.present();
  }
  public uploadFiles() {
    let currentMetadata: PhotoModel = this.form.value;
    /*  for (let i = 0; i < this.filelist.length; i++) {
        this.photoSvc.uploadPhoto(this.filelist.item(0),currentMetadata);
      }*/
    this.photoSvc.uploadPhoto(this.filelist.item(0), currentMetadata).then(a => {
      this.modalController.dismiss();
    });

  }
}
