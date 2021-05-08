import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '@core/services/common/script-loader.service';
import { ThemeService } from '@core/services/common/theme.service';
import {LocalStorageUtil} from '@core/utils/localstorage';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './management.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ManagementComponent implements OnInit, AfterViewInit {
    globalBodyClass =
        'm-page--fluid m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--offcanvas m-aside--offcanvas-default';

    constructor(private script: ScriptLoaderService, private themeService: ThemeService) {
        // set state sidebar
        if (LocalStorageUtil.getStateSidebar()) {
            this.globalBodyClass = this.globalBodyClass + ' m-brand--minimize m-aside-left--minimize'
        }
        this.themeService.setBodyClass(this.globalBodyClass);
    }
    ngAfterViewInit(): void {}
    ngOnInit() {}
}
