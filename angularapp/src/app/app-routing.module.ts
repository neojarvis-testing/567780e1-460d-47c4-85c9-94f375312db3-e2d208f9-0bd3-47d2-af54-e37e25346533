import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { RequestedmentorshipapplicationComponent } from './components/requestedmentorshipapplication/requestedmentorshipapplication.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserappliedmentorshipapplicationComponent } from './components/userappliedmentorshipapplication/userappliedmentorshipapplication.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';

// Auth Guard

// import { AuthGuard } from './components/authguard/auth.guard';

// Components

// import { HomeComponent } from './components/home/home.component';

// import { LoginComponent } from './components/login/login.component';

// import { RegistrationComponent } from './components/registration/registration.component';

// import { ErrorComponent } from './components/error/error.component';
// import { AdminnavComponent } from './components/adminnav/adminnav.component';
// import { AuthGuard } from './components/authguard/auth.guard';
// import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';
// import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
// import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
// import { RequestedmentorshipapplicationComponent } from './components/requestedmentorshipapplication/requestedmentorshipapplication.component';
// import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
// import { UsernavComponent } from './components/usernav/usernav.component';
// import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';

// import { AdminnavComponent } from './components/adminnav/adminnav.component';

// import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';

// import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';

// import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';

// import { RequestedmentorshipapplicationComponent } from './components/requestedmentorshipapplication/requestedmentorshipapplication.component';

// import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';

// import { MentorshipapplicationlistComponent } from './components/mentorshipapplicationlist/mentorshipapplicationlist.component';

// import { UsernavComponent } from './components/usernav/usernav.component';

// import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';

// import { MentorshipapplicationformComponent } from './components/mentorshipapplicationform/mentorshipapplicationform.component';

// import { UserappliedmentorshipapplicationComponent } from './components/userappliedmentorshipapplication/userappliedmentorshipapplication.component';

// import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';

// import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Public Pages

  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegistrationComponent },

  // Admin Pages

  { path: 'admin/home', component: AdminnavComponent, canActivate: [AuthGuard] },

  { path: 'admin/add-mentorship', component: CreatementorshipprogramComponent, canActivate: [AuthGuard] },

  { path: 'admin/view-mentorships', component: ViewmentorshipprogramComponent, canActivate: [AuthGuard] },

  { path: 'admin/edit-mentorship/:id', component: AdmineditmentorshipprogramComponent, canActivate: [AuthGuard] },

  { path: 'admin/requested-applications', component: RequestedmentorshipapplicationComponent, canActivate: [AuthGuard] },

  { path: 'admin/feedbacks', component: AdminviewfeedbackComponent, canActivate: [AuthGuard] },

  // { path: 'admin/mentorship-application-list', component: MentorshipapplicationlistComponent, canActivate: [AuthGuard] },

  // User Pages

  { path: 'user/home', component: UsernavComponent, canActivate: [AuthGuard] },

  { path: 'user/viewmentorships', component: UserviewmentorshipprogramComponent, canActivate: [AuthGuard] },

  // { path: 'user/apply-mentorship/:id', component: MentorshipapplicationformComponent, canActivate: [AuthGuard] },

  { path: 'user/applied-mentorships', component: UserappliedmentorshipapplicationComponent, canActivate: [AuthGuard] },

  { path: 'user/post-feedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard] },

  { path: 'user/view-feedbacks', component: UserviewfeedbackComponent, canActivate: [AuthGuard] },

  // // Error Route

  { path: '**', component: HomeComponent }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})

export class AppRoutingModule { }