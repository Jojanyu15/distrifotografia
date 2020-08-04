import { ProfileModel } from './../models/profile.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
//import { HttpUtil } from 'sr';
import { environment } from 'src/environments/environment';
import { flatMap } from 'rxjs/operators';
import { PhotoModel } from '../models/photo.model';
import * as firebase from 'firebase';
import { AuthServiceService } from '../services/auth-service.service';
import { ProfileProvider } from './profile.provider';

@Injectable({
  providedIn: 'root'
})
export class PhotoProvider {
  public pathAfs: string = 'urlPaths';
  private API_URL = environment.firebaseConfig.databaseURL;

  constructor(public afs: AngularFirestore,
    private http: HttpClient,
    private authSvc:AuthServiceService,
    private pProvider:ProfileProvider
    ) { }
    
  public obtenerPaths() {
    return this.afs.collection(this.pathAfs,ref => ref.orderBy('createdAt','desc'));
  }
  public addComment(post:PhotoModel,data){
  
    //console.log(post);
    
    const timest = firebase.firestore.Timestamp.fromDate(new Date());
    this.pProvider.obtenerUsuario(post.userUid).collection('photos').doc(post.docId)
    .collection('comments').add(data)
    .then(docNuevo => {
      docNuevo.update({ 'createdAt': timest})
    });
    return this.afs.collection(this.pathAfs).doc(post.docId).collection('comments').add(data)
    .then(docNuevo => {
      docNuevo.update({ 'createdAt': timest})
    });
  }
  public getComments(docID:any){
    return this.afs.collection(this.pathAfs).doc(docID);
  }

}
