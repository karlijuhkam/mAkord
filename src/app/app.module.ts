import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsModalRef, ModalModule} from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LoginModalComponent } from './core/modals/login-modal/login-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import {AuthInterceptor} from './core/interceptor/auth.interceptor';
import { SongDetailsComponent } from './views/song-details/song-details.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { BandsComponent } from './views/bands/bands.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    SongDetailsComponent,
    LandingPageComponent,
    BandsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    MatProgressSpinnerModule,
    AngularSvgIconModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      timeOut: 2000
    })
  ],
  entryComponents: [
    LoginModalComponent
  ],
  providers: [
    BsModalRef,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
