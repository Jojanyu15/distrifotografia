import { Router, } from '@angular/router';
import { ProfileProvider } from './../providers/profile.provider';
import { AuthServiceService } from './../services/auth-service.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Component, Input, } from '@angular/core';
import { ProfileModel } from '../models/profile.model';
import { PhotoService } from '../services/photo.service';
import { MetadataComponent } from '../metadata/metadata.component';
import { ModalcomentComponent } from '../modalcoment/modalcoment.component';
import { PhotoModel } from '../models/photo.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  @Input() uid: string;
  public profile_segment: string;
  public profile: ProfileModel;
  public ving: boolean;
  public images = [];
  constructor(public router: Router,
    public modalCtrl: ModalController,
    public authSvc: AuthServiceService,
    private pProvider: ProfileProvider,
    private phService: PhotoService,
    private modalController: ModalController,
    public actionSheetController: ActionSheetController

  ) { }

  public async goMetadata(photo: PhotoModel) {
    const modal = await this.modalController.create({
      component: MetadataComponent,
      componentProps: {
        pMetadata: photo,
        metadataEdit: false
      }
    });
    return await modal.present();
  }
  goHD(post: PhotoModel) {
    window.location.href = post.urlPath;
  }
  ngOnInit() {
    if (this.uid != undefined && this.uid != null) {
      this.ving = true;
      this.pProvider.obtenerUsuario(this.uid).snapshotChanges().
        subscribe(data => {
          this.profile = data.payload.data() as ProfileModel;
        })
      this.pProvider.obtenerUsuario(this.uid)
        .collection('photos',ref=> ref.orderBy('createdAt','desc'))
        .get()
        .subscribe(photosdata => {
          photosdata.docs.forEach(photo => {
            let post = photo.data() as PhotoModel;
            post.docId=photo.id;
            this.images.push(post);
          });
        });
    } 
    else {
      this.ving = false;
      this.pProvider.obtenerUsuario(this.authSvc.getCurrentUser().uid).snapshotChanges().
        subscribe(data => {
          this.profile = data.payload.data() as ProfileModel;
        })
      this.pProvider.obtenerUsuario(this.authSvc.getCurrentUser().uid)
      .collection('photos',ref=> ref.orderBy('createdAt','desc'))
        .snapshotChanges()
        .subscribe(documentos => {
          this.images=[];
          documentos.map(post=>{
          const postObject = post.payload.doc.data() as PhotoModel;
          postObject.docId=post.payload.doc.id;
          this.images.push(postObject);
          })
        });
    }
  }
  async mostrarMenu(post: PhotoModel) {
    let buttons = [];
    
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
  public async verComentarios(post){
    //console.log(post);
    const modal = await this.modalController.create({
      component: ModalcomentComponent,
      componentProps:{
        post:post,
      }
    });
    return await modal.present();
  }
  // Define segment for everytime when profile page is active
  ionViewWillEnter() {
    this.profile_segment = 'list';
  }

  goEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
  goBack() {
    this.modalCtrl.dismiss();
    //this.router.
  }

  goOptions() {
    // this.navCtrl.pop
  }

  goTaggedProfile() {
    // this.navCtrl.
  }

  goSavedProfile() {
    // this.navCtrl.push(SavedProfile);
  }

  // Triggers when user pressed a post
  pressPhoto(user_id: number, username: string, profile_img: string, post_img: string) {
    this.presentModal(user_id, username, profile_img, post_img);
  }

  // Set post modal
  presentModal(user_id: number, username: string, profile_img: string, post_img: string) {
    /*  let modal = this.modalCtrl.create(ModalPost, 
      { // Send data to modal
        user_id: user_id, 
        username: username,
        profile_img: profile_img,
        post_img: post_img
      }, // This data comes from API!
      { showBackdrop: true, enableBackdropDismiss: true });
      modal.present();*/
  }

}
