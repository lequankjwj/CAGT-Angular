import { EXTERNAL_MODULE } from './modules/external.module';
import { KENDO_MODULE } from './modules/kendo.module';
import { ANT_DESIGN_MODULE } from './modules/zorro.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CEditContentComponent } from './containers/c-editcontent/c-editcontent.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { WidgetModule } from './widgets';
import { SharedDirectiveModule } from './directives';
import { CustomPipeModule } from './pipes';
import { FieldErrorModule } from './containers/field-error';
import { CSelectModule } from './containers/c-select';
import { CUploadModule } from './containers/c-upload';

const CONTAINERS = [CEditContentComponent];

const INTERNAL_MODULE = [FieldErrorModule, CSelectModule, CUploadModule, WidgetModule, SharedDirectiveModule];

@NgModule({
    declarations: [CONTAINERS],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ANT_DESIGN_MODULE,
        KENDO_MODULE,
        EXTERNAL_MODULE,
        INTERNAL_MODULE,
        CustomPipeModule,
    ],
    exports: [ANT_DESIGN_MODULE, KENDO_MODULE, EXTERNAL_MODULE, CONTAINERS, INTERNAL_MODULE, CustomPipeModule],
    providers: [NzMessageService, NzNotificationService],
})
export class SharedModule { }
