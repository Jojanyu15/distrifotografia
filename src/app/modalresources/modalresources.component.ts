import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalresources',
  templateUrl: './modalresources.component.html',
  styleUrls: ['./modalresources.component.scss'],
})
export class ModalresourcesComponent implements OnInit {

  constructor(
    private modalController:ModalController,
  ) { }
  public dismissModal(){
    this.modalController.dismiss();
  }
  public goCourse(){
    window.location.href="https://classroom.google.com/u/0/w/Nzk3MTk2MjA1NTRa/t/all";
  }
  public goOVA(){

  }
  public goHumHub(){
    window.location.href="https://rita.udistrital.edu.co/colabora-acacia/index.php?r=space%2Fspace&sguid=46a175ac-86c6-437e-9fc0-02d473ce51c1";
  }
  public goEncuesta(){
    window.location.href="https://docs.google.com/forms/d/e/1FAIpQLSdSQtTP0uFU-85JlQ0sYfE-Hu-4YGnf5H322ShtwEwtNFZNDA/viewform";

  }
  public goObjetos(){
    window.location.href="https://listado.mercadolibre.com.co/accesorios-para-fotografia#D[A:accesorios%20para%20fotografia]";

  }
  ngOnInit() {}

}
