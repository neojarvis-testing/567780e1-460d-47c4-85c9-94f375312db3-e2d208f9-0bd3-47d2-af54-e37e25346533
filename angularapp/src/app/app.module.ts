import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
<<<<<<< HEAD
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
=======
>>>>>>> 3540a0478280653e6979711fc220b1c1f14df5d7
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
<<<<<<< HEAD

import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';
import { FormsModule } from '@angular/forms';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
=======
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
// import { ActivatedRoute } from '@angular/router';
import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';
import { HttpClientModule } from '@angular/common/http';
>>>>>>> 3540a0478280653e6979711fc220b1c1f14df5d7



@NgModule({
  declarations: [
    AppComponent,
    CreatementorshipprogramComponent,
    ViewmentorshipprogramComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorComponent,
<<<<<<< HEAD
    UserviewmentorshipprogramComponent,
    AdmineditmentorshipprogramComponent,
    AdminnavComponent,
    UseraddfeedbackComponent,
    UserviewfeedbackComponent


=======
    LoginComponent,
    AdmineditmentorshipprogramComponent,
    AdminnavComponent,
    UserviewmentorshipprogramComponent
>>>>>>> 3540a0478280653e6979711fc220b1c1f14df5d7

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
<<<<<<< HEAD
   
   
=======
    HttpClientModule
>>>>>>> 3540a0478280653e6979711fc220b1c1f14df5d7

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
