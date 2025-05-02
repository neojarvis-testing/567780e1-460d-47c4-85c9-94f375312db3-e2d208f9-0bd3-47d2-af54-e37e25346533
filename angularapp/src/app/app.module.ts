import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { RequestedmentorshipapplicationComponent } from './components/requestedmentorshipapplication/requestedmentorshipapplication.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
// import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MentorshipapplicationlistComponent } from './components/mentorshipapplicationlist/mentorshipapplicationlist.component';
import { UserappliedmentorshipapplicationComponent } from './components/userappliedmentorshipapplication/userappliedmentorshipapplication.component';
import { AppRoutingModule } from './app-routing.module';
import { RequestedmentorshipapplicationComponent } from './components/requestedmentorshipapplication/requestedmentorshipapplication.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { MentorshipapplicationformComponent } from './components/mentorshipapplicationform/mentorshipapplicationform.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AuthGuard } from './components/authguard/auth.guard';




@NgModule({
  declarations: [
    AppComponent,
    CreatementorshipprogramComponent,
    ViewmentorshipprogramComponent,
    NavbarComponent,
    HomeComponent,
    // LoginComponent,
    RegistrationComponent,
    ErrorComponent,
    UserviewmentorshipprogramComponent,
    AdmineditmentorshipprogramComponent,
    AdminnavComponent,
    LoginComponent,
    // AdmineditmentorshipprogramComponent,
    // AdminnavComponent,
    // UserviewmentorshipprogramComponent,
    MentorshipapplicationlistComponent,
    UserappliedmentorshipapplicationComponent,
    RequestedmentorshipapplicationComponent,
    AdminviewfeedbackComponent,
    MentorshipapplicationformComponent,
    UseraddfeedbackComponent,
    RequestedmentorshipapplicationComponent,
    UserviewfeedbackComponent,
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