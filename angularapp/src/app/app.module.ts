import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';

import { AdminnavComponent } from './components/adminnav/adminnav.component';

// import { NavbarComponent } from './components/navbar/navbar.component';
// import { HomeComponent } from './components/home/home.component';
// import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
// import { RegistrationComponent } from './components/registration/registration.component';
// import { ErrorComponent } from './components/error/error.component';
// import { ActivatedRoute } from '@angular/router';
import { UsernavComponent } from './components/usernav/usernav.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';


@NgModule({
  declarations: [
    AppComponent,
    CreatementorshipprogramComponent,
    ViewmentorshipprogramComponent,
    AdmineditmentorshipprogramComponent,
    AdminnavComponent,
    UsernavComponent,
    AdminviewfeedbackComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
