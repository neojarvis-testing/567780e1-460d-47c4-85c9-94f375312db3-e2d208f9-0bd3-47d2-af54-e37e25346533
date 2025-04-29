import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<<<< Temporary merge branch 1

import { ActivatedRoute } from '@angular/router';

import { AdminnavComponent } from './components/adminnav/adminnav.component';


@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorComponent

  ],
  imports: [
    BrowserModule,
    FormsModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }