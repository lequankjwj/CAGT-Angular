import { Component, OnInit, ViewEncapsulation, Inject, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '@core/services/common/script-loader.service';
import { LayoutHelpers } from '@core/helpers/layout.helper';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './main.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit, AfterViewInit {
    globalBodyClass =
        'm-page--fluid m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-light m-aside-left--fixed m-aside-left--offcanvas m-aside-left--minimize m-brand--minimize m-footer--push m-aside--offcanvas-default theme-v2';
    constructor(private script: ScriptLoaderService, @Inject(DOCUMENT) private document) {
        LayoutHelpers.bodyClass(this.globalBodyClass);
    }
    ngAfterViewInit(): void {}
    ngOnInit() {
        this.script.loadScripts('body', ['assets/v2/vendors/base/vendors.bundle.js', 'assets/v2/demo/demo6/base/scripts.bundle.js'], true);
    }
}
