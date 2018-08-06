import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {AuthModule} from './auth/auth.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {RootComponent} from '../components/layout/root.component';
import {HeaderComponent} from '../components/layout/header.component';
import {SidebarComponent} from '../components/layout/sidebar.component';
import {LoggedInGuard} from './auth/shared/logged-in.guard';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {inventoryModule} from './inventory/inventory.module';
import {UserModule} from './user/user.module';
import {PagerService} from '../@shared/services';

let routes: Routes = [
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
    canActivate: [LoggedInGuard]
  },
  {
    path: '',
    component: RootComponent,
    children: [...DashboardModule.ROUTES],
    canActivate: [LoggedInGuard]
  },
  {
    path: 'homepage',
    component: HomeComponent
  },
  {
    path: 'app',
    component: RootComponent,
    children: [...inventoryModule.ROUTES],
    canActivate: [LoggedInGuard]
  },
  {
    path: 'user',
    component: RootComponent,
    children: [...UserModule.ROUTES],
    canActivate: [LoggedInGuard]
  },
  {
    path: 'file-upload',
    component: RootComponent,
    children: [...inventoryModule.ROUTES],
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  declarations: [RootComponent, HeaderComponent, SidebarComponent, HomeComponent],
  imports: [CommonModule, HttpClientModule, RouterModule.forRoot(routes), AuthModule, DashboardModule, inventoryModule],
  exports: [RouterModule],
  providers: [PagerService]
})
export class AppRoutingModule {
}
