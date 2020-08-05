import { Injectable } from "@angular/core";
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


/**
 * Esta clase es usada para controlar los componentes en un momento de ejecución asincrona
 */
@Injectable()
export class LoadViewCtrl {

    public loading: any;

    public processing: boolean;

    public dismissFun: Function;

    constructor(
        public loadingController: LoadingController,
        private alertController: AlertController,
        private toastController: ToastController,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController) {

        this.processing = false;
    }

    public actionExecution(msg?) {
        let message="";
        if(msg!=null && msg!=undefined){
            message=msg;
        }else{
            message="Cargando";
        }
        if (!this.processing) {
            this.loadingController.create({
                message: message,
            }).then(value => {
                value.present();
                this.processing = true;
                this.dismissFun = value.dismiss;

                setTimeout(() => {
                    if (this.processing == true) {
                        this.dismissFun();
                        this.processing = false;
                        this.basicToast('Tiempo de espera agotado, intenta más tarde');
                    }
                }, 60000);

            });
        }
        
        

    }

    async endExecution() {
        this.processing = false;
        return await this.loadingController.dismiss().then(() => console.log());
    }

    /* public endExecution(time?: number) {
         if (time == null) {
             time = 100;
         }
 
         setTimeout(() => {
             if (this.dismissFun) {
                 this.dismissFun();
             }
             this.processing = false;
         }, time);
     }*/

    async basicToast(msg: string, duration?: number, position?: "top" | "bottom" | "middle") {
        if (!duration) {
            duration = 3000;
        }
        if (!position) {
            position = 'middle'
        }
        const toast = await this.toastController.create({
            message: msg,
            duration: duration,
            position: position,
            showCloseButton: true,
            closeButtonText: "cerrar"
        });
        toast.present();
    }


    public showBasicAlert(title: string, message: string) {
        // let alert = this.alertCrtl.create({
        //     title: title,
        //     message: message,
        //     buttons: [
        //         {
        //             text: 'Aceptar',
        //             role: 'cancel',
        //             handler: () => {
        //                 //console.log('Cancel clicked');
        //             }
        //         }
        //     ]
        // });
        // alert.present();
    }

}