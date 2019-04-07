import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginModalComponent} from './core/modals/login-modal/login-modal.component';
import {ProfileComponent} from './views/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginModalComponent},
  { path: 'profile/:id', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
