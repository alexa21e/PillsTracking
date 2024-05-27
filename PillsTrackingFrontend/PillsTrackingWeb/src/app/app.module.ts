import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './features/account/account.module';
import { MessageService} from "primeng/api";
import { JwtInterceptor } from './core/interceptors/jwtinterceptor';
import { ToastModule } from 'primeng/toast';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    FeaturesModule,
    SharedModule,
    AccountModule,
    ToastModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    MessageService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
