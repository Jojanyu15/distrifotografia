import { ProfileModel } from './../models/profile.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
//import { HttpUtil } from 'sr';
import { environment } from 'src/environments/environment';
import { flatMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProfileProvider {
  public pathAfs: string = 'users';
  private API_URL = environment.firebaseConfig.databaseURL;

  constructor(public afs: AngularFirestore,
    private http: HttpClient) { }
    
  public obtenerUsuario(userUid: string): AngularFirestoreDocument<ProfileModel> {
    return this.afs.collection<ProfileModel>(this.pathAfs).doc<ProfileModel>(userUid);

  }

  public actualizarUser(userId: string, ProfileModel: ProfileModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let obj = JSON.parse(JSON.stringify(ProfileModel));
      this.obtenerUsuario(userId).ref.update(obj).then(() => {
        resolve();
      }).catch(err => {
        reject(err);
      })
    });
  }
  
  public registrarUsuario(user:ProfileModel, uid:string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
       this.afs.collection<ProfileModel>(this.pathAfs).doc(uid).set(user);
    });
  }

}
