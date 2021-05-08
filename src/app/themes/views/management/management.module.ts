import { StepComponent } from './pages/step/step.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { DefaultComponent } from './pages/default/default.component';
import { ManagementLayoutModule } from '@themes/layouts/management/administrator-layout.module';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForbidenComponent } from './pages/forbiden/forbiden.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequireLoginUserComponent } from './pages/require-login-user/require-login-user.component';

import { NzResultModule } from 'ng-zorro-antd/result';
import { ChartsModule, SparklineModule } from '@progress/kendo-angular-charts';
import { CustomPipeModule } from '@shared/pipes/custom-pipe.module';

const ExternalModule = [NzResultModule, ChartsModule, SparklineModule];
@NgModule({
    imports: [CommonModule, ManagementLayoutModule, ManagementRoutingModule, FormsModule, ExternalModule, CustomPipeModule],
    exports: [],
    declarations: [
        DefaultComponent,
        ManagementComponent,
        DashboardComponent,
        DashboardV2Component,
        StepComponent,
        ProfileComponent,
        ForbidenComponent,
        RequireLoginUserComponent,
    ],
    providers: [],
})
export class ManagmentModule {}
