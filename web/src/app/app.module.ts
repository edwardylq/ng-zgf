import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MyComponent } from './components/my/my.component';
import { FootNavComponent } from './components/foot-nav/foot-nav.component';

import {AppRouter} from './router/router';
import { ClassifyComponent } from './components/classify/classify.component';
import { BuycarComponent } from './components/buycar/buycar.component';
import { HomeComponent } from './components/home/home.component'

import {HttpModule} from '@angular/http'
import {HttpclientService} from './services/httpclient.service'


@NgModule({
  declarations: [
    AppComponent,
    MyComponent,
    FootNavComponent,
    ClassifyComponent,
    BuycarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
    HttpModule
  ],
  providers: [HttpclientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
