import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
// import { ActivatedRoute } from '@angular/router';
import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';
import { HttpClientModule } from '@angular/common/http';
import { MentorshipapplicationlistComponent } from './components/mentorshipapplicationlist/mentorshipapplicationlist.component';
import { UserappliedmentorshipapplicationComponent } from './components/userappliedmentorshipapplication/userappliedmentorshipapplication.component';




@NgModule({
  declarations: [
    AppComponent,
    CreatementorshipprogramComponent,
    ViewmentorshipprogramComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    ErrorComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorComponent,
    UserviewmentorshipprogramComponent,
    AdmineditmentorshipprogramComponent,
    AdminnavComponent,
    UseraddfeedbackComponent,
    UserviewfeedbackComponent
    LoginComponent,
    AdmineditmentorshipprogramComponent,
    AdminnavComponent,

    UserviewmentorshipprogramComponent,
    MentorshipapplicationlistComponent,
    UserappliedmentorshipapplicationComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    HttpClientModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }