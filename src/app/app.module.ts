import { DataService } from './services/data.service';
import { MetadataComponent } from './metadata/metadata.component';
import { LoadViewCtrl } from './utils/load-view-ctrl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileProvider } from './providers/profile.provider';
import { CameraService } from './services/camera.service';
import { CameraOptionComponent } from './camera-option/camera-option.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthServiceService } from './services/auth-service.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ModalresourcesComponent } from './modalresources/modalresources.component';
import { ProfilePage } from './profile/profile.page';
import { ProfilePageModule } from './profile/profile.module';
import { ModalcomentComponent } from './modalcoment/modalcoment.component';

const SERVICES = [
  AuthServiceService,
  AuthGuardService,
  CameraService,
  DataService

];

const PROVIDERS = [
  ProfileProvider,
  LoadViewCtrl,
  DatePipe
];

const IMPORTS = [
 // AngularFireModule.initializeApp(environment.),
  AngularFirestoreModule.enablePersistence(),
  AngularFireStorageModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  ImageCropperModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  ProfilePageModule
  //AngularFireMessagingModule
];


@NgModule({
  declarations: [AppComponent,CameraOptionComponent,MetadataComponent,ModalresourcesComponent,ModalcomentComponent],
  entryComponents: [CameraOptionComponent,MetadataComponent,ModalresourcesComponent,ProfilePage,ModalcomentComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    IMPORTS,
    AppRoutingModule, 
    ServiceWorkerModule.register('ngsw-worker.js', 
    { enabled: environment.production })],
  providers: [
    PROVIDERS,
    SERVICES,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
