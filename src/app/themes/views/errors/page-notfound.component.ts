import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ThemeService } from '@core/services/common/theme.service';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './templates/errors-error-1.component.html',
    styles: [
        `
            .m-error_container {
                padding: 20px;
            }
            .m-error_container .m-error_number h1 {
                font-size: 10rem;
            }
            .m-error_container .m-error_desc {
                font-size: 3rem;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class PageNotfoundComponent implements OnInit, AfterViewInit {
    globalClass =
        'm-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';
    constructor(private themeService: ThemeService) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this.themeService.setBodyClass(this.globalClass);
    }
}
