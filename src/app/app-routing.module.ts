import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginModalComponent} from './core/modals/login-modal/login-modal.component';

const routes: Routes = [
  { path: 'login', component: LoginModalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
