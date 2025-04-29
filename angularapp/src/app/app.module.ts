import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';

import { ActivatedRoute } from '@angular/router';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';


@NgModule({
  declarations: [
    AppComponent,
  //  MentorshipapplicationformComponent
    CreatementorshipprogramComponent,
    ViewmentorshipprogramComponent,
    AdmineditmentorshipprogramComponent,
    AdminnavComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    ErrorComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }