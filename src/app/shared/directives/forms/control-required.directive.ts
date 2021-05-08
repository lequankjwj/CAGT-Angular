import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[required]'
})
export class ControlRequiredDirective implements OnInit {

    constructor(
        private controlDir: NgControl,
        private renderer: Renderer2,
        private el: ElementRef) {}

    ngOnInit() {
    }

    get control() {
        return this.controlDir.control;
    }
}
