import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { QuickSidebarComponent } from './quick-sidebar/quick-sidebar.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './avatar/avatar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CustomPipeModule } from '@shared/pipes/custom-pipe.module';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {FormDirectiveModule} from '@shared/directives/forms';
const LAYOUTS = [
    FooterComponent,
    AsideNavComponent,
    HeaderNavComponent,
    ScrollTopComponent,
    QuickSidebarComponent,
    TooltipsComponent,
    MainLayoutComponent,
];

@NgModule({
    declarations: [LAYOUTS, AvatarComponent, ChangePasswordComponent],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        CustomPipeModule,
        NzAvatarModule,
        NzButtonModule,
        NzDropDownModule,
        NzIconModule,
        NzUploadModule,
        NzModalModule,
        NzLayoutModule,
        FormDirectiveModule
    ],
    exports: [LAYOUTS],
    providers: [NzMessageService, NzNotificationService],
})
export class ManagementLayoutModule {}
