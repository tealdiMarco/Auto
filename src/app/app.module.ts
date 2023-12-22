import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //! PER NGMODEL
import { ReactiveFormsModule } from '@angular/forms';//! PER FORMGROUP


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CardComponent } from './card/card.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,//! PER NGMODEL
    ReactiveFormsModule//! PER FORMGROUP
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
