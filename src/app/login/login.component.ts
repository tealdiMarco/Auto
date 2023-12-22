import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms'; //si creano da soli il form

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  reactiveForm:FormGroup;
  mail:string="";
  arrayCars:any[]=[];

  login:boolean=true;
  registration:boolean=false;
  car_show:boolean=false;
  pError:boolean=false;

  


  constructor(private formBuilder:FormBuilder){
    this.reactiveForm=this.formBuilder.group({ // form Composto da:
      user:[
        '',//valore inziziale di user
        [
          //vincoli che voglio applicare su user
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
      ]
      
    });
  }


  async check() {

    let info ={
      mail:this.reactiveForm.controls['user'].value,
      password:this.reactiveForm.controls['password'].value,

    }
    //console.log(info);
  
  
    let busta = await fetch("http://localhost:1337/check", 
    {
      "method":"POST",
      "headers":{"Content-Type":"application/x-www-form-urlencoded"},
      "body": JSON.stringify(info)
    });

    let risposta = await busta.json()
    console.log(risposta.risposta);

    if(risposta.risposta == "ACCESSO CONSENTITO")
    {
      this.car_show=true;
      this.login=false;
      this.pError = false;

      let busta = await fetch("http://localhost:1337/cars", 
      {
        "method":"POST",
        "headers":{"Content-Type":"application/x-www-form-urlencoded"},
        "body": JSON.stringify("")
      });

      let risposta = await busta.json()
      console.log(risposta);
      
      this.arrayCars.splice(0,this.arrayCars.length);
      this.arrayCars=risposta;
    }
    else
    {
      this.pError = true;
    }


  }


  getExit(exit:any)
  {
    this.car_show = exit;
    this.login=true;
    this.reactiveForm.reset();
  }

  Registration(){
    this.registration=true;
    this.login=false;
  }

  getBack(back:any)
  {
    this.registration = back;
    this.login=true;
    this.reactiveForm.reset();
  }

}
