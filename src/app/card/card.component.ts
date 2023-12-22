import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() listaCars:any[]=[]; 

  thing:any=[]; 
  writeResult:boolean=false;
  strWriteResult:string="";

  swag(marca:any,modello:any)
  {
    this.listaCars.forEach(element => {
      if(element.marca == marca && element.modello == modello ) 
      {
        this.thing=element;
      }
    });
  }

  closeCard()
  {
    this.thing=[];
    this.strWriteResult="";
    this.writeResult=false;
  }

  async buyCar(){
    let info = {
      id_auto: this.thing.id_auto,
      marca: this.thing.marca,
      modello: this.thing.modello,
      costo: this.thing.costo,
      categoria: this.thing.categoria,
      alimentazione: this.thing.alimentazione,
      dat_tecnici: {
        potenza: this.thing.dat_tecnici.potenza,
        consumi: this.thing.dat_tecnici.consumi
      }
    }

    let busta = await fetch("http://localhost:1337/save", 
    {
      "method":"POST",
      "headers":{"Content-Type":"application/x-www-form-urlencoded"},
      "body": JSON.stringify(info)
    });

    let risposta = await busta.json()
    // console.log(risposta.risposta);

    this.strWriteResult=risposta.risposta;
    this.writeResult=true;

  }

  @Output() sendExit = new EventEmitter();

  esci(){
    this.sendExit.emit(false);/* passa oggetto da figlio a papà*/
  }


}
