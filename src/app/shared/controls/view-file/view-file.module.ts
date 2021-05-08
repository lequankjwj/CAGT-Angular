import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFileComponent } from './view-file.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
    declarations: [ViewFileComponent],
    imports: [CommonModule, NzModalModule, NzResultModule],
    exports: [ViewFileComponent],
})
export class ViewFileModule {}
