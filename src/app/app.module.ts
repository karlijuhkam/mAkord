import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsModalRef, ModalModule} from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LoginModalComponent } from './core/modals/login-modal/login-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import {AuthInterceptor} from './core/interceptor/auth.interceptor';
import { SongDetailsComponent } from './views/song-details/song-details.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { BandsComponent } from './views/bands/bands.component';
import { AddSongModalComponent } from './core/modals/add-song-modal/add-song-modal.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { SafePipe } from './core/pipes/safe.pipe';
import { BandDetailsComponent } from './views/bands/band-details/band-details.component';
import {TooltipModule} from 'ng2-tooltip-directive';
import { ControlPanelComponent } from './views/control-panel/control-panel.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {CommonModule} from '@angular/common';
import { StatusPipe } from './core/pipes/status.pipe';
import { RolePipe } from './core/pipes/role.pipe';
import { AddBandModalComponent } from './core/modals/add-band-modal/add-band-modal.component';
import { EditSongModalComponent } from './core/modals/add-song-modal/edit-song-modal/edit-song-modal.component';
import { DeleteSongModalComponent } from './core/modals/delete-song-modal/delete-song-modal.component';
import { EditBandModalComponent } from './core/modals/add-band-modal/edit-band-modal/edit-band-modal.component';
import { DeleteBandModalComponent } from './core/modals/add-band-modal/delete-band-modal/delete-band-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    SongDetailsComponent,
    LandingPageComponent,
    BandsComponent,
    AddSongModalComponent,
    SafePipe,
    BandDetailsComponent,
    ControlPanelComponent,
    StatusPipe,
    RolePipe,
    AddBandModalComponent,
    EditSongModalComponent,
    DeleteSongModalComponent,
    EditBandModalComponent,
    DeleteBandModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
      CommonModule,
    MatProgressSpinnerModule,
    AngularSvgIconModule,
    NgSelectModule,
    ReactiveFormsModule,
    TooltipModule,
    NgxDatatableModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      timeOut: 2000
    })
  ],
  entryComponents: [
    LoginModalComponent,
    AddSongModalComponent,
    EditSongModalComponent,
    AddBandModalComponent,
    EditBandModalComponent,
    DeleteSongModalComponent,
    DeleteBandModalComponent
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
