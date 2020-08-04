import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  firebaseUser: firebase.User;
  firebaseUserSubs: Subscription;
  firebaseuser : any;
  constructor(public afAuth: AngularFireAuth, 
    private router:Router,
    private zone:NgZone) { }

  //logea al usuario en google
  public onLoginGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  public getCurrentUser(){
    return this.afAuth.auth.currentUser;
  }
  //verifica si el usuario esta logeado
  public async isLoggedIn(): Promise<boolean> {
    try {
      await new Promise((resolve, reject) =>
        this.afAuth.auth.onAuthStateChanged(
          user => {
            if (user) {
              // User is signed in.
              
              resolve(user)
            } else {
              // No user is signed in.
              reject('no user logged in')
            }
          },
          // Prevent console error
          error => reject(error)
        )
      )
      return true
    } catch (error) {
      return false
    }
  }
  //cierra sesión
  public singOut() {
    return new Promise<void>((resolve, reject) => {
        this.afAuth.auth.signOut().then(() => {
            
            this.firebaseUser = null;
            this.zone.run(()=>{
              this.router.navigateByUrl('/login-page');
            });
            //this.itemParentModelSubs.unsubscribe();
            //this.firebaseUserSubs.unsubscribe();
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

 /* private loadUserFirebaseSubs() {
    this.firebaseUserSubs = this.userObservable().subscribe(user => {
      this.loadUserFire(user);
    });
  }
  private loadUserFire(user) {
    this.firebaseUser = user;
  }
  userInit(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.loadUserFirebaseSubs();
      resolve();
    });
  } 
  userObservable(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  private loadUserFirebasePromise(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let sub = this.userObservable().subscribe(user => {
        this.loadUserFire(user);
        sub.unsubscribe();
        resolve();
      }, err => {
        sub.unsubscribe();
        reject(err);
      });
    });
  }
  validateUser(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        this.loadUserFirebasePromise().then(() => {
            if (this.firebaseUser) {
                
            } else {
                reject(console.error('error en el login'));
            }
        }).catch(err => {
            reject(console.error('error en el login'));
        });
    });
}*/

 
  
}
