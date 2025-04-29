import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatementorshipprogramComponent,
    ViewmentorshipprogramComponent,
    AdmineditmentorshipprogramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
