import { PopoverController, ModalController, ActionSheetController } from '@ionic/angular';
import { ProfileProvider } from './../providers/profile.provider';
import { AuthServiceService } from './../services/auth-service.service';

import { Component, ViewChild } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AngularFirestore } from '@angular/fire/firestore';
import { PhotoProvider } from '../providers/photo.provider';
import { PhotoService } from '../services/photo.service';
import { PhotoModel } from '../models/photo.model';
import { Router, NavigationExtras } from '@angular/router';
import { ProfilePage } from '../profile/profile.page';
import { MetadataComponent } from '../metadata/metadata.component';
import { ModalcomentComponent } from '../modalcoment/modalcoment.component';
import { DataService } from '../services/data.service';
import { KeyValue } from '@angular/common';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public posts = [];
  public categorias: KeyValue<string, string>[] = [];
  scateg: string = '';

  constructor(private authSvc: AuthServiceService,
    private phProvider: PhotoProvider,
    private phService: PhotoService,
    private router: Router,
    private modalController: ModalController,
    private dataService: DataService,
    public actionSheetController: ActionSheetController

  ) {
    this.phProvider.obtenerPaths().snapshotChanges().subscribe(documentos => {
      this.posts = [];
      documentos.map(post => {
        const postObject = post.payload.doc.data() as PhotoModel;
        const id = post.payload.doc.id;
        postObject.docId = id;
        //console.log(postObject);
        this.posts.push(postObject);
      });
    });
  }

  async mostrarMenu(post: PhotoModel) {
    let buttons = [];
    let profilebutton = {
      text: 'Ir al perfil',
      icon: 'person',
      handler: () => {
        this.goProfile(post.userUid)
      }
    }
    buttons.push(profilebutton);
    if (post.userUid == this.authSvc.getCurrentUser().uid) {
      let deleteButton = {
        cssClass: 'rojo',
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.phService.deletephoto(post);
        }
      }
      buttons.push(deleteButton);
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons
    });
    await actionSheet.present();
  }

  goHD(post: PhotoModel) {
    window.location.href = post.urlPath;
  }

  optionsFn() {
    //console.log(this.scateg);
  }

  ngOnInit() {
    this.categorias = this.dataService.loadCategorias(true);
  }
  public async verComentarios(foto: PhotoModel) {
    //console.log(foto);
    const modal = await this.modalController.create({
      component: ModalcomentComponent,
      componentProps: {
        post: foto
      }
    });
    return await modal.present();
  }
  public async goMetadata(photo: PhotoModel) {
    //console.log(photo)
    const modal = await this.modalController.create({
      component: MetadataComponent,
      componentProps: {
        pMetadata: photo,
        metadataEdit: false
      }
    });
    return await modal.present();
  }
  public async goProfile(uid) {
    //console.log(uid);
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: {
        'uid': uid
      }

    });
    return await modal.present();
  }
  swipePage(event) {
    if (event.direction === 1) { // Swipe Left
      //console.log("Swap Camera");
    }

    if (event.direction === 2) { // Swipe Right
      this.goMessages();
    }
  }
  goMessages() {
    //this.app.getRootNav().push(Messages);
  }
  presentPostPopover() {

  }
  scrollToTop() {
    //  this.content.scrollToTop();
  }
}
