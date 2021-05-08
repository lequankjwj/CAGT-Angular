import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUploadComponent } from '@shared/containers/c-upload/c-upload.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ViewFileModule } from '@shared/controls/view-file/view-file.module';
import { NzIconModule } from 'ng-zorro-antd';

@NgModule({
    declarations: [CUploadComponent],
    imports: [CommonModule, FormsModule, NzButtonModule, NzModalModule, NzUploadModule, NzIconModule, ViewFileModule],
    exports: [CUploadComponent],
    providers: [NzModalService],
})
export class CUploadModule {}
