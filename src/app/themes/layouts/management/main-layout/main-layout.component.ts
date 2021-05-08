import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class MainLayoutComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
