import { NgModule } from '@angular/core';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { QuickSidebarComponent } from './quick-sidebar/quick-sidebar.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

const LAYOUTS = [AsideNavComponent, HeaderNavComponent, FooterComponent, QuickSidebarComponent, ScrollTopComponent, TooltipsComponent];

@NgModule({
    imports: [TranslateModule, RouterModule, CommonModule],
    exports: [LAYOUTS],
    declarations: [LAYOUTS],
    providers: [],
})
export class MainLayoutModule {}
