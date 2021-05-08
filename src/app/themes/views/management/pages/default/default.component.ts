import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '@core/config/app.config';
import { ThemeService } from '@core/services/common';
@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body',
    templateUrl: './default.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {

    isZoom = false;

    isLeftMenu = AppConfig.settings.menu?.left ?? true;
    constructor(
        private themeService: ThemeService
    ) {}

    ngOnInit() {
        this.themeService.loadColor();
    }

    onZoom() {
        const el = document.body;
        this.isZoom = !this.isZoom;
        if (this.isZoom) {
            el.classList.add('overflow-hidden');
        } else {
            el.classList.remove('overflow-hidden');
        }
    }
}
