import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { SelectUserTreeComponent } from './select-user-tree/select-user-tree.component';
import { SelectUserSingleComponent } from './select-user-single/select-user-single.component';
import { SelectUserForFilterComponent } from './select-user-for-filter/select-user-for-filter.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CustomPipeModule } from '@shared/pipes/custom-pipe.module';
import { AscSelectModule } from '@shared/containers/asc-select/asc-select.module';
import { NzSelectModule } from 'ng-zorro-antd';
import { IframeContentComponent } from './iframe-content/iframe-content.component';

const AllComponents = [SelectUserTreeComponent, SelectUserSingleComponent, SelectUserForFilterComponent, IframeContentComponent];
@NgModule({
    declarations: [AllComponents],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzModalModule,
        NzTreeSelectModule,
        NzSelectModule,
        LayoutModule,
        TreeViewModule,
        GridModule,
        DialogsModule,
        TranslateModule,
        CustomPipeModule,
        AscSelectModule,
        NgxSpinnerModule,
    ],
    exports: [AllComponents],
    providers: [NzModalService, NgxSpinnerService],
})
export class WidgetModule {}
