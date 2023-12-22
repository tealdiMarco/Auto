import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms'; //si creano da soli il form
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  reactiveForm:FormGroup;
  End:String="";

  constructor(private formBuilder:FormBuilder){
    this.reactiveForm=this.formBuilder.group({ // form Composto da:
      cod_fiscale:[
        '',
        [
          
          Validators.required,
          Validators.pattern("^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$"),
        ],
      ],
      mail:[
        '',
        [
          
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.]+\\.[a-z]{2,}$'),
        ],
      ],
      password:[
        '',
        [
          //vincoli 
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)
        ],
      ],
      conf_password:[
        '',
        [
          //vincoli 
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          
        ],
      ],
      cognome:[
        '',
        [
          //vincoli 
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ],
      ],
      nome:[
        '',
        [
          //vincoli 
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ],
      ],
      indirizzo:[
        '',
        [
        ],
      ],
      
    });
  }

  async confirm(){
    this.End="";
    let info ={
      cod_fiscale:this.reactiveForm.controls['cod_fiscale'].value,
      mail:this.reactiveForm.controls['mail'].value,
      password:this.reactiveForm.controls['password'].value,
      cognome:this.reactiveForm.controls['cognome'].value,
      nome:this.reactiveForm.controls['nome'].value,
      indirizzo:this.reactiveForm.controls['indirizzo'].value,

    }
    
  
  
    let busta = await fetch("http://localhost:1337/register", 
    {
      "method":"POST",
      "headers":{"Content-Type":"application/x-www-form-urlencoded"},
      "body": JSON.stringify(info)
    });

    let risposta = await busta.json()
    this.End=risposta.risposta;
  }

  @Output() sendBack = new EventEmitter();

  back(){
    this.sendBack.emit(false);
  }

}
