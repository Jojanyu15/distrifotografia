import { ProfileModel } from './../models/profile.model';
import { ProfileProvider } from './../providers/profile.provider';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { TabsPage } from './../tabs/tabs.page';
import { AuthServiceService } from '../services/auth-service.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  constructor(private authSvc: AuthServiceService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private zone: NgZone,
    private pProvider: ProfileProvider) { }

  ngOnInit() {
  }



  googleLogin(): void {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((res) => {
     // console.log(res.user.uid + "RESPUESTA");
     // console.log(this.authSvc.getCurrentUser().uid + "AUTH SERVICE");

      this.pProvider.obtenerUsuario(res.user.uid).get().subscribe(userDoc => {
        //console.log(userDoc);
        //Si no existe el usuario, el lo registra
        if (!userDoc.exists) {
          let profile = {
            username: res.user.displayName,
            bio: '¡Hola! soy '+res.user.displayName+ ', Bienvenido a mi perfil',
            cellphone: null,
            email: res.user.email,
            userUid: res.user.uid,
            photoURL: res.user.photoURL
          } as ProfileModel;

          this.pProvider.registrarUsuario(profile, res.user.uid);
        }
      });
      this.zone.run(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate(['/tabs']);
      });
    }).catch(error => {
      console.error(error);
    })

  }

}
