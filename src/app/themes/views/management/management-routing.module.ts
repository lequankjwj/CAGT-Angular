import { StepComponent } from './pages/step/step.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './pages/default/default.component';
import { ManagementComponent } from './management.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { ProfileComponent } from '@themes/views/management/pages/profile/profile.component';
import { ForbidenComponent } from '@themes/views/management/pages/forbiden/forbiden.component';
import { RequireLoginUserComponent } from './pages/require-login-user/require-login-user.component';
import { UserGuard } from '@core/guards/user.guard';

const routes: Routes = [
    {
        path: '',
        component: ManagementComponent,
        children: [
            {
                path: '',
                component: DefaultComponent,
                children: [
                    {
                        path: 'dashboard',
                        component: DashboardV2Component,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'trang-ca-nhan',
                        component: ProfileComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'gioi-thieu',
                        component: StepComponent
                    },
                    {
                        path: '403',
                        component: ForbidenComponent,
                    },
                    {
                        path: 'login-ns',
                        component: RequireLoginUserComponent,
                    },
                    {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full',
                    },
                ],
            },
        ],
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagementRoutingModule {}
