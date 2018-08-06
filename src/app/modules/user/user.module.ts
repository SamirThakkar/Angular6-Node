import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserEditComponent} from './edit-user/edit-user.component';
import {UserListComponent} from './list-user/list-user.component';
import {GetUserResolve, UserService} from './shared/user.service';
import {AddUserComponent} from './add-user/add-user.component';
import {SharedModule} from '../../@shared/shared.module';
import {DataResolve} from '../../@shared/services/data.resolve';

let routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: UserListComponent,
    data: {apiPath: '/api/user'},
    resolve: {users: DataResolve}
  },
  {
    path: 'add',
    component: AddUserComponent
  },
  {
    path: 'edit/:id',
    component: UserEditComponent
  },
  {
    path: 'delete/:id',
    component: UserEditComponent
  },
];


@NgModule({
  declarations: [AddUserComponent, UserEditComponent, UserListComponent],
  imports: [RouterModule.forChild(routes), FormsModule, CommonModule],
  exports: [AddUserComponent, UserEditComponent, UserListComponent],
  providers: [UserService, GetUserResolve,...SharedModule.PROVIDERS/*,GetRolesListResolve, CheckAuth*/]
})
export class UserModule {
  static ROUTES: any = routes;
}
