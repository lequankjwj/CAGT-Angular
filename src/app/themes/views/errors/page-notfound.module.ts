import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageNotfoundComponent } from './page-notfound.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
    {
        path: '',
        component: PageNotfoundComponent,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), TranslateModule],
    declarations: [PageNotfoundComponent],
})
export class PageNotfoundModule {}
