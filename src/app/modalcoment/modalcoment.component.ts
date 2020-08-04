import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoProvider } from '../providers/photo.provider';
import { ProfileProvider } from '../providers/profile.provider';
import { AuthServiceService } from '../services/auth-service.service';
import { ProfileModel } from '../models/profile.model';
import { ProfilePage } from '../profile/profile.page';
import { LoadViewCtrl } from '../utils/load-view-ctrl';
import { ComentModel } from '../models/coment.model';
import { PhotoModel } from '../models/photo.model';

@Component({
  selector: 'app-modalcoment',
  templateUrl: './modalcoment.component.html',
  styleUrls: ['./modalcoment.component.scss'],
})
export class ModalcomentComponent implements OnInit {
  comment:string;
  public user: ProfileModel;
  @Input() post: PhotoModel;
  public comentarios= []  ;
  constructor(
    private modalController:ModalController,
    private phProvider:PhotoProvider,
    private pProvider:ProfileProvider,
    private authSvc: AuthServiceService,
    private loadCtrl: LoadViewCtrl
  ) { 
    
    

  }
   
  ngOnInit() {
    this.pProvider.obtenerUsuario(this.authSvc.getCurrentUser().uid)
    .get().subscribe(uDocument=>{
      this.user= uDocument.data() as ProfileModel;
    });
    //console.log(this.post)

    this.phProvider.getComments(this.post.docId).collection('comments',ref => ref.orderBy('createdAt'))
    .snapshotChanges()
    .subscribe(comentarios=>{
       this.comentarios=[];
         comentarios.map(comentario => {
         const objComent = comentario.payload.doc.data() as ComentModel;
         const id = comentario.payload.doc.id;
         objComent.id=id;
         this.comentarios.push(objComent);
       });
     });;

  }

  public enviarComent(){
    this.loadCtrl.actionExecution();
    //console.log(this.user);

    let comment={
      'photoURl':this.user.photoURL,
      'username':this.user.username,
      'comment': this.comment
    }
    
    this.phProvider.addComment(this.post,comment).then(()=>{
      this.loadCtrl.endExecution();
    });
    this.comment="";
  }

  public dismissModal(){
    this.modalController.dismiss();
  }
}
