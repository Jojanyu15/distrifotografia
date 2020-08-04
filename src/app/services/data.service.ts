import { Injectable } from '@angular/core';
import { KeyValue } from '@angular/common';
import { callInstance } from '@ionic-native/core/decorators/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public categorias: KeyValue<string, string>[] = [];

  constructor() { }
  public loadCategorias(clasificar?:boolean): KeyValue<string, string>[] {
    this.categorias = new Array();
    
    if(clasificar){
      let todas: KeyValue<string, string> = {
        key: 'Todas',
        value: ''
      };
      this.categorias.push(todas);
    }
    let artistica: KeyValue<string, string> = {
      key: 'Artística',
      value: 'artistica'
    };
    this.categorias.push(artistica);
    let documental: KeyValue<string, string> = {
      key: 'Documental',
      value: 'documental'
    };
    this.categorias.push(documental);
    let retrato: KeyValue<string, string> = {
      key: 'Retrato',
      value: 'retrato'
    };
    this.categorias.push(retrato);
    let periodistica: KeyValue<string, string> = {
      key: 'Periodística',
      value: 'periodistica'
    };
    this.categorias.push(periodistica);
    let nocturna: KeyValue<string, string> = {
      key: 'Nocturna',
      value: 'nocturna'
    };
    this.categorias.push(nocturna);
    let otros: KeyValue<string, string> = {
      key: 'Otros',
      value: 'otros'
    };
    
    this.categorias.push(otros);
    return this.categorias;
  }
}
