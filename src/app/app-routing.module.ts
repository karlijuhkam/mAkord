import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SongDetailsComponent} from './views/song-details/song-details.component';
import {LandingPageComponent} from './views/landing-page/landing-page.component';
import {BandsComponent} from './views/bands/bands.component';
import {BandDetailsComponent} from './views/bands/band-details/band-details.component';
import {ControlPanelComponent} from './views/control-panel/control-panel.component';
import {ProfileComponent} from './views/profile/profile.component';
import {ChartsComponent} from './views/charts/charts.component';
import {ResultsComponent} from './views/results/results.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'bands', component: BandsComponent},
  { path: 'bands/:id', component: BandDetailsComponent},
  { path: 'song/:id', component: SongDetailsComponent},
  { path: 'control-panel', component: ControlPanelComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'results', component: ResultsComponent},
  { path: 'charts', component: ChartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
