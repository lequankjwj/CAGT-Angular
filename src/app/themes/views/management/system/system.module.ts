import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: SystemComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'user',
                loadChildren: () => import('./user/user.module').then(m => m.UserModule),
            },
            {
                path: '',
                redirectTo: 'user',
                pathMatch: 'full',
            },
        ],
    },
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [SystemComponent],
})
export class SystemModule {}
