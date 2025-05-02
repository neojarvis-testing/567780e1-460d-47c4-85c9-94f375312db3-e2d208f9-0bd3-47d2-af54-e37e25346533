
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// Auth Guard

// import { AuthGuard } from './components/authguard/auth.guard';

// Components

import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';

import { RegistrationComponent } from './components/registration/registration.component';

import { ErrorComponent } from './components/error/error.component';

import { NavbarComponent } from './components/navbar/navbar.component';

import { AdminnavComponent } from './components/adminnav/adminnav.component';

import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';

import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';

import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';

import { RequestedmentorshipapplicationComponent } from './components/requestedmentorshipapplication/requestedmentorshipapplication.component';

import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';

// import { MentorshipapplicationlistComponent } from './components/mentorshipapplicationlist/mentorshipapplicationlist.component';

import { UsernavComponent } from './components/usernav/usernav.component';

import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';

// import { MentorshipapplicationformComponent } from './components/mentorshipapplicationform/mentorshipapplicationform.component';

// import { UserappliedmentorshipapplicationComponent } from './components/userappliedmentorshipapplication/userappliedmentorshipapplication.component';

import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';

import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Public Pages

  { path: 'navbar', component: NavbarComponent },

  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegistrationComponent },

  // Admin Pages

  { path: 'admin', component: AdminnavComponent },

  { path: 'add-mentorship', component: CreatementorshipprogramComponent },

  { path: 'view-mentorships', component: ViewmentorshipprogramComponent },

  { path: 'edit-mentorship/:id', component: AdmineditmentorshipprogramComponent },

  { path: 'requested-applications', component: RequestedmentorshipapplicationComponent},

  { path: 'feedbacks', component: AdminviewfeedbackComponent },

  // { path: 'mentorship-application-list', component: MentorshipapplicationlistComponent},

  // // User Pages

  { path: 'user', component: UsernavComponent },

  { path: 'userview-mentorships', component: UserviewmentorshipprogramComponent },

  // { path: 'user/apply-mentorship/:id', component: MentorshipapplicationformComponent, canActivate: [AuthGuard] },

  // { path: 'user/applied-mentorships', component: UserappliedmentorshipapplicationComponent, canActivate: [AuthGuard] },

  { path: 'post-feedback', component: UseraddfeedbackComponent },

  { path: 'view-feedbacks', component: UserviewfeedbackComponent },

  // // // Error Route

  { path: '**', component: ErrorComponent }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})

export class AppRoutingModule { }