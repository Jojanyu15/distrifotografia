import { Router } from '@angular/router';
import { LoadViewCtrl } from '../utils/load-view-ctrl';
import { ProfileModel } from '../models/profile.model';
import { ProfileProvider } from '../providers/profile.provider';
import { AuthServiceService } from '../services/auth-service.service';
import { Component, NgZone } from '@angular/core';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.page.html',
  styleUrls: ['edit-profile.page.scss']
})
export class EditProfile{
  public user: ProfileModel;
  public form: FormGroup;
  public formReady:boolean=false;
  constructor(private authSvc: AuthServiceService,
    private loadCtrl: LoadViewCtrl,
    private navCtrl: NavController,
    private pProvider: ProfileProvider,
    public formBuilder: FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private modalController:ModalController
  ) {
    this.pProvider.obtenerUsuario(this.authSvc.getCurrentUser().uid).get().subscribe(userDoc => {
      this.user = userDoc.data() as ProfileModel;
      this.formReady=false;
      if (userDoc.exists) {
        this.form = this.formBuilder.group({
          username: [this.user.username, [Validators.required, Validators.maxLength(30)]],
          bio: [this.user.bio, [Validators.required, Validators.maxLength(240)]],
          email: [this.user.email, [Validators.required, Validators.maxLength(30)]],
          cellphone: [this.user.cellphone, [Validators.maxLength(10),Validators.pattern('[0-9]{7,10}') ]],
        });
      }
      else {
        this.form = this.formBuilder.group({
          username: ['' ,[Validators.required, Validators.maxLength(30)]],
          bio: ['', [Validators.required, Validators.maxLength(240)]],
          email: ['', [Validators.required, Validators.maxLength(30)]],
          cellphone: ['', [Validators.required, Validators.maxLength(10)]],
        });
        console.error("error obteniendo usuario");
      }
      this.formReady=true;
    });

  }
  goBack(){
    this.navCtrl.navigateBack('/tabs/profile');
   // this.modalController.dismiss();
  }
  public logOut() {
    localStorage.clear();
    this.navCtrl.navigateRoot('LoginPage');
    this.authSvc.singOut();
  }

  public updateProfile() {
    if(this.form.valid){
      this.loadCtrl.actionExecution();
      let nuevoPerfil:ProfileModel = new ProfileModel();
      nuevoPerfil=this.form.value;
      this.pProvider.actualizarUser(this.authSvc.getCurrentUser().uid,nuevoPerfil).then(()=>{
        this.loadCtrl.basicToast('Se han actualizado los datos');
        this.loadCtrl.endExecution();
        this.ngZone.run( () => {
        this.router.navigate(['/tabs/profile']);
        });
      }).catch(err => {
        this.loadCtrl.endExecution();
        console.error(err);
      });
    }
     //loader.present().then(() => this.navCtrl.pop()); // Get back to profile page. You should do that after you got data from API
  }

  dismiss() {
    //this.viewCtrl.dismiss();
  }
}
