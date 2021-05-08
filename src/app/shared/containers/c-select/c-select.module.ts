import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CSelectComponent } from '@shared/containers/c-select/c-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@NgModule({
    declarations: [CSelectComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSelectModule, NgxSpinnerModule],
    exports: [CSelectComponent],
    providers: [NgxSpinnerService],
})
export class CSelectModule {}
