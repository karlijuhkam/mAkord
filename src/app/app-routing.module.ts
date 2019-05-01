import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SongDetailsComponent} from './views/song-details/song-details.component';
import {LandingPageComponent} from './views/landing-page/landing-page.component';
import {BandsComponent} from './views/bands/bands.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'bands', component: BandsComponent},
  { path: 'song/:id', component: SongDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
