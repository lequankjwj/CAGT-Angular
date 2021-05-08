import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppCustomPreloader } from './preload';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./themes/views/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: 'management',
        loadChildren: () => import('./themes/views/management/management.module').then(m => m.ManagmentModule),
        data: { preload: true },
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '**',
        loadChildren: () => import('./themes/views/errors/page-notfound.module').then(m => m.PageNotfoundModule),
    },
];

@NgModule({
    // { onSameUrlNavigation: 'reload' }
    imports: [
        RouterModule.forRoot(routes, {
            onSameUrlNavigation: 'reload',
            preloadingStrategy: AppCustomPreloader,
            // preloadingStrategy: PreloadAllModules
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
