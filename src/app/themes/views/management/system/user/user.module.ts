import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AuthGuard } from '@core/guards/auth.guard';

import { GroupUserComponent } from './views/group-user/group-user.component';
import { FormGroupUserComponent } from './components/form-group-user/form-group-user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

import { SyncUserComponent } from './views/sync-user/sync-user.component';
import { ListUserComponent } from './views/list-user/list-user.component';
import { HistoryCurrentUserComponent } from './views/history-current-user/history-current-user.component';
import { PermissionComponent } from './views/permission/permission.component';
import { PermissionOfGroupComponent } from './views/permission-of-group/permission-of-group.component';
import { FormGroupPermissionComponent } from './components/form-group-permission/form-group-permission.component';
import { AddUserToGroupComponent } from './components/add-user-to-group/add-user-to-group.component';
import { UserOfGroupPermissionComponent } from './views/user-of-group-permission/user-of-group-permission.component';
import { TreeSelectGroupPermissionComponent } from './components/tree-select-group-permission/tree-select-group-permission.component';
import { AddUserOfGroupPermissionComponent } from './components/add-user-of-group-permission/add-user-of-group-permission.component';
import { ListUserCreateGroupComponent } from './components/list-user-create-group/list-user-create-group.component';
import { CreateAccountComponent } from './views/create-account/create-account.component';
import { FormCreateAccountComponent } from './components/form-create-account/form-create-account.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'users',
                component: ListUserComponent,
            },
            {
                path: 'groups',
                component: GroupUserComponent,
            },
            {
                path: 'permission',
                component: PermissionComponent,
            },
            {
                path: 'phan-quyen',
                component: PermissionOfGroupComponent,
            },
            {
                path: 'nhan-su-phan-quyen',
                component: UserOfGroupPermissionComponent,
            },
            {
                path: 'dong-bo-nhan-su',
                component: SyncUserComponent,
            },
            {
                path: 'lich-su-dang-nhap',
                component: HistoryCurrentUserComponent,
            },
            {
                path: 'create-account',
                component: CreateAccountComponent,
            },
            {
                path: '',
                redirectTo: 'permission',
                pathMatch: 'full',
            },
        ],
    },
];

const Components = [
    FormGroupPermissionComponent,
    AddUserToGroupComponent,
    UpdatePasswordComponent,
    FormUserComponent,
    FormGroupUserComponent,
    TreeSelectGroupPermissionComponent,
    AddUserOfGroupPermissionComponent,
    FormCreateAccountComponent,
];

const Views = [
    UserComponent,
    PermissionComponent,
    ListUserComponent,
    GroupUserComponent,
    SyncUserComponent,
    HistoryCurrentUserComponent,
    PermissionOfGroupComponent,
    UserOfGroupPermissionComponent,
    CreateAccountComponent,
];
@NgModule({
    imports: [CommonModule, ScrollingModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, SharedModule],
    declarations: [Views, Components, ListUserCreateGroupComponent],
})
export class UserModule {}
