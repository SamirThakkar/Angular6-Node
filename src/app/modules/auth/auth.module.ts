import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './shared/auth.service';
import {LoggedInGuard} from './shared/logged-in.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, CommonModule, FormsModule],
  exports: [LoginComponent],
  providers: [AuthService, LoggedInGuard]
})
export class AuthModule {
}
